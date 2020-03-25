/**
 * @param  {any} val
 */

let isEmpty: (val: any) => boolean
isEmpty = val => val == null || !(Object.keys(val) || val).length

export default isEmpty
