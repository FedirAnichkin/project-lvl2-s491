import { has, union, isPlainObject } from 'lodash';

const getAst = (tree1, tree2) => {
  const keys = union(Object.keys(tree1), Object.keys(tree2));
  const result = keys.reduce((acc, key) => {
    if (tree1[key] && tree2[key]) {
      if (isPlainObject(tree1[key]) && isPlainObject(tree2[key])) {
        return [...acc, {
          type: 'complex',
          key,
          children: getAst(tree1[key], tree2[key]),
        }];
      }
      if (tree1[key] === tree2[key]) {
        return [...acc, {
          type: 'actual',
          key,
          oldValue: tree1[key],
        }];
      }
      return [...acc, {
        type: 'changed',
        key,
        oldValue: tree1[key],
        newValue: tree2[key],
      }];
    }
    if (!has(tree1, key)) {
      return [...acc, {
        type: 'added',
        key,
        newValue: tree2[key],
      }];
    }
    return [...acc, {
      type: 'deleted',
      key,
      oldValue: tree1[key],
    }];
  }, []);
  return result;
};

export default getAst;
