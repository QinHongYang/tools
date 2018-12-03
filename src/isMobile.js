/*
 * 判断浏览器是否为移动端
 * @param   {boolean}   true为移动端
*/
export default function isMobile () {
	let userAgentInfo = navigator.userAgent

	if (!!userAgentInfo.match(/AppleWebKit.*Mobile.*/) || !!userAgentInfo.match(/AppleWebKit/)) {
		let temp = userAgentInfo.toLowerCase()
		if (temp.indexOf('android') > -1 || temp.indexOf('iphone') > -1 ||
					temp.indexOf('ipad') > -1 || temp.indexOf('windows phone') > -1 ||
					temp.indexOf('blackberry') > -1 || temp.indexOf('hp-tablet') > -1 ||
					temp.indexOf('symbian') > -1 || temp.indexOf('phone') > -1
		) {
			return true
		}
	}

	return false
}
