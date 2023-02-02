.PHONY: test
test:
	npx esbuild --sourcemap --format=esm --target=es2020 --bundle --splitting --outdir=dist/esm-bundle "/Users/lgarron/Code/git/github.com/lgarron/typescript-csp/test.ts"
	node --enable-source-maps dist/esm-bundle/test.js
