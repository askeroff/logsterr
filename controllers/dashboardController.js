const mongoose = require('mongoose');
const moment = require('moment');
const filterData = require('./common/filterData');
const formatData = require('./common/formatData');

const Timelog = mongoose.model('Timelog');

exports.getMotivationData = async (req, res) => {
  /*
   We are subtracting here to have a buffer of extra week,
   because we show data for this month, but also for the last week
  */
  const setFirstDay = moment()
    .startOf('month')
    .subtract({ days: 14 });
  const setLastDay = moment().endOf('month');

  const data = await Timelog.find({
    author: req.user._id,
    started: {
      $gte: setFirstDay,
      $lte: setLastDay
    }
  });
  const lastSunday = moment().isoWeekday(0)._d;
  const lastMonday = moment().isoWeekday(-6)._d;
  const thisMonday = moment().isoWeekday(1)._d;
  const thisSunday = moment().isoWeekday(7)._d;

  const lastWeek = filterData(data, lastMonday, lastSunday);
  const thisWeek = filterData(data, thisMonday, thisSunday);

  const formattedLastWeek = formatData(lastWeek);
  const formattedThisWeek = formatData(thisWeek);

  res.send({
    lastWeek: formattedLastWeek,
    thisWeek: formattedThisWeek,

    dataSent: true
  });
};

exports.getData = async (req, res) => {
  const { start, end } = req.query;
  const startDate = `${start} 00:00:00`;
  const endDate = `${end} 23:59:59`;
  const data = await Timelog.find({
    author: req.user._id,
    started: {
      $gte: startDate,
      $lte: endDate
    }
  });
  const formatted = formatData(data);
  res.send({
    data: formatted,
    dataSent: true
  });
};
