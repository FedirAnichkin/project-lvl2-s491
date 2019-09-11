import _ from 'lodash';

const getAST = (file1, file2) => {
  const keys = _.union(Object.keys(file1), Object.keys(file2));
  const result = keys.map((key) => {
    const name = key;

    if (!_.has(file1, key)) {
      const value = file2[key];
      const status = 'added';
      return { name, value, status };
    }

    if (!_.has(file2, key)) {
      const value = file1[key];
      const status = 'deleted';
      return { name, value, status };
    }

    if (typeof file1[key] === 'object' && typeof file2[key] === 'object') {
      const status = 'changeless';
      const children = getAST(file1[key], file2[key]);
      return {
        name, value: '', status, children,
      };
    }

    if (file1[key] === file2[key]) {
      const status = 'changeless';
      const value = file1[key];
      return { name, value, status };
    }
    const status = 'changed';
    const value = {
      from: file1[key],
      to: file2[key],
    };

    return { name, value, status };
  });
  return result;
};

export default getAST;
