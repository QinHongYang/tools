/**
 * 获取数据具体类型
 *
 * @param  {Any} value 要判断的数据
 * @return {String} 返回数据类型 'string', 'object', 'number', 'null', 'undefined', 'function'
 */
export default function typer (value) {
	var typer = Object.prototype.toString
	var typeStr = typer.call(value)

	typeStr = typeStr.replace(/.*\s(\w+)\]/g, '$1')
	return typeStr.toLowerCase()
}
