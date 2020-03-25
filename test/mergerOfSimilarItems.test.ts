import { mergerOfSimilarItems } from '../src/index'

const source = [
	{ name: 'A', price: 10, num: 3 },
	{ name: 'A', price: 9, num: 2 },
	{ name: 'B', price: 9, num: 2 },
	{ name: 'A', price: 10, num: 3 },
	{ name: 'B', price: 9, num: 1 },
	{ name: 'B', price: 10, num: 2 },
]

test('数组合并同类项', () => {
	const mergedResult = [
		{ name: 'A', price: 10, num: 6 },
		{ name: 'A', price: 9, num: 2 },
		{ name: 'B', price: 9, num: 3 },
		{ name: 'B', price: 10, num: 2 },
	]
	expect(mergerOfSimilarItems(source, ['name', 'price'], ['num'])).toEqual(mergedResult)
})
