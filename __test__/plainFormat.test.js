import { describe, it, expect } from '@jest/globals';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const execAsync = promisify(exec);
const cliPath = join(process.cwd(), 'bin/gendiff.js');

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const normalize = (str) => str.replace(/\r\n/g, '\n').trim();

describe('Plain format', () => {
  it('should output in plain format for JSON files', async () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expected = readFixture('expected_plain.txt');

    const { stdout } = await execAsync(
      `node ${cliPath} --format plain ${file1} ${file2}`,
    );
    expect(normalize(stdout)).toBe(normalize(expected));
  });

  it('should output in plain format for YAML files', async () => {
    const file1 = getFixturePath('file1.yaml');
    const file2 = getFixturePath('file2.yaml');
    const expected = readFixture('expected_plain.txt');

    const { stdout } = await execAsync(
      `node ${cliPath} --format plain ${file1} ${file2}`,
    );
    expect(normalize(stdout)).toBe(normalize(expected));
  });
});
