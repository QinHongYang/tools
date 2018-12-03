/**
 * 设置页面 title，单页面应用，兼容 title 问题
 *
 * @param  {String} title 要设置的 title
 */
export default function setTitle (title) {
	document.title = title
	var iframe = document.createElement('iframe')
	iframe.style.display = 'none'
	iframe.onload = () => setTimeout(() => iframe.remove(), 9)
	document.body.appendChild(iframe)
}
