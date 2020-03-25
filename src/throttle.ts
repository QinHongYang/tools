/**
 * @param  {T} callback
 * @param  {number=150} delay
 */
export default function throttle<T extends Function> (callback: T, delay: number = 150): () => void {
  let last: number = 0

  return function (this: any, ...args: any[]) {
    // const context = this
    const now: number = Date.now()

    if (now - last >= delay) {
      callback.apply(this, args)
      last = now
    }
  }
}
