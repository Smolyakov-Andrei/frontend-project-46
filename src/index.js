// eslint-disable-next-line import/no-unresolved
import { readFile } from "./utils.js";
import { parse } from "./parsers.js";
import buildDiff from "./buildDiff.js";
import getFormatter from "./formatters/index.js";

const gendiff = (filepath1, filepath2, formatName = "stylish") => {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);

  const data1 = parse(filepath1, content1);
  const data2 = parse(filepath2, content2);

  const diff = buildDiff(data1, data2);

  return getFormatter(diff, formatName);
};

export default gendiff;
