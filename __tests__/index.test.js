import fs from 'fs';
import gendiff from '../src';

const currentFormat = [['json'], ['yml'], ['ini']];
const dirPath = `${__dirname}/__fixtures__/`;

test.each(currentFormat)(
  '%s',
  (format) => {
    const before = `${dirPath}beforeTree.${format}`;
    const after = `${dirPath}afterTree.${format}`;
    const expected = fs.readFileSync(`${dirPath}expectedJson.txt`, 'utf-8');
    expect(gendiff(before, after, 'json')).toBe(expected);
  },
);
