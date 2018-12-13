import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH

// 开源说明
let banner = `\
/**
 * tools v${pkg.version}
 * https://github.com/gauseen/tools
 * 
 * Copyright (c) ${new Date().getFullYear()} gauseen
 * Released under the ISC license
 */
 `

export default {
	input: './src/index.js',
	output: {
		name: 'tools',
		file: './dist/tools.js',
		format: 'umd',
		banner,
	},
	plugins: [
		resolve(),
		commonjs(),
		babel(),
		// production && uglify(),
	],
}
