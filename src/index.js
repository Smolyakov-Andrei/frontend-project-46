export default function genDiff(filepath1, filepath2, format = "stylish") {
  return `Comparing ${filepath1} and ${filepath2} with format: ${format}`;
}
