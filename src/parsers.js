
import { extname } from 'node:path'
import yaml from 'yaml'

export const getFileExtension = filepath => extname(filepath).toLowerCase()

const parseJSON = content => {
  try {
    return JSON.parse(content)
  } catch (error) {
    throw new Error(`Invalid JSON: ${error.message}`)
  }
}

const parseYAML = content => {
  try {
    return yaml.parse(content)
  } catch (error) {
    throw new Error(`Invalid YAML: ${error.message}`)
  }
}

export const parse = (filepath, content) => {
  const extension = getFileExtension(filepath)

  switch (extension) {
    case '.json':
      return parseJSON(content)
    case '.yaml':
    case '.yml':
      return parseYAML(content)
    default:
      throw new Error(`Unsupported file format: ${extension}`)
  }
}
