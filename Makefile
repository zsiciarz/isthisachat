.PHONY: install serve

install:
	npm install

serve: install
	node index.js
