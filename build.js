const { build } = require('esbuild');

const buildConf = {
  logLevel: 'info',
  entryPoints: ['src/index.js'],
  entryNames: '[name]',
  minify: false,
  loader: { '.js': 'jsx' },
  bundle: true,
  outdir: 'dist'
};


build(buildConf);
