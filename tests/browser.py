"""Exercise the dashboard in a real browser against this checkout."""
import functools
import http.server
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
    page.set_viewport_size({"width": 1280, "height": 900})
    search = page.locator("[name=q]")
    expect(search).to_be_visible()
    search.fill("Claude")
    search.press("Enter")
    expect(search).to_have_value("Claude")
    expect(page).to_have_url(url)

    taiwan = page.locator('[data-preset="taiwan"]')
    taiwan.click()
    count = page.locator("#count").inner_text()
    page.locator('[name=sort]').select_option("cost")
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
    page.reload()
    expect(cards).to_have_count(24)
    assert responses == [("/data/offers.json", 200), ("/data/offers.json", 304)], responses
    assert not errors, errors


if __name__ == "__main__":
    with site() as (url, responses), sync_playwright() as playwright:
        with tempfile.TemporaryDirectory() as profile:
            # A regular profile has a disk cache large enough for the full dataset.
            context = playwright.chromium.launch_persistent_context(
                profile, channel="chrome", viewport={"width": 390, "height": 844}
            )
            try:
                check(context.new_page(), url, responses)
            finally:
                context.close()
    print("PASS: responsive filters, Enter search, Taiwan preset, pagination, reset and cache revalidation.")
