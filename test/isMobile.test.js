import { isMobile } from '../src/index'

test('userAgent is mobile', () => {
	expect(isMobile).toBeInstanceOf(Function)
})
