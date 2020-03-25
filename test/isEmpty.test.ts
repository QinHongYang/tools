import { isEmpty } from '../src/index'

test('集合是否为空', () => {
	expect(isEmpty(null)).toBe(true)
	expect(isEmpty(undefined)).toBe(true)
	expect(isEmpty('')).toBe(true)
	expect(isEmpty({})).toBe(true)
	expect(isEmpty({ name: 'gauseen' })).toBe(false)
	expect(isEmpty([])).toBe(true)
	expect(isEmpty(['gauseen'])).toBe(false)
	// true - type is not considered a collection
	expect(isEmpty(true)).toBe(true)
	// 123 - type is not considered a collection
	expect(isEmpty(123)).toBe(true)
})
