import _ from 'lodash';
import fs from 'fs';

const pathConfig = (config) => {
  const data = fs.readFileSync(config, 'utf-8');
  return JSON.parse(data);
};

export default (pathToFile1, pathToFile2) => {
  const file1 = pathConfig(pathToFile1);
  const file2 = pathConfig(pathToFile2);

  const allKeys = [...Object.keys(file1), ...Object.keys(file2)];
  const uniqueKeys = allKeys.reduce((acc, key) => (acc.includes(key) ? acc : [...acc, key]), []);

  const result = uniqueKeys.reduce((acc, key) => {
    if (file1[key] === file2[key]) {
      return [...acc, `\n    ${key}: ${file2[key]}`];
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      return [...acc, `\n  - ${key}: ${file1[key]}`];
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return [...acc, `\n  + ${key}: ${file2[key]}`];
    }
    return [...acc, `\n  + ${key}: ${file2[key]}`, `\n  - ${key}: ${file1[key]}`];
  }, []);
  return `{${result}\n}`;
};
