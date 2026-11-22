PYTHON ?= python3

.PHONY: check check-ui

check:
	$(PYTHON) tests/validate.py
	node --check app.js
	node tests/filters.cjs
	$(PYTHON) tools/queue.py --self-test
	$(PYTHON) tools/round_lock.py --self-test
	$(PYTHON) tools/linkcheck.py --self-test
	git diff --check

check-ui:
	$(PYTHON) tests/browser.py
