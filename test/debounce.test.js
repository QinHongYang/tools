import { debounce } from '../src/index'

test('testing debounce 防抖函数, 100ms 后调用', () => {

	const mockFn = jest.fn()
	const run = debounce(mockFn, 100)
	jest.useFakeTimers()

	run()
	expect(mockFn).not.toHaveBeenCalled()

	jest.advanceTimersByTime(50)  // 第 50 ms
	expect(mockFn).not.toHaveBeenCalled()

	jest.advanceTimersByTime(49)  // 第 99 ms
	expect(mockFn).not.toHaveBeenCalled()

	jest.advanceTimersByTime(50)   // 第 150 ms
	expect(mockFn).toHaveBeenCalledTimes(1)

	jest.clearAllTimers()
})
