/**
 * 禁止频繁操作函数
 * （delay毫秒内只执行一次，第一次立即执行）
 *
 * @param  {Function} exec 待执行函数
 * @param  {Number} delay=150ms 执行阀值时间（单位：毫秒）
 * @return {Function} 返回一个函数，可被事件调用
 */

export default function threshold (exec, delay) {
	if (!exec) return
	var lastExec = null
	if (delay === undefined) {
		delay = 150
	}

	return function () {
		var now = +new Date()
		var isExec = now - lastExec >= delay
		var args = arguments
		var _context = this

		if (!lastExec || isExec) {
			// 防止上下文 this，参数 arguments 丢失
			exec.apply(_context, args)
			lastExec = +new Date()
		}
	}
}
