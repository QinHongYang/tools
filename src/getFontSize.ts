/**
 * @param  {string='html'} selector
 * @returns number
 */

// 获取元素字号
export default function getFontSize (selector: string = 'html'): number | undefined {
  const dom: Element | null = document.querySelector(selector)
  if (dom === null) return undefined
  
  const eleFontSize = window.getComputedStyle(dom).fontSize
  return +eleFontSize.replace(/(\d+)\w+/g, '$1') || 1
}