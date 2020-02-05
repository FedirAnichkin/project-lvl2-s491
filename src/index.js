import parse from './parsers';
import getFormatter from './formatters';
import getAST from './getAST';


export default (pathToFile1, pathToFile2, outputFormat) => {
  const file1 = parse(pathToFile1);
  const file2 = parse(pathToFile2);

  const ast = getAST(file1, file2);
  const formatter = getFormatter(outputFormat);
  return formatter(ast);
};
