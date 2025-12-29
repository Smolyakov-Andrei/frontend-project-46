#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { parse } from '../src/parsers.js';

const program = new Command();

// eslint-disable-next-line consistent-return
const readAndParseFile = (filepath) => {
  try {
    const content = readFileSync(filepath, 'utf-8').trim();
    return parse(filepath, content);
  } catch (error) {
    console.error(`Error reading or parsing ${filepath}:`, error.message);
    process.exit(1);
  }
};

const stringify = (value, depth = 1) => {
  if (typeof value !== 'object' || value === null) {
    return value === '' ? '' : String(value);
  }

  const indent = '    '.repeat(depth);
  const entries = Object.entries(value);
  const lines = entries.map(
    ([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`,
  );

  return `{\n${lines.join('\n')}\n${'    '.repeat(depth - 1)}}`;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = readAndParseFile(filepath1);
  const data2 = readAndParseFile(filepath2);

  const buildDiff = (obj1, obj2, depth = 1) => {
    const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])];
    keys.sort();

    const indent = '    '.repeat(depth - 1);
    const innerIndent = '    '.repeat(depth);

    const lines = [];

    keys.forEach((key) => {
      const hasKey1 = key in obj1;
      const hasKey2 = key in obj2;
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (
        hasKey1
        && hasKey2
        && typeof value1 === 'object'
        && value1 !== null
        && typeof value2 === 'object'
        && value2 !== null
        && !Array.isArray(value1)
        && !Array.isArray(value2)
      ) {
        lines.push(`${innerIndent}${key}: {`);
        lines.push(...buildDiff(value1, value2, depth + 1));
        lines.push(`${innerIndent}}`);
        // eslint-disable-next-line brace-style
      } else if (!hasKey1 && hasKey2) {
        lines.push(`${indent}  + ${key}: ${stringify(value2, depth + 1)}`);
        // eslint-disable-next-line brace-style
      } else if (hasKey1 && !hasKey2) {
        lines.push(`${indent}  - ${key}: ${stringify(value1, depth + 1)}`);
        // eslint-disable-next-line brace-style
      } else if (value1 !== value2) {
        lines.push(`${indent}  - ${key}: ${stringify(value1, depth + 1)}`);
        lines.push(`${indent}  + ${key}: ${stringify(value2, depth + 1)}`);
        // eslint-disable-next-line brace-style
      } else {
        lines.push(`${innerIndent}${key}: ${stringify(value1, depth + 1)}`);
      }
    });

    return lines;
  };

  const diffLines = buildDiff(data1, data2);
  return `{\n${diffLines.join('\n')}\n}`;
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    console.log(diff);
  });

program.parse();
