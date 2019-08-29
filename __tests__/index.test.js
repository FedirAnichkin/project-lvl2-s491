import fs from 'fs';
import gendiff from '../src';

const currentFormat = [['json'], ['yml'], ['ini']];

test.each(currentFormat)(
  'main',
  (format) => {
    const before = `${__dirname}/__fixtures__/before.${format}`;
    const after = `${__dirname}/__fixtures__/after.${format}`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`, 'utf-8');
    expect(gendiff(before, after)).toBe(expected);
  },
);
