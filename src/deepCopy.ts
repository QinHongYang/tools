/**
 * @param  {T} source
 * @param  {} map=newWeakMap()
 * @returns T
 */
export default function deepCopy<T> (source: T, map = new WeakMap()): T {
  if (source === null || typeof source !== 'object') {
    return source
  }

  if (map.get(source as any)) {
    return source
  }

  map.set(source as any, true)

  const copy = Array.isArray(source) ? [] as any[] : {} as { [key: string]: any }

  Object.keys(source).forEach((key) => {
    copy[key] = deepCopy<any>((source as any)[key], map)
  })

  return copy as T
}