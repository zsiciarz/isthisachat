.PHONY: install serve

SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%.js=build/%.js)

serve: install build
	node index.js

build: $(LIB)
build/%.js: src/%.js
	mkdir -p $(@D)
	babel $< -o $@

install:
	npm install
