/**
 * @param  {any} value
 * @returns string
 */

export default function typer (value: any): string {
  const typeStr = Object.prototype.toString.call(value)
  return typeStr.slice(8, -1).toLowerCase()
}
