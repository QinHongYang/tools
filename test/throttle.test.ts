import { throttle } from '../src/index'
const MockDate = require('mockdate')

jest.clearAllTimers()
jest.useFakeTimers()

let now = Date.now()
const fastForward: (addMs: number) => void = (addMs) => {
  now += addMs
  MockDate.set(now)
  jest.advanceTimersByTime(addMs) // 向后推迟 addMs 毫秒
}

interface MockObj {
  run(one?: string): void;
  age: number;
}

test('节流函数', () => {
  const mockFn = jest.fn(function (this: any) {
    return this.age
  })

  const mockObj: MockObj = {
    run: throttle(mockFn, 100),
    age: 100,
  }

  mockObj.run('first arg')
  expect(mockFn).toHaveBeenCalled()
  // 第一次调用第一个参数为 'first arg'
  expect(mockFn.mock.calls[0][0]).toBe('first arg')
  // 测试 this 指向
  expect(mockFn.mock.results[0].value).toBe(100)
  expect(mockFn).toHaveBeenCalledTimes(1)

  fastForward(50) // 第 50 ms
  mockObj.run()
  expect(mockFn).toHaveBeenCalledTimes(1)

  fastForward(120) // 第 170 ms
  mockObj.run()
  expect(mockFn).toHaveBeenCalledTimes(2)

  MockDate.reset()
  jest.clearAllTimers()
})
