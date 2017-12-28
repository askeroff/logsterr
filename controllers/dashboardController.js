const mongoose = require('mongoose');
const moment = require('moment');

const Timelog = mongoose.model('Timelog');

function getLastWeekData(arr) {
  const lastSunday = moment().isoWeekday(0)._d;
  const lastMonday = moment().isoWeekday(-6)._d;

  const filtered = arr.filter(item => {
    const date = new Date(item.started);
    if (moment(date).isBetween(lastMonday, lastSunday, 'day', '[]')) {
      return item;
    }
    return false;
  });
  return filtered;
}

function getTodayData(arr) {
  const today = new Date();
  const filtered = arr.filter(item => {
    const date = new Date(item.started);
    if (moment(date).isSame(today, 'day')) {
      return item;
    }
    return false;
  });
  return filtered;
}

function formatData(arr) {
  const newObj = {};

  arr.forEach(item => {
    if (newObj[item.project] === undefined) {
      newObj[item.project] = { time: 0, id: 0 };
      newObj[item.project][item.task] = { taskName: '', time: 0, id: 0 };
      newObj[item.project].time += item.seconds;
      newObj[item.project].id = item.project;
      newObj[item.project][item.task].taskName = item.name;
      newObj[item.project][item.task].id = item.task;
      newObj[item.project][item.task].time += item.seconds;
    } else {
      newObj[item.project].time += item.seconds;
      if (newObj[item.project][item.task] === undefined) {
        newObj[item.project][item.task] = { taskName: '', time: 0, id: 0 };
        newObj[item.project][item.task].taskName = item.name;
        newObj[item.project][item.task].id = item.task;
        newObj[item.project][item.task].time += item.seconds;
      } else {
        newObj[item.project][item.task].time += item.seconds;
      }
    }
  });

  return Object.values(newObj);
}

exports.getLastMonthData = async (req, res) => {
  const date = new Date();
  const setFirstDay = date.setDate(1);
  const getLastDay = new Date(new Date(2008, 11 + 1, 1) - 1).getDate();
  const setLastDay = date.setDate(getLastDay);
  const data = await Timelog.find({
    author: req.user._id,
    started: {
      $gte: setFirstDay,
      $lte: setLastDay,
    },
  });

  const lastWeek = getLastWeekData(data);
  const today = getTodayData(data);
  const formattedWeek = formatData(lastWeek);
  const formattedToday = formatData(today);

  res.send({ lastWeek: formattedWeek, today: formattedToday });
};
