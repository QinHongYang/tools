/**
 * 合并同类项
 *
 * @param  {Array} arr 需要合并的数据源
 * @param  {Array} standardProps 合并时参照的属性
 * @param  {Array} mergeProps 需要相加的属性
 * @return {Array}
 */

export default function mergerOfSimilarItems (arr, standardProps, mergeProps) {
	if (!(arr && standardProps && mergeProps)) return

	let faker = {}
	let _key = 'key_'
	arr.forEach(function (item) {
		// 根据合并标准属性，生成唯一 __key
		let __key = _key
		standardProps.forEach(function (sProp) {
			__key = __key + item[sProp]
		})
		let itemValue = faker[__key]

		if (!itemValue) {
			faker[__key] = item
		} else {
			// 根据 要合并的属性，进行合并计算
			mergeProps.forEach(function (mProp) {
				faker[__key][mProp] = (+faker[__key][mProp]) + (+item[mProp])
			})
		}
	})

	// 加工成数组返回
	return Object.keys(faker).map(function (key) {
		return faker[key]
	})
}
