// 根据各个环境配置不同变量；sit、uat测试环境；it生产环境，无匹配项时为: location
/*
* 调用方式:
const config = {
	it_cn: prodUrlCN,
	it_en: prodUrlEN,
	sit_cn: sitUrlCN,
	sit_en: sitUrlEN,
	uat_cn: uatUrlCN,
	uat_en: uatUrlEN,
	location_cn: sitUrlCN,
	location_en: sitUrlEN,
	lang: 'cn',
}
* 当前环境所用变量
* let url = configENV(config)
*/

export default function configENV (config = { lang: 'cn' }) {
	const _ENV_ = document.domain.replace(/(sit|uat|it|.{0}).*/g, '$1') || 'location'
	const key = `${_ENV_}_${config.lang}`
	return config[key]
}
