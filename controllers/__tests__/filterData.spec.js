import filterData from '../common/filterData';

test('returns empty array if nothing is passed', () => {
  const result = filterData();
  expect(result).toEqual([]);
});

test('throws error if no days are passed', () => {
  const result = () => filterData([]);
  expect(result).toThrowError('No days passed to condition filtering');
});
