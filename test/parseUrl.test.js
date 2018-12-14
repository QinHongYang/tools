import { parseUrl } from '../src/index'

let href = 'http://example.cn/api?name=hello&msg=world'

test('解析 URL 参数', () => {
	expect(parseUrl(href)).toEqual({ name: 'hello', msg: 'world', url: 'http://example.cn/api' })
})
