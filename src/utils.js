import { readFileSync } from 'node:fs'
import { extname } from 'node:path'

export const readFile = filepath => {
  const content = readFileSync(filepath, 'utf-8')
  return content.trim()
}

export const getFileExtension = filepath => extname(filepath).toLowerCase()
