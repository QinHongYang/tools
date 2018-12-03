/**
 * 解析链接中的数据
 *
 * @param  {String | Null} url 需要解析的 url
 * @return {Object} 返回解析后的对象
 *
 * e.g.
 * http://example.cn/api?name=hello&msg=world => { name: 'hello', msg: 'world' }
 */
export default function parseUrl (url) {
	url = url || window.location.href

	const splitUrl = url.split('?')
	const [link, params] = splitUrl

	if (params) {
		const result = { url: link }
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
