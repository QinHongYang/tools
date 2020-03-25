import { isMobile } from '../src/index'

test('是否为移动端', () => {
	expect(isMobile).toBeInstanceOf(Function)
})
