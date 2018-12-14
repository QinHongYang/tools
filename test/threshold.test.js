import MockDate from 'mockdate'
import { threshold } from '../src/index'

let now = Date.now()
const fastForward = (addMs) => {
	now += addMs
	MockDate.set(now)
}

test('禁止频繁操作，但第一次立即执行', () => {
	const mockFn = jest.fn()
	const run = threshold(mockFn, 100)

	run()
	run()
	expect(mockFn).toHaveBeenCalled()
	expect(mockFn).toHaveBeenCalledTimes(1)

	fastForward(50)  // 第 50 ms
	run()
	expect(mockFn).toHaveBeenCalledTimes(1)

	fastForward(101)  // 第 101 ms
	run()
	expect(mockFn).toHaveBeenCalledTimes(2)

	MockDate.reset()
})
