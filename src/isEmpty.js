/**
 * 判断所有数据类型是否为空
 *
 * @param  {Any} val 要判断的数据
 * @return {Boolean} 布尔值
 *
 * 注：数字、布尔值 被视为"空"
 *
 */

const isEmpty = val => val == null || !(Object.keys(val) || val).length

export default isEmpty
