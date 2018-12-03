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
export default {
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
	},
}
