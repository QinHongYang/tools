/**
 * 判断所有数据类型是否为空
 *
 * @param  {Any} value 要判断的数据
 * @return {Boolean} 布尔值
 *
 * 注：该方法依赖了 typer 方法
 */
import typer from './typer'

export default function isEmpty (value) {
	const type = typer(value)

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
