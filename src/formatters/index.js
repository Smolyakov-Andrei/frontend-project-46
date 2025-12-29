import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
};

const index = (formatName) => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatter;
};
export default index;
