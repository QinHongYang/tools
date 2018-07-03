/**
 * @Author: gauseen 
 * @Date: 2018-04-27 11:22:14 
 * @Last Modified by: gauseen
 * @Last Modified time: 2018-07-03 14:34:22
 */

/**
 * 获取数据具体类型
 * 
 * @param  {Any} value 要判断的数据
 * @return {String} 返回数据类型 'string', 'object', 'number', 'null', 'undefined', 'function'
 */
export function getType (value) {
	var typer = Object.prototype.toString
	var typeStr = typer.call(value)

	typeStr = typeStr.replace(/.*\s(\w+)\]/g, '$1')
	return typeStr.toLowerCase()
}

/**
 * 判断所有数据类型是否为空
 * 
 * @param  {Any} value 要判断的数据
 * @return {Boolean} 布尔值
 * 
 * 注：该方法依赖了 getType 方法
 */
export function isEmpty (value) {
	const type = getType(value)

	switch (type) {
		case 'object':
			return Object.keys(value).length === 0
		case 'array':
			return value.length === 0
		case 'number':
			return !isNaN(value)
		default:
			return !!value
	}
}

// 使用方式
/*
添加 css 
.modal-open{
	position: fixed
	width: 100%
}
*/

/*
* 加载页面先调用 const actionForbid = forbidBodyScroll ()
* 弹出层显示和关闭时 actionForbid(isShow)

* isShow: Boolean
*/

// 禁止body滚动，解决弹出蒙层滑动穿透问题
export function forbidBodyScroll () {
	let scrollTop = 0
	let bodyClass = 'modal-open'
	let afterOpen = () => {
		scrollTop = document.scrollingElement.scrollTop
		document.body.classList.add(bodyClass)
		document.body.style.top = `-${scrollTop}px`
	}
	let beforeClose = () => {
		document.body.classList.remove(bodyClass)
		document.scrollingElement.scrollTop = scrollTop
	}
	let actionForbid = (isForbid = false) => {
		isForbid ? afterOpen() : beforeClose()
	}
	return actionForbid 
}

/**
 * 设置页面 title，单页面应用，兼容 title 问题
 * 
 * @param  {String} title 要设置的 title
 */
export function setTitle (title) {
	document.title = title
	var iframe = document.createElement('iframe')
	iframe.style.display = 'none'
	iframe.onload = () => setTimeout(() => iframe.remove(), 9)
	document.body.appendChild(iframe)
}

/**
 * 解析链接中的数据
 * 
 * @param  {String | Null} url 需要解析的 url
 * @return {Object} 返回解析后的对象
 * 
 * e.g.
 * http://example.cn/api?name=hello&msg=world => { name: 'hello', msg: 'world' }
 */
export function parseUrl (url) {
	url = url || window.location.href

	const splitUrl = url.split('?')
	const [link, params] = splitUrl

	if (params) {
		const result = {url: link}
		const _params = params.split('&')
		_params.forEach(item => {
			const [name, key] = item.split('=')
			result[name] = decodeURIComponent(key)
		})
		return result
	} else {
		return {}
	}
}

/**
 * 对象转 form 数据
 * 
 * @param  {Object} data 要转换的对象
 * @return {String} 序列化后的字符串
 * 
 * e.g.
 * { name: 'hello', msg: 'world' } ==> name=hello&msg=world
 */
export function obj2Params (data) {
	var dataType = getType(data)

	if (dataType !== 'object') {
		console.error('function obj2Params receive a nonsupport type parameter.')
		return
	}

	return resolveObj(data).join('&')
}

export function resolveObj (obj, parents) {
	var result = []
	var parentsStr = ''

	if (parents) parentsStr = parents.join('.') + '.'
	else parents = []

	Object.keys(obj).forEach(function (key) {
		// 注：getType 方法依赖
		switch (getType(obj[key])) {
			case 'object':
				var insetObj = resolveObj(obj[key], parents.concat([key]))
				result = result.concat(insetObj)
				break
			case 'array':
				result.push(parentsStr + key + '=' + obj[key].join())
				break
			default:
				result.push(parentsStr + key + '=' + obj[key])
				break
		}
	})
	return result
}

// 正则
/*
* 正常使用:
* regTips.verify('mobile', '17688888888') // true

* 扩展正则:
* 链式调用:
* regTips.extend('addReg', /abcd/).verify('addReg', 'abcd')

* 非链式调用
* regTips.extend('addReg', /abcd/)
* regTips.verify('addReg', 'abcd') // true
*/
export const regTips = {
	// 正则
	_patterns: {
		// 移动号码
		mobile: /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|16[0-9])[0-9]{8}$/,
		// 座机（固定电话）
		tel: /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/,
		// 密码: 8-16位数字 + 字母
		password: /^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$/,
		// 邮箱 或 'noemail' 字段
		email: /(^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$)|(^noemail$)/,
		// 保留 2 位小数
		save2BitPoint: /^[0-9]+(\.\d{1,2})?$/,
	},

	// 验证
	verify: function (type, str) {
		if (!(type && str)) return false
		if (!this._patterns[type]) {
			console.error('该正则不存在，可用 extend 方法扩展。')
			return false
		}
		return this._patterns[type].test(str)
	},

	// 扩展
	extend: function (type, pattern) {
		if (!(type && pattern)) return console.error('类型或正则不能为空')
		if (this._patterns[type]) {
			console.error('该正则已存在')
			return false
		}
		if (!(pattern instanceof RegExp)) return console.error('添加规则为 RegExp')
		this._patterns[type] = pattern

		return this
	}
}

// 根据各个环境配置不同变量；sit、uat测试环境；it生产环境，无匹配项时为: location
/*
* 调用方式:

const config = {
	it_cn: prodUrlCN,
	it_en: prodUrlEN,
	sit_cn: sitUrlCN,
	sit_en: sitUrlEN,
	uat_cn: uatUrlCN,
	uat_en: uatUrlEN,
	location_cn: sitUrlCN,
	location_en: sitUrlEN,
	lang: 'cn',
}

* 当前环境所用变量
* let url = configENV(config)
*/

export function configENV (config = {lang: 'cn'}) {
	const _ENV_ = document.domain.replace(/(sit|uat|it|.{0}).*/g, '$1') || 'location'
	const key = `${_ENV_}_${config.lang}`
	return config[key]
}

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
 * @return {Date} 格式化后的日期
 * 
 * e.g.
 * let f = Timejs().format(Pattern)
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
	format: function (formatStr = 'YYYY-MM-DD HH:mm:ss') {
		const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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
	}
}

export function Timejs (date) {
	return new FormatTime(date)
}

/**
 * 节流函数
 * 
 * @param  {Function} fn 需要节流的函数
 * @param  {Number} delay=150 设置节流的时间间隔（单位：毫秒）
 * @return {Function} 返回一个节流函数，可被事件调用
 * 
 * e.g.
 * let fnThrottle = throttle(fun, delay)
 * document.addEventListener('scroll', fnThrottle)
 */
export function throttle (fn, delay = 150) {
	let now, lastExec, timer, context, args

	let execute = function() {
		fn.apply(context, args)
		lastExec = now
	}

	return function () {
		context = this
		args = arguments

		now = Date.now()

		if (timer) {
			clearTimeout(timer)
			timer = null
		}

		if (lastExec) {
			let diff = delay - (now - lastExec)
			if (diff < 0) {
				execute()
			} else {
				timer = setTimeout(() => {
					execute()
				}, diff)
			}
		} else {
			execute()
		}
	}
}

/**
 * 防抖函数
 * 
 * @param  {Function} fn 需要防抖的函数
 * @param  {Number} delay 设置防抖的时间间隔（单位：毫秒）
 * @return {Function} 返回一个防抖函数，可被事件调用
 */
function debounce (fn, delay) {
	let timer
	if(delay === undefined) {
		delay = 150
	}
	return function () {
		let self = this, args = arguments
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
		timer = setTimeout(function() {
			fn.apply(self, args)
		}, delay)
	}
}

/**
 * 合并同类项
 * 
 * @param  {Array} arr 需要合并的数据源
 * @param  {String} standardProps 合并时参照的属性
 * @param  {String} mergeProps 需要相加的属性
 * @return {Array}
 */
function mergerOfSimilarItems (arr, standardProps, mergeProps) {
	if (!(arr && standardProps && mergeProps)) return;

	var faker = {};
	var _key = 'key_';
	arr.forEach(function (item) {
		// 根据合并标准属性，生成唯一 __key
		var __key = _key;
		standardProps.forEach(function (s_prop) {
			__key = __key + item[s_prop];
		})
		var itemValue = faker[__key];

		if (!itemValue) {
			faker[__key] = item;
		} else {
			// 根据 要合并的属性，进行合并计算
			mergeProps.forEach(function (m_prop) {
				faker[__key][m_prop] = (+faker[__key][m_prop]) + (+item[m_prop]);
			})
		}
	})

	// 加工成数组返回
	return Object.keys(faker).map(function (key) {
		return faker[key];
	})
}
