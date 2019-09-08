const statusType = {
  added: '+ ',
  deleted: '- ',
  changeless: '  ',
};
const addSpace = (count) => {
  const iter = (v, result) => {
    if (v === 0) {
      return result;
    }
    return ` ${iter(v - 1, result)}`;
  };
  return iter(count, '');
};
const stringify = (data, spaceCount) => {
  const textGap = 6;
  const braceGap = 2;
  if (typeof data !== 'object') {
    return data;
  }
  const space = addSpace(spaceCount + textGap);
  const keys = Object.keys(data);
  const result = keys.map(key => `${key}: ${data[key]}`).join('\n');
  return `{\n${space}${result}\n${addSpace(spaceCount + braceGap)}}`;
};
const render = (ast) => {
  const textGap = 4;
  const braceGap = 2;
  const iter = (tree, spaceCount) => {
    const space = addSpace(spaceCount);
    const result = tree.map((element) => {
      if (!element.children) {
        return `${space}${statusType[element.status]}${element.name}: ${stringify(element.value, spaceCount)}`;
      }
      return `${space}${statusType[element.status]}${element.name}: ${iter(element.children, spaceCount + textGap)}`;
    }).join('\n');
    return `{\n${result}\n${addSpace(spaceCount - braceGap)}}`;
  };
  return iter(ast, 2);
};

export default render;
