Remirror example plus esbuild build file

# Non working setup

`yarn install`
`node build.js`

# Workaround

`yarn install`
`rm -fr node_modules/jsdom`
`node build.js`
