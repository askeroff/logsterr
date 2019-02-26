import { getDrilldown, prepareData } from '../chart';
import data from './mockData';

test('Drilldown is the right shape', () => {
  const drilldown = getDrilldown(data);
  expect(drilldown).toMatchSnapshot();
});

test('Prepare data is correct', () => {
  const drilldown = getDrilldown(data);
  const prepared = prepareData(data, drilldown);
  expect(prepared).toMatchSnapshot();
});

