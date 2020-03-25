import { debounce } from '../src/index'

interface MockObj {
  run(oneArg?: string): void;
  age: number;
}

jest.clearAllTimers()
jest.useFakeTimers()

test('testing debounce 防抖函数, 100ms 后调用', () => {
  
  const mockFn = jest.fn(function (this: any) {
    return this.age
  })
  const mockObj: MockObj = {
    run: debounce(mockFn, 100),
    age: 100,
  }

	mockObj.run()
	jest.advanceTimersByTime(20) // 第 20 ms
	mockObj.run('first arg')
	expect(mockFn).not.toHaveBeenCalled()

	jest.advanceTimersByTime(50) // 第 70 ms
	expect(mockFn).not.toHaveBeenCalled()

	jest.advanceTimersByTime(49) // 第 119 ms
	expect(mockFn).not.toHaveBeenCalled()

  jest.advanceTimersByTime(1) // 第 120 ms
  // 测试 this 指向
  expect(mockFn.mock.results[0].value).toBe(100)
  // 第一次调用第一个参数为 'first arg'
  expect(mockFn.mock.calls[0][0]).toBe('first arg')
	expect(mockFn).toHaveBeenCalledTimes(1)

	jest.clearAllTimers()
})
