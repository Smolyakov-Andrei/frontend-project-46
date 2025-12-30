const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value)
const buildDiff = (obj1, obj2) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])]
  keys.sort()
  return keys.map((key) => {
    const hasKey1 = key in obj1
    const hasKey2 = key in obj2
    const value1 = obj1[key]
    const value2 = obj2[key]
    if (hasKey1 && hasKey2 && isObject(value1) && isObject(value2)) {
      return {
        type: 'nested',
        key,
        children: buildDiff(value1, value2),
      }
    }
    if (!hasKey1 && hasKey2) {
      return { type: 'added', key, value: value2 }
    }
    if (hasKey1 && !hasKey2) {
      return { type: 'removed', key, value: value1 }
    }
    if (value1 === value2) {
      return { type: 'unchanged', key, value: value1 }
    }
    return {
      type: 'changed',
      key,
      oldValue: value1,
      newValue: value2,
    }
  })
}
export default buildDiff
