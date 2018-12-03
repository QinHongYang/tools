// 使用方式
/*
添加 css
.modal-open{
	position: fixed
	width: 100%
}
*/

/*
* 加载页面先调用 const actionForbid = forbidBodyScroll ()
* 弹出层显示和关闭时 actionForbid(isShow)
* isShow: Boolean
*/

// 禁止body滚动，解决弹出蒙层滑动穿透问题
export default function forbidBodyScroll () {
	let scrollTop = 0
	let bodyClass = 'modal-open'
	let afterOpen = () => {
		scrollTop = document.scrollingElement.scrollTop
		document.body.classList.add(bodyClass)
		document.body.style.top = `-${scrollTop}px`
	}
	let beforeClose = () => {
		document.body.classList.remove(bodyClass)
		document.scrollingElement.scrollTop = scrollTop
	}
	let actionForbid = (isForbid = false) => {
		isForbid ? afterOpen() : beforeClose()
	}
	return actionForbid
}
