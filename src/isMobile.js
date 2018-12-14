/*
 * 判断浏览器客户端是否为移动端
 * @param   {boolean}   true为移动端
*/

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

export default isMobile
