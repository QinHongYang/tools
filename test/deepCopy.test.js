import { deepCopy } from '../src/index'

test('deep copy', () => {
	let personA = {
		name: 'gauseen',
		age: 25,
		hobby: {
			pingpang: 100,
			badminton: 99,
		},
	}

	expect(deepCopy(personA)).toEqual(personA)

	let copyPersonA = deepCopy(personA)
	copyPersonA.hobby.pingpang = 98

	expect(copyPersonA).not.toEqual(personA)

	expect(copyPersonA.hobby.pingpang).not.toBe(personA.hobby.pingpang)
})
