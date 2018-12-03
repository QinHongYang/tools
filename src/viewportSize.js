/**
 * 获取视口宽、高
 *
 * @params 无
 *  @return {Object} 宽、高
 */
export default function viewportSize () {
	let viewportHeight = window.innerHeight || document.documentElement.clientHeight
	let viewportWidth = window.innerWidth || document.documentElement.clientWidth
	return {
		viewportH: viewportHeight,
		viewportW: viewportWidth,
	}
}
