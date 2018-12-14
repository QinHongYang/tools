import { regTips } from '../src/index'

test('内置正则测试', () => {
	expect(regTips.verify('mobile', '17688888888')).toBe(true)
	expect(regTips.verify('tel', '6556220')).toBe(true)
	expect(regTips.verify('password', 'ab123456')).toBe(true)
	expect(regTips.verify('email', 'noemail')).toBe(true)
	expect(regTips.verify('email', 'gauseen@gmail.com')).toBe(true)
	expect(regTips.verify('save2BitPoint', 1.1)).toBe(true)
	expect(regTips.verify('save2BitPoint', 1.01)).toBe(true)
	expect(regTips.verify('save2BitPoint', 1.012)).toBe(false)
})

test('扩展正则测试', () => {
	expect(regTips.verify('isABC', 'ABC')).toBe(false)

	let regExtend = regTips.extend('isABC', /ABC/g).verify('isABC', 'ABC')

	expect(regExtend).toBe(true)
})
