/**
 * 日期格式化
 *
 * @param {Date | Null} date 要格式化的日期
 *
 * @param {Pattern} 格式化类型支持：
 * YY-MM-DD ==> 18-01-05
 * YYYY-MM-DD ==> 2018-01-05
 * YYYY-MM-DD HH:mm ==> 2018-01-05 15:30
 * YYYY-MM-DD HH:mm:ss ==> 2018-01-05 15:30:11 (默认类型)
 * YYYY-M-D H:m:s ==> 2018-1-5 8:8:8
 *
 *@params {String} lang(cn | en 中 | 英)
 *
 * @return {Date} 格式化后的日期
 *
 * e.g.
 * let f = timejs().format(Pattern, lang)
 */

function FormatTime (date) {
	this.$d = this.parseConfig(date)
	this.init()
}

FormatTime.prototype = {
	parseConfig: function (config) {
		let reg
		if (!config) return new Date()
		if (config instanceof Date) return config
		// eslint-disable-next-line no-cond-assign
		if (reg = String(config).match(/^(\d{4})-?(\d{2})-?(\d{1,2})$/)) {
			// 2018-08-08 or 20180808
			return new Date(reg[1], reg[2] - 1, reg[3])
		}
		return new Date(config) // timestamp
	},

	padStart: function (string, length, pad) {
		if (!string || string.length >= length) return string
		return `${Array((length + 1) - string.length).join(pad)}${string}`
	},

	init: function () {
		this.$zone = this.$d.getTimezoneOffset() / 60
		this.$zoneStr = this.padStart(String(this.$zone * -1).replace(/^(.)?(\d)/, '$10$200'), 5, '+')
		this.$y = this.$d.getFullYear()
		this.$M = this.$d.getMonth()
		this.$D = this.$d.getDate()
		this.$W = this.$d.getDay()
		this.$H = this.$d.getHours()
		this.$m = this.$d.getMinutes()
		this.$s = this.$d.getSeconds()
		this.$ms = this.$d.getMilliseconds()
	},
	format: function (formatStr = 'YYYY-MM-DD HH:mm:ss', lang = 'cn') {
		// 周字典
		const weeksEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		const weeksCN = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
		const weeks = lang === 'en' ? weeksEN : weeksCN
		// 月字典
		const monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		const monthsCN = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
		const months = lang === 'en' ? monthsEN : monthsCN

		return formatStr.replace(/Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|m{1,2}|s{1,2}|Z{1,2}/g, (match) => {
			switch (match) {
				case 'YY':
					return String(this.$y).slice(-2)
				case 'YYYY':
					return String(this.$y)
				case 'M':
					return String(this.$M + 1)
				case 'MM':
					return this.padStart(String(this.$M + 1), 2, '0')
				case 'MMM':
					return months[this.$M].slice(0, 3)
				case 'MMMM':
					return months[this.$M]
				case 'D':
					return String(this.$D)
				case 'DD':
					return this.padStart(String(this.$D), 2, '0')
				case 'd':
					return String(this.$W)
				case 'dddd':
					return weeks[this.$W]
				case 'H':
					return String(this.$H)
				case 'HH':
					return this.padStart(String(this.$H), 2, '0')
				case 'm':
					return String(this.$m)
				case 'mm':
					return this.padStart(String(this.$m), 2, '0')
				case 's':
					return String(this.$s)
				case 'ss':
					return this.padStart(String(this.$s), 2, '0')
				case 'Z':
					return `${this.$zoneStr.slice(0, -2)}:00`
				default: // 'ZZ'
					return this.$zoneStr
			}
		})
	},
}

export default function Timejs (date) {
	let instance = null
	return (
		() => {
			if (instance) return instance
			return new FormatTime(date)
		}
	)()
}
