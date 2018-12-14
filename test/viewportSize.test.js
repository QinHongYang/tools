import { viewportSize } from '../src/index'

test('获取当前视口宽高值', () => {
	expect(viewportSize()).toHaveProperty('viewportH')
	expect(viewportSize()).toHaveProperty('viewportW')
})
