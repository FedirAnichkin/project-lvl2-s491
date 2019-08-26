install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

build:
	rm -rf dist
	npm run build

publish:
	npm publish --dry-run

test:
	npm test

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage

test-watch:
	npm test -- --watch
