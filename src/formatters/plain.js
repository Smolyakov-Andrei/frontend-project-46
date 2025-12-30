const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value)

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const buildPlainLines = (diff, path = '') => {
  const lines = []

  diff.forEach((node) => {
    const currentPath = path ? `${path}.${node.key}` : node.key

    switch (node.type) {
      case 'nested':
        lines.push(...buildPlainLines(node.children, currentPath))
        break

      case 'added':
        lines.push(
          `Property '${currentPath}' was added with value: ${formatValue(
            node.value,
          )}`,
        )
        break

      case 'removed':
        lines.push(`Property '${currentPath}' was removed`)
        break

      case 'changed':
        lines.push(
          `Property '${currentPath}' was updated. From ${formatValue(
            node.oldValue,
          )} to ${formatValue(node.newValue)}`,
        )
        break

      case 'unchanged':
        break

      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  })

  return lines
}

const format = (diff) => buildPlainLines(diff).join('\n')

export default format
