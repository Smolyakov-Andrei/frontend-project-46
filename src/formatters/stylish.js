const stylish = (diff) => {
  const buildIndent = (depth, offset = 0) => ' '.repeat(depth * 4 + offset)
  const stringify = (value, depth) => {
    if (typeof value !== 'object' || value === null) {
      return String(value)
    }
    const indent = buildIndent(depth)
    const innerIndent = buildIndent(depth + 1)
    const entries = Object.entries(value)
    const lines = entries.map(
      ([key, val]) => `${innerIndent}${key}: ${stringify(val, depth + 1)}`,
    )
    return `{\n${lines.join('\n')}\n${indent}}`
  }
  const format = (nodes, depth) => {
    const indent = buildIndent(depth - 1, 2)
    const lines = nodes.map((node) => {
      const { type, key } = node
      switch (type) {
        case 'nested':
          return `${indent}  ${key}: {\n${format(
            node.children,
            depth + 1,
          )}\n${indent}  }`
        case 'added':
          return `${indent}+ ${key}: ${stringify(node.value, depth)}`
        case 'removed':
          return `${indent}- ${key}: ${stringify(node.value, depth)}`
        case 'changed':
          return [
            `${indent}- ${key}: ${stringify(node.oldValue, depth)}`,
            `${indent}+ ${key}: ${stringify(node.newValue, depth)}`,
          ].join('\n')
        case 'unchanged':
          return `${indent}  ${key}: ${stringify(node.value, depth)}`
        default:
          throw new Error(`Unknown type: ${type}`)
      }
    })
    return lines.join('\n')
  }
  return `{\n${format(diff, 1)}\n}`
}
export default stylish
