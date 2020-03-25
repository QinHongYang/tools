/**
 * @param  {SourceItem[]} sourceArr
 * @param  {Keys[]} conditiondProps
 * @param  {Keys[]} mergeProps
 * @returns any
 */

interface SourceItem {
  [key: string]: any;
}

type Keys = keyof SourceItem

// 根据 conditiondProps 生成 conditionKey
/**
 * @param  {SourceItem} item
 * @param  {Keys[]} conditiondProps
 * @returns string
 */
function getConditionKey (item: SourceItem, conditiondProps: Keys[]): string {
  return conditiondProps.reduce((acc, conditionKey) => {
    acc += item[conditionKey]
    return acc
  }, 'key_') as string
}

// 当 conditionKey 相同时，合并需要合并的属性值
/**
 * @param  {SourceItem} prevItem
 * @param  {SourceItem} currItem
 * @param  {Keys[]} mergeProps
 * @returns SourceItem
 */
function mergeSameKeyValue (prevItem: SourceItem, currItem: SourceItem, mergeProps: Keys[]): SourceItem {
  return mergeProps.reduce((prevItem, mergeKey) => {
    prevItem[mergeKey] += currItem[mergeKey]
    return prevItem
  }, prevItem)
}

export default function mergerOfSimilarItems (sourceArr: SourceItem[], conditiondProps: Keys[], mergeProps: Keys[]): any[] {
  const mergedObj = sourceArr.reduce((acc, item) => {
    const conditionKey: string = getConditionKey(item, conditiondProps)

    if (acc[conditionKey]) {
      acc[conditionKey] = mergeSameKeyValue(acc[conditionKey], item, mergeProps)
    } else {
      acc[conditionKey] = item
    }

    return acc
  }, {})

  return Object.values(mergedObj)
}
