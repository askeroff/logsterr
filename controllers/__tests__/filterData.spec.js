import filterData from '../common/filterData';

test('returns empty array if nothing is passed', () => {
  const result = filterData();
  expect(result).toEqual([]);
});

test('throws error if no days are passed', () => {
  const result = () => filterData([]);
  expect(result).toThrowError('No days passed to condition filtering');
});

test('returns correct items', () => {
  const date1 = new Date('2018-01-10T16:05:32.778Z');
  const date2 = new Date('2018-01-05T16:05:32.778Z');

  const result = filterData(
    [
      {
        started: new Date('2018-01-13T16:05:32.778Z'),
      },
      {
        started: new Date('2018-01-10T16:05:32.778Z'),
      },
      {
        started: new Date('2018-01-04T16:05:32.778Z'),
      },
    ],
    date2,
    date1
  );
  expect(result).toEqual([
    {
      started: new Date('2018-01-10T16:05:32.778Z'),
    },
  ]);
});
