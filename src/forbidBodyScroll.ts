/*
* 加载页面先调用 const actionForbid = forbidBodyScroll()
* 弹出层显示和关闭时 actionForbid(isShow)
*/

// 创建 style 并插入 head 标签
function createStyleAndAppendHead (): void {
  const styleTag = document.querySelector('#tools_forbid-body__scroll')
  if (styleTag) return

  const styleNode: Element = document.createElement('style')
  styleNode.setAttribute('id', 'tools_forbid-body__scroll')
  const styleStr: string =`
    .forbid-body__scroll {
      position: fixed;
      width: 100%;
    }
  `
  styleNode.innerHTML = styleStr
  const headEle: Element | null = document.querySelector('head')
  if (headEle) headEle.appendChild(styleNode)
}

// 禁止body滚动，解决弹出蒙层滑动穿透问题
export default function forbidBodyScroll (): (isShow: boolean) => void {
  const bodyClass: string = 'forbid-body__scroll'
  let scrollTop: number = 0
  // 滚动元素
  let scrollingEle: Element
  // 插入样式
  createStyleAndAppendHead()
  // 蒙层显示
  const onShow = () => {
    document.body.classList.add(bodyClass)
    document.body.style.top = `-${scrollTop}px`
  }
  // 蒙层隐藏
  const onHidden = () => {
    document.body.classList.remove(bodyClass)
    scrollingEle.scrollTop = scrollTop
  }
  
  return (isShow: boolean) => {
    const tempEle = document.scrollingElement
    if (tempEle === null) return
    scrollingEle = tempEle
    scrollTop = scrollingEle.scrollTop

    isShow ? onShow() : onHidden()
  }
}
