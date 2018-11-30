const moment = require('moment');

function filterData(arr, day1, day2) {
  if (arr === undefined) return [];
  if (day1 === undefined || day2 === undefined) {
    throw new Error('No days passed to condition filtering');
  }
  return arr.filter(item =>
    moment(new Date(item.started)).isBetween(day1, day2, 'day', '[]')
  );
}

module.exports = filterData;
