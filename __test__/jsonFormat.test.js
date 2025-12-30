/* eslint-disable no-undef */
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
const execAsync = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const cliPath = path.join(__dirname, '..', 'bin', 'gendiff.js')
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
describe('JSON format', () => {
  it('should output valid json for JSON files', async () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    const { stdout } = await execAsync(
      `node ${cliPath} --format json ${file1} ${file2}`,
    )
    expect(() => JSON.parse(stdout)).not.toThrow()
    const parsed = JSON.parse(stdout)
    expect(parsed).toBeInstanceOf(Array)
    expect(parsed).toHaveLength(4)
    const commonNode = parsed.find((node) => node.key === 'common')
    expect(commonNode).toBeDefined()
    expect(commonNode.type).toBe('nested')
    expect(commonNode.children).toBeInstanceOf(Array)
  })
  it('should output valid json for YAML files', async () => {
    const file1 = getFixturePath('file1.yaml')
    const file2 = getFixturePath('file2.yaml')
    const { stdout } = await execAsync(
      `node ${cliPath} --format json ${file1} ${file2}`,
    )
    expect(() => JSON.parse(stdout)).not.toThrow()
    const parsed = JSON.parse(stdout)
    expect(parsed).toBeInstanceOf(Array)
  })
  it('should output valid json for mixed files', async () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.yaml')
    const { stdout } = await execAsync(
      `node ${cliPath} --format json ${file1} ${file2}`,
    )
    expect(() => JSON.parse(stdout)).not.toThrow()
    const parsed = JSON.parse(stdout)
    expect(parsed).toBeInstanceOf(Array)
  })
})
