import _ from 'lodash';

const getAST = (file1, file2) => {
  const keys = _.union(Object.keys(file1), Object.keys(file2));
  const result = keys.map((key) => {
    const name = key;
    if (!_.has(file1, key)) {
      const type = typeof file2[key];
      const value = file2[key];
      const status = 'added';
      return {
        name, type, value, status,
      };
    }

    if (typeof file1[key] === 'object' && typeof file2[key] === 'object') {
      const status = 'changeless';
      const children = getAST(file1[key], file2[key]);
      return {
        name, type: 'object', value: '', status, children,
      };
    }
    if (file1[key] === file2[key]) {
      const status = 'changeless';
      const type = typeof file1[key];
      const value = file1[key];
      return {
        name, type, value, status,
      };
    }
    const status1 = 'deleted';
    const status2 = 'added';
    const type1 = typeof file1[key];
    const type2 = typeof file2[key];
    const value1 = file1[key];
    const value2 = file2[key];

    return [
      {
        name, status: status2, type: type2, value: value2,
      },
      {
        name, status: status1, type: type1, value: value1,
      }];
  });
  return _.flatten(result);
};

export default getAST;
