import { timejs } from '../src/index'

let time = '2019-01-02 03:06:08'
let timestamp = +new Date(time)

test('时间格式化', () => {
	expect(timejs(time).format()).toBe(time)
	expect(timejs(timestamp).format()).toBe(time)

	expect(timejs(time).format('YY-MM-DD')).toBe('19-01-02')
	expect(timejs(time).format('YYYY-MM-DD')).toBe('2019-01-02')
	expect(timejs(time).format('YYYY-MM-DD HH:mm')).toBe('2019-01-02 03:06')
	expect(timejs(time).format('YYYY-M-D H:m:s')).toBe('2019-1-2 3:6:8')

})
