import { getVariableByDomain } from '../src/index'

const changeDomain = (domain: string) => {
	Object.defineProperty(document, 'domain', {
		value: domain,
		writable: true,
	})
}

test('通过域名获取对应变量', () => {
	changeDomain('one.eg.com')

	const optionsA = {
		'one.eg.com': 'this is one domain',
		'two.eg.com': 'this is two domain',
	}

	expect(getVariableByDomain(optionsA)).toBe('this is one domain')

	changeDomain('two.eg.com')

	const optionsB = {
		'one.eg.com_cn': 'this is one domain cn',
		'one.eg.com_en': 'this is one domain en',
		'two.eg.com_cn': 'this is two domain cn',
		'two.eg.com_en': 'this is two domain en',
		lang: 'cn',
	}

	expect(getVariableByDomain(optionsB)).toBe('this is two domain cn')
})
