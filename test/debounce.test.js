import { debounce } from '../src/index'

test('testing debounce 防抖函数, 100ms 后调用', () => {

	const mockFn = jest.fn()
	const run = debounce(mockFn, 100)
	jest.useFakeTimers()

	run()
	jest.advanceTimersByTime(20)  // 第 20 ms
	run()
	expect(mockFn).not.toHaveBeenCalled()

	jest.advanceTimersByTime(50)  // 第 70 ms
	expect(mockFn).not.toHaveBeenCalled()

	jest.advanceTimersByTime(49)  // 第 119 ms
	expect(mockFn).not.toHaveBeenCalled()

	jest.advanceTimersByTime(1)   // 第 120 ms
	expect(mockFn).toHaveBeenCalledTimes(1)

	jest.clearAllTimers()
})
