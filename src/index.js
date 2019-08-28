import _ from 'lodash';
import parse from './parsers';


export default (pathToFile1, pathToFile2) => {
  const file1 = parse(pathToFile1);
  const file2 = parse(pathToFile2);

  const allKeys = { ...file1, ...file2 };

  const reduced = (acc, value, key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      return file1[key] === file2[key]
        ? [...acc, `    ${key}: ${value}`]
        : [...acc, `  + ${key}: ${file2[key]}`, `  - ${key}: ${file1[key]}`];
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return [...acc, `  + ${key}: ${value}`];
    }
    return [...acc, `  - ${key}: ${value}`];
  };

  const preResult = _.reduce(allKeys, reduced, '');
  const result = `{\n${preResult.join('\n')}\n}`;
  return result;
};
