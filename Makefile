.PHONY: install serve watch

WEBPACK = ./node_modules/.bin/webpack
WEBPACK_ARGS = --colors --progress

SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%.js=build/%.js)

build: $(LIB)
build/%.js: src/%.js
	mkdir -p $(@D)
	$(WEBPACK) $(WEBPACK_ARGS)

serve: install
	./node_modules/.bin/nodemon \
		--exec ./node_modules/.bin/babel-node \
		--watch backend \
		--delay 100ms \
		-- --stage 0 backend/main.js

watch: install
	$(WEBPACK) $(WEBPACK_ARGS) --watch

install: node_modules

node_modules: package.json
	@npm install
