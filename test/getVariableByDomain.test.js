import { getVariableByDomain } from '../src/index'

const changeDomain = (domain) => {
	Object.defineProperty(document, 'domain', {
		value: domain,
		writable: true,
	})
}

test('通过域名获取对应变量', () => {

	changeDomain('one.example.com')

	const optionsA = {
		'one.example.com': 'this is one domain',
		'two.example.com': 'this is two domain',
	}

	expect(getVariableByDomain(optionsA)).toBe('this is one domain')

	changeDomain('two.example.com')

	let optionsB = {
		'one.example.com_cn': 'this is one domain cn',
		'one.example.com_en': 'this is one domain en',
		'two.example.com_cn': 'this is two domain cn',
		'two.example.com_en': 'this is two domain en',
		lang: 'cn',
	}

	expect(getVariableByDomain(optionsB)).toBe('this is two domain cn')

})
