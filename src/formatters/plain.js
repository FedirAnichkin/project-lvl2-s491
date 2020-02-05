import _ from 'lodash';

const plain = (ast, path = []) => {
  const plained = ast.map((item) => {
    const {
      key,
      newValue,
      oldValue,
      type,
      children,
    } = item;
    const newPath = [...path, key];
    const startLine = `Property '${newPath.join('.')}' was`;
    if (type === 'added') {
      const value = !_.isPlainObject(newValue) ? `${newValue}` : '[complex value]';
      return `${startLine} added with value: ${value}`;
    }
    if (type === 'deleted') {
      return `${startLine} deleted`;
    }
    if (type === 'changed') {
      const checkedOldValue = !_.isPlainObject(oldValue) ? `${oldValue}` : '[complex value]';
      const checkedNewValue = !_.isPlainObject(newValue) ? `${newValue}` : '[complex value]';
      return `${startLine} changed. From ${checkedOldValue} to ${checkedNewValue}`;
    }
    if (type === 'actual') {
      return '';
    }
    return plain(children, newPath);
  });
  return _.flatten(plained).join('\n');
};

export default plain;
