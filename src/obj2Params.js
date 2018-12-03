/**
 * 对象转 form 数据
 *
 * @param  {Object} data 要转换的对象
 * @return {String} 序列化后的字符串
 *
 * e.g.
 * { name: 'hello', msg: 'world' } ==> name=hello&msg=world
 *
 * 注：依赖 typer 方法
 */
import typer from './typer'

export default function obj2Params (data) {
	var dataType = typer(data)

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
		switch (typer(obj[key])) {
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
