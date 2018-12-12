// 根据不同域名，获取不同变量
/*
* 调用方式:
# 普通调用：
const options = {
	'one.example.com': 'this is one domain',
	'two.example.com': 'this is two domain',
}

# 配置语言调用：
const options = {
	'one.example.com_cn': 'this is one domain cn',
	'one.example.com_en': 'this is one domain en',
	'two.example.com_cn': 'this is two domain cn',
	'two.example.com_en': 'this is two domain en',
	lang: <'cn' OR 'en'>,
}

* 当前环境所用变量
* let result = getVariableByDomain(options)
*/

export default function getVariableByDomain (options = {}) {
	const domain = document.domain
	const _key = options.lang ? `${domain}_${options.lang}` : `${domain}`
	return options[_key]
}
