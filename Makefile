.PHONY: install serve

SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%.js=build/%.js)

serve: install build
	./node_modules/.bin/babel-node index.js

build: $(LIB)
build/%.js: src/%.js
	mkdir -p $(@D)
	./node_modules/.bin/babel --stage 0 $< -o $@

install:
	npm install
