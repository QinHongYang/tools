// 获取 html 的字体大小
export default function getFontSize () {
	const htmlDOM = document.querySelector('html')
	const htmlFontSize = window.getComputedStyle(htmlDOM).fontSize

	return +htmlFontSize.replace(/(\d+)\w+/g, '$1') || 1
}
