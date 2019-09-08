import parse from './parsers';
import render from './render';
import getAST from './getAST';


export default (pathToFile1, pathToFile2) => {
  const file1 = parse(pathToFile1);
  const file2 = parse(pathToFile2);

  const ast = getAST(file1, file2);
  return render(ast);
};
