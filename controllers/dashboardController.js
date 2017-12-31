const mongoose = require('mongoose');
const moment = require('moment');
const filterData = require('./common/filterData');

const Timelog = mongoose.model('Timelog');

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
  /*
   We are subtracting here to have a buffer of extra week,
   because we show data for this month, but also for the last week
  */
  const setFirstDay = moment()
    .startOf('month')
    .subtract({ days: 7 });
  const setLastDay = moment().endOf('month');

  const data = await Timelog.find({
    author: req.user._id,
    started: {
      $gte: setFirstDay,
      $lte: setLastDay,
    },
  });
  const lastSunday = moment().isoWeekday(0)._d;
  const lastMonday = moment().isoWeekday(-6)._d;
  const firstDay = moment().startOf('month');
  const todayIs = new Date();

  const lastWeek = filterData(data, lastMonday, lastSunday);
  const today = filterData(data, todayIs, todayIs);
  const month = filterData(data, firstDay, setLastDay);

  const formattedWeek = formatData(lastWeek);
  const formattedToday = formatData(today);
  const formattedMonth = formatData(month);

  res.send({
    lastWeek: formattedWeek,
    today: formattedToday,
    month: formattedMonth,
  });
};
