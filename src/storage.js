// 新建 storage 对象
/**
 * @param  {String} type 本地存储类型 sessionStorage | localStorage (default)
 * @param  {String} key 本地存储的键
 * @param  {Any} value 本地存储的值
 *
 * e.g.
 * 存储 storage().set('nameKey', 'gauseen')
 * 取值 storage().get('nameKey')
 * 清空所有 storage().clearAll()
 * 清空 storage().clearItem('nameKey')
*/
import typer from './typer'

export default function storage (type = 'localStorage') {
	let storageType = type
	return {
		get (key) {
			var value = window[storageType].getItem(key)

			if (value) {
				try {
					return JSON.parse(value)
				} catch (e) {
					return value
				}
			} else return null
		},
		set (key, value) {
			if (value && typer(value) === 'object') {
				value = JSON.stringify(value)
			}
			window[storageType].setItem(key, value)
		},
		clearAll () {
			window[storageType].clear()
		},
		clearItem (key) {
			window[storageType].removeItem(key)
		},
	}
}
