// 深拷贝：日期、数组、对象
/**
 * @param  {Any} source 要深拷贝的数据
 * @return {Any} 拷贝后的数据
 * */

export default function deepCopy (source) {
	let copy
	// 简单数据类型直接返回
	if (source === null || typeof source !== 'object') return source

	// 日期深拷贝
	if (source instanceof Date) {
		copy = new Date()
		copy.setTime(source.getTime())
		return copy
	}

	// 数组深拷贝
	if (source instanceof Array) {
		copy = []
		for (var i = 0, len = source.length; i < len; i++) {
			copy[i] = deepCopy(source[i])
		}
		return copy
	}

	// 对象深拷贝
	if (source instanceof Object) {
		copy = {}
		for (var attr in source) {
			if (source.hasOwnProperty(attr)) copy[attr] = deepCopy(source[attr])
		}
		return copy
	}

	throw new Error("Unable to copy obj! Its type isn't supported.")
}
