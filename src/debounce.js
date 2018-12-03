/**
 * 防抖函数
 *
 * @param  {Function} fn 需要防抖的函数
 * @param  {Number} delay 设置防抖的时间间隔（单位：毫秒）
 * @return {Function} 返回一个防抖函数，可被事件调用
 */

export default function debounce (fn, delay) {
	let timer
	if (delay === undefined) {
		delay = 150
	}
	return function () {
		let self = this
		let args = arguments
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
		timer = setTimeout(function () {
			fn.apply(self, args)
		}, delay)
	}
}
