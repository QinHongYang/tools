import MockDate from 'mockdate'
import { throttle } from '../src/index'

let now = Date.now()
const fastForward = (addMs) => {
	now += addMs
	MockDate.set(now)
	jest.advanceTimersByTime(addMs)  // 向后推迟 addMs 毫秒
}

test('节流函数，固定时间内必须执行一次', () => {
	const mockFn = jest.fn()
	const run = throttle(mockFn, 100)
	jest.useFakeTimers()

	run()
	expect(mockFn).toHaveBeenCalled()
	expect(mockFn).toHaveBeenCalledTimes(1)

	fastForward(50)    // 第 50 ms
	run()
	expect(mockFn).toHaveBeenCalledTimes(1)

	fastForward(90)  // 第 140 ms
	expect(mockFn).toHaveBeenCalledTimes(2)

	MockDate.reset()
	jest.clearAllTimers()
})
