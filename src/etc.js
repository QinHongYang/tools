import wx from 'weixin-js-sdk'
import { Toast } from 'mint-ui'
import { get } from '@/plugin/fetch'

// 显示弹窗禁止背景滚动 注意使用时不要影响其他滚动元素
export function forbidScroll (selectors = ['body']) {
	selectors.forEach(item => {
		const domObj = Array.from(document.querySelectorAll(item))
		domObj.forEach(o => o.addEventListener('touchmove', e => e.preventDefault(), false))
	})
}

// 微信配置接口
const ALL_API_LIST = [
	'checkJsApi',
	'chooseImage',
	'previewImage',
	'uploadImage',
	'downloadImage',
	'getNetworkType',
	'openLocation',
	'getLocation',
	'hideOptionMenu',
	'showOptionMenu',
	'closeWindow',
	'hideMenuItems',
	'showMenuItems',
	'hideAllNonBaseMenuItem',
	'showAllNonBaseMenuItem',
	'scanQRCode',
	'onMenuShareAppMessage',
]

export function queryWxApi (jsApiList = ALL_API_LIST) {
	return new Promise((resolve, reject) => {
		get('/mdm2/api/getSignature.do', {
			url: encodeURIComponent(window.location.href),
		})
			.then(data => {
				wx.config({
					debug: false,
					appId: data.appId,
					timestamp: Number(data.timestamp),
					nonceStr: data.nonceStr,
					signature: data.signature,
					jsApiList,
				})

				wx.error(function (res) {
					Toast('调用微信jsapi返回的状态:' + res.errMsg)
					reject() // eslint-disable-line
				})

				wx.ready(resolve)
			})
	})
}
