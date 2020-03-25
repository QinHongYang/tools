// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import pkg from './package.json';

// export default [
//   // browser-friendly UMD build
//   {
//     input: 'src/index.js',
//     output: {
//       name: 'howLongUntilLunch',
//       file: pkg.browser,
//       format: 'umd'
//     },
//     plugins: [
//       resolve(), // so Rollup can find `ms`
//       commonjs() // so Rollup can convert `ms` to an ES module
//     ]
//   },
//   {
//     input: 'src/index.js',
//     external: ['ms'],
//     output: [
//       { file: pkg.main, format: 'cjs' },
//       { file: pkg.module, format: 'es' }
//     ]
//   }
// ];

import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
  input: './src/index.ts',
  output: [
    { format: 'cjs', file: pkg.main },
    { format: 'esm', file: pkg.module }
  ],
  plugins: [
    typescript()
  ]
};