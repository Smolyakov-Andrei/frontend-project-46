import { readFileSync } from "fs";
import { extname, resolve } from "path";

export const getAbsolutePath = (filepath) => {
  const cwd = process.cwd();
  return resolve(cwd, filepath);
};

export const getFileExtension = (filepath) => {
  return extname(filepath).toLowerCase();
};

export const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  return readFileSync(absolutePath, "utf-8");
};
