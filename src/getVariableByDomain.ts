/**
 * @param  {Options} options
 * @returns any
 */

interface Options {
  [key: string]: any;
  lang?: string;
}

export default function getVariableByDomain (options: Options): any {
  const domain: string = document.domain
  const _key: string = options.lang ? `${domain}_${options.lang}` : `${domain}`
  return options[_key]
}
