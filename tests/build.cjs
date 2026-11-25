const path = require('node:path');
const { buildSync } = require('esbuild');

buildSync({
  absWorkingDir: path.resolve(__dirname, '..'),
  entryPoints: ['tests/reading.store.spec.ts'],
  outfile: '.karma-build/reading.store.spec.js',
  bundle: true,
  platform: 'browser',
  target: 'es2020',
  sourcemap: 'inline',
});
