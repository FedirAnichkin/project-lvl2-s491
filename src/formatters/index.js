import treeFormatter from './tree';
import plainFormatter from './plain';
import jsonFormatter from './json';

const formatters = {
  tree: treeFormatter,
  plain: plainFormatter,
  json: jsonFormatter,
};

export default outputFormat => formatters[outputFormat];
