import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

// 是否需要压缩
const is_compress = process.env.IS_COMPRESS

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
		// file: './dist/tools.js',
		format: 'umd',
		banner,
	},
	plugins: [
		resolve(),
		commonjs(),
		babel(),
		is_compress && uglify(),
	],
}
