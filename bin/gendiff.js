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

const genDiff = (filepath1, filepath2) => {
  const data1 = readAndParseFile(filepath1);
  const data2 = readAndParseFile(filepath2);

  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])];
  keys.sort();

  const resultLines = [];

  keys.forEach((key) => {
    const hasKey1 = key in data1;
    const hasKey2 = key in data2;

    if (hasKey1 && hasKey2 && data1[key] === data2[key]) {
      resultLines.push(`  ${key}: ${data1[key]}`);
    } else if (hasKey1 && hasKey2 && data1[key] !== data2[key]) {
      resultLines.push(`- ${key}: ${data1[key]}`);
      resultLines.push(`+ ${key}: ${data2[key]}`);
    } else if (hasKey1 && !hasKey2) {
      resultLines.push(`- ${key}: ${data1[key]}`);
    } else {
      resultLines.push(`+ ${key}: ${data2[key]}`);
    }
  });

  if (resultLines.length === 0) {
    return '{}';
  }

  return `{\n${resultLines.join('\n')}\n}`;
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
