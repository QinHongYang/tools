/**
 * @param  {T} callback
 * @param  {number=150} delay
 */
export default function debounce<T extends Function> (callback: T, delay: number = 150): () => void {
  let timerId: any = 0
  
  return function (this: any, ...args: any[]): void {

    if (timerId !== undefined) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      callback.apply(this, args)
    }, delay)
  }
}
