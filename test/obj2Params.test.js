import { obj2Params } from '../src/index'

// { name: 'hello', msg: 'world' } ==> name=hello&msg=world

test('对象转成 url 参数', () => {
	let obj = { name: 'hello', msg: 'world' }
	expect(obj2Params(obj)).toEqual('name=hello&msg=world')
})
