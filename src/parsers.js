import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (configPath) => {
  const format = path.extname(configPath);
  const data = fs.readFileSync(configPath, 'utf-8');
  let parse;
  if (format === '.json') {
    parse = JSON.parse(data);
  } else if (format === '.yml') {
    parse = yaml.safeLoad(data);
  } else if (format === '.ini') {
    parse = ini.parse(data);
  }
  return parse;
};
