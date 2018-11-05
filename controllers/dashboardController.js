const mongoose = require('mongoose');
const moment = require('moment');
const filterData = require('./common/filterData');
const formatData = require('./common/formatData');
const prepareStatsData = require('./common/prepareStatsData');

const Timelog = mongoose.model('Timelog');
const Project = mongoose.model('Project');

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

function filterByProperty(arr, prop) {
  const f = [];
  return arr.filter(
    obj =>
      f.indexOf(obj[prop].toString()) === -1 && f.push(obj[prop].toString())
  );
}

exports.getData = async (req, res) => {
  const { start, end } = req.query;
  const startDate = `${start} 00:00:00`;
  const endDate = `${end} 23:59:59`;
  const getTimelogs = await Timelog.getProjects(
    req.user._id,
    new Date(startDate),
    new Date(endDate)
  );

  const data = getTimelogs.map(item => {
    const newItem = { ...item };
    const { taskdata } = item;
    newItem.taskName =
      (taskdata && taskdata[0] && taskdata[0].name) || 'Task Not found';
    newItem.done = undefined;
    newItem.__v = undefined;
    newItem.taskdata = undefined;
    newItem.author = undefined;
    return newItem;
  });

  const projects = await Project.find({ author: req.user._id }).lean();

  const timelogs = filterByProperty(data, 'task').map(timelog => {
    const result = { ...timelog };
    const seconds = data.reduce((accum, value) => {
      if (timelog.task.toString() === value.task.toString()) {
        return accum + value.seconds;
      }
      return accum + 0;
    }, 0);
    result.seconds = seconds;
    return result;
  });
  const prepared = prepareStatsData(timelogs, projects);

  res.send({
    dataSent: true,
    prepared
  });
};
