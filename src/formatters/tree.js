import _ from 'lodash';

const stringify = (value, l) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const margin = '    '.repeat(l + 1);
  const result = JSON.stringify(value, null, 1).replace(/"/g, '');
  return `{\n${margin.slice(0, -1)}${result.slice(2, -2)}\n${margin.slice(0, -4)}}`;
};

const tree = (ast, l = 0) => {
  const diff = ast.reduce((acc, item) => {
    const {
      key,
      type,
      newValue,
      oldValue,
      children,
    } = item;
    if (type === 'complex') {
      return [...acc, `    ${key}: ${tree(children, l + 1)}`];
    }
    if (type === 'actual') {
      return [...acc, `    ${key}: ${stringify(oldValue, l + 1)}`];
    }
    if (type === 'changed') {
      return [...acc, `  - ${key}: ${stringify(oldValue, l + 1)}`,
        `  + ${key}: ${stringify(newValue, l + 1)}`];
    }
    if (type === 'deleted') {
      return [...acc, `  - ${key}: ${stringify(oldValue, l + 1)}`];
    }
    return [...acc, `  + ${key}: ${stringify(newValue, l + 1)}`];
  }, []);
  const margin = '    '.repeat(l);
  const result = diff.join(`\n${margin}`);

  return `{\n${margin}${result}\n${margin}}`;
};

export default tree;
