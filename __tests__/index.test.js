import fs from 'fs';
import gendiff from '../src';

test(
  'first',
  () => {
    const before = `${__dirname}/__fixtures__/before.json`;
    const after = `${__dirname}/__fixtures__/after.json`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`, 'utf-8');
    expect(gendiff(before, after)).toBe(expected);
  },
);
