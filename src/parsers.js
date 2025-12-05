import { getFileExtension } from "./utils.js";

const parseJSON = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Invalid JSON: ${error.message}`);
  }
};

export const parse = (filepath, data) => {
  const extension = getFileExtension(filepath);

  switch (extension) {
    case ".json":
      return parseJSON(data);

    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};
