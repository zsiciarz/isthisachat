.PHONY: install serve

SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%.js=build/%.js)

build: $(LIB)
build/%.js: src/%.js
	mkdir -p $(@D)
	./node_modules/.bin/webpack --colors --progress

serve: install
	./node_modules/.bin/nodemon \
		--exec ./node_modules/.bin/babel-node \
		--watch backend \
		--delay 100ms \
		-- backend/main.js

watch: install
	./node_modules/.bin/webpack --colors --progress --watch

install:
	npm install
