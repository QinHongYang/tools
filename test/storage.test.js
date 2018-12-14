import { storage } from '../src/index'

// 默认 localStorage
let localStore = storage()

let sessionStore = storage('sessionStorage')

test('本地存储测试', () => {
	localStore.set('lang', 'cn')
	expect(localStore.get('lang')).toBe('cn')

	sessionStore.set('lang', 'en')
	expect(sessionStore.get('lang')).toBe('en')

	localStore.clearItem('lang')
	expect(localStore.get('lang')).toBe(null)

	sessionStore.clearItem('lang')
	expect(sessionStore.get('lang')).toBe(null)
})
