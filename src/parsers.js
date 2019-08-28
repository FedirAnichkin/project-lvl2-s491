import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (configPath) => {
  const format = path.extname(configPath);
  const data = fs.readFileSync(configPath, 'utf-8');
  let parse;
  if (format === '.json') {
    // eslint-disable-next-line prefer-destructuring
    parse = JSON.parse;
  } else if (format === '.yml') {
    parse = yaml.safeLoad;
  }
  return parse(data);
};
