"""Exercise the dashboard in a real browser against this checkout."""
import functools
import http.server
import datetime
import json
import os
import pathlib
import threading
import tempfile
from contextlib import contextmanager

from playwright.sync_api import expect, sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[1]


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def log_request(self, code="-", size="-"):
        if self.path.partition("?")[0] == "/data/offers.json":
            self.server.dataset_responses.append((self.path, int(code)))


@contextmanager
def site():
    handler = functools.partial(QuietHandler, directory=ROOT)
    with http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler) as server:
        server.dataset_responses = []
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            yield f"http://127.0.0.1:{server.server_port}/", server.dataset_responses
        finally:
            server.shutdown()
            thread.join()


def check(page, url, responses):
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(url)
    cards = page.locator("#cards article")
    expect(cards).to_have_count(24)
    panel = page.locator(".filter-shell")
    expect(panel).not_to_have_attribute("open", "")
    panel.locator("summary").first.click()
    expect(page.locator("[name=q]")).to_be_visible()
    panel.locator("summary").first.click()
    latest = page.locator('[data-sort="added"]')
    expect(latest).to_be_visible()
    latest.click()
    expect(page.locator('[name=sort]')).to_have_value("added")
    expect(page).to_have_url(url + "?sort=added")
    offers = json.loads((ROOT / "data/offers.json").read_text())["offers"]

    def collection_time(offer):
        value = datetime.datetime.fromisoformat(offer["discovered_at"].replace("Z", "+00:00"))
        if value.tzinfo is None:
            value = value.replace(tzinfo=datetime.timezone(datetime.timedelta(hours=8)))
        return value.timestamp()

    newest = sorted(offers, key=collection_time, reverse=True)
    expect(cards.locator(".card-title")).to_have_text([o["title"] for o in newest[:24]])
    page.locator("#load-more").click()
    expect(cards.locator(".card-title")).to_have_text([o["title"] for o in newest[:48]])
    page.locator('[data-preset="all"]').click()
    page.set_viewport_size({"width": 1280, "height": 900})
    search = page.locator("[name=q]")
    expect(search).to_be_visible()
    search.fill("Claude")
    search.press("Enter")
    expect(search).to_have_value("Claude")
    expect(page).to_have_url(url)
    search_count = page.locator("#count").inner_text()
    latest.click()
    expect(search).to_have_value("Claude")
    expect(page.locator("#count")).to_have_text(search_count)

    taiwan = page.locator('[data-preset="taiwan"]')
    taiwan.click()
    count = page.locator("#count").inner_text()
    page.locator('[name=sort]').select_option("cost")
    expect(page.locator("#count")).to_have_text(count)
    expect(taiwan).to_have_attribute("aria-pressed", "true")
    latest.click()
    expect(page.locator("#count")).to_have_text(count)
    expect(taiwan).to_have_attribute("aria-pressed", "true")
    page.locator('[name=taiwan]').select_option("No")
    expect(taiwan).to_have_attribute("aria-pressed", "false")

    page.locator('[data-preset="all"]').click()
    first = cards.first.locator(".card-details")
    first.locator("summary").first.click()
    page.locator("#load-more").click()
    expect(cards).to_have_count(48)
    expect(first).to_have_attribute("open", "")
    titles = cards.locator(".card-title").all_text_contents()
    assert len(set(titles)) == len(titles)

    search.fill("no-match-58e493c9")
    expect(cards).to_have_count(0)
    page.locator("#cards .button-reset").click()
    expect(cards).to_have_count(24)
    latest.click()
    page.reload()
    expect(cards).to_have_count(24)
    expect(page.locator('[name=sort]')).to_have_value("added")
    expect(latest).to_have_attribute("aria-pressed", "true")
    expect(cards.locator(".card-title")).to_have_text([o["title"] for o in newest[:24]])
    # Existing sort values round-trip too; preserve unrelated query/hash state.
    page.evaluate("history.pushState(null, '', '?keep=yes&sort=fresh#opportunities'); dispatchEvent(new PopStateEvent('popstate'))")
    expect(page.locator('[name=sort]')).to_have_value("fresh")
    expect(latest).to_have_attribute("aria-pressed", "false")
    page.locator('[name=sort]').select_option("deadline")
    expect(page).to_have_url(url + "?keep=yes&sort=deadline#opportunities")
    page.locator('[name=sort]').select_option("")
    expect(page).to_have_url(url + "?keep=yes&sort=#opportunities")
    page.locator('[data-preset="all"]').click()
    expect(page).to_have_url(url + "?keep=yes#opportunities")
    assert responses == [("/data/offers.json", 200), ("/data/offers.json", 304)], responses
    assert not errors, errors


if __name__ == "__main__":
    with site() as (url, responses), sync_playwright() as playwright:
        with tempfile.TemporaryDirectory() as profile:
            # A regular profile has a disk cache large enough for the full dataset.
            context = playwright.chromium.launch_persistent_context(
                profile, channel=os.environ.get("PLAYWRIGHT_BROWSER_CHANNEL", "chrome"),
                viewport={"width": 390, "height": 844}
            )
            try:
                check(context.new_page(), url, responses)
            finally:
                context.close()
    print("PASS: responsive filters, Enter search, Taiwan preset, newest collection order, pagination, sort URLs, reset and cache revalidation.")
