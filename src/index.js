import { readFile } from "./utils.js";
import { parse } from "./parsers.js";
import _ from "lodash";

const compareObjects = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.sortBy(_.union(keys1, keys2));

  const diff = allKeys.map((key) => {
    const hasInObj1 = _.has(obj1, key);
    const hasInObj2 = _.has(obj2, key);
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!hasInObj1) {
      return `  + ${key}: ${value2}`;
    }

    if (!hasInObj2) {
      return `  - ${key}: ${value1}`;
    }

    if (_.isEqual(value1, value2)) {
      return `    ${key}: ${value1}`;
    }

    return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
  });

  return `{\n${diff.join("\n")}\n}`;
};

const genDiff = (filepath1, filepath2, format = "stylish") => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const obj1 = parse(filepath1, data1);
  const obj2 = parse(filepath2, data2);

  return compareObjects(obj1, obj2);
};

export default genDiff;
