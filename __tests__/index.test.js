import fs from 'fs';
import gendiff from '../src';

const currentFormat = [['json'], ['yml'], ['ini']];

test.each(currentFormat)(
  '%s',
  (format) => {
    const before = `${__dirname}/__fixtures__/beforeTree.${format}`;
    const after = `${__dirname}/__fixtures__/afterTree.${format}`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/expectedTree.txt`, 'utf-8');
    expect(gendiff(before, after)).toBe(expected);
  },
);
