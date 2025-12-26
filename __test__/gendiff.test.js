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

describe('Flat JSON comparison', () => {
  it('should compare two different JSON files', async () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expected = readFixture('expected_flat.txt').trim();

    const { stdout } = await execAsync(`node ${cliPath} ${file1} ${file2}`);
    expect(stdout.trim()).toBe(expected);
  });

  it('should return empty diff for identical files', async () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file1.json');

    const { stdout } = await execAsync(`node ${cliPath} ${file1} ${file2}`);
    expect(stdout.trim()).toBe(
      '{\n  follow: false\n  host: hexlet.io\n  proxy: 123.234.53.22\n  timeout: 50\n}',
    );
  });

  describe('YAML files', () => {
    it('should compare two different YAML files', async () => {
      const file1 = getFixturePath('file1.yaml');
      const file2 = getFixturePath('file2.yaml');
      const expected = readFixture('expected_flat.txt').trim();

      const { stdout } = await execAsync(`node ${cliPath} ${file1} ${file2}`);
      expect(stdout.trim()).toBe(expected);
    });

    it('should compare YAML and JSON files', async () => {
      const file1 = getFixturePath('file1.yaml');
      const file2 = getFixturePath('file2.json');
      const expected = readFixture('expected_flat.txt').trim();

      const { stdout } = await execAsync(`node ${cliPath} ${file1} ${file2}`);
      expect(stdout.trim()).toBe(expected);
    });
    it('should compare two different JSON files', async () => {
      const file1 = getFixturePath('file1.json');
      const file2 = getFixturePath('file2.json');
      const expected = readFixture('expected_flat.txt').trim();

      const { stdout } = await execAsync(`node ${cliPath} ${file1} ${file2}`);
      const received = stdout.trim();

      console.log('EXPECTED (JSON):', JSON.stringify(expected));
      console.log('RECEIVED (JSON):', JSON.stringify(received));
      console.log('Are equal?', expected === received);

      expect(received).toBe(expected);
    });
  });
});
