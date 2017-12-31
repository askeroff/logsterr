const moment = require('moment');

function filterData(arr, day1, day2) {
  if (arr === undefined) return [];
  if (day1 === undefined || day2 === undefined) {
    throw new Error('No days passed to condition filtering');
  }
  const filtered = arr.filter(item => {
    const date = new Date(item.started);
    if (moment(date).isBetween(day1, day2, 'day', '[]')) {
      return item;
    }
    return false;
  });
  return filtered;
}

module.exports = filterData;
