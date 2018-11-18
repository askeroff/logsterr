const mongoose = require('mongoose');
const moment = require('moment');
const filterData = require('./common/filterData');
const prepareStatsData = require('./common/prepareStatsData');

const Timelog = mongoose.model('Timelog');
const Project = mongoose.model('Project');

function pickProject(projects, projectId) {
  let result = null;
  function recursive(data, id) {
    data.forEach(item => {
      if (item._id.toString() === id.toString()) {
        result = item;
      } else if (item.children && item.children.length > 0) {
        recursive(item.children, id);
      }
    });
  }
  recursive(projects, projectId);
  return result;
}

exports.getMotivationData = async (req, res) => {
  /*
   We are subtracting here to have a buffer of extra week,
   because we show data for this month, but also for the last week
  */
  const setFirstDay = new Date(
    moment()
      .startOf('month')
      .subtract({ days: 14 })
      .format('YYYY-MM-DD')
  );
  const setLastDay = new Date(
    moment()
      .endOf('month')
      .format('YYYY-MM-DD')
  );

  const getTimelogs = await Timelog.getProjects(
    req.user._id,
    setFirstDay,
    setLastDay
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

  const lastSunday = moment().isoWeekday(0)._d;
  const lastMonday = moment().isoWeekday(-6)._d;
  const thisMonday = moment().isoWeekday(1)._d;
  const thisSunday = moment().isoWeekday(7)._d;

  const lastWeek = filterData(data, lastMonday, lastSunday);
  const thisWeek = filterData(data, thisMonday, thisSunday);
  const projects = await Project.find({ author: req.user._id }).lean();

  const formattedLastWeek = prepareStatsData(lastWeek, projects);
  const formattedThisWeek = prepareStatsData(thisWeek, projects);
  const formattedLastWeekProject = pickProject(
    formattedLastWeek,
    req.query.project
  );
  const formattedThisWeekProject = pickProject(
    formattedThisWeek,
    req.query.project
  );
  res.send({
    lastWeek: formattedLastWeekProject,
    thisWeek: formattedThisWeekProject,
    dataSent: true
  });
};

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

  const prepared = prepareStatsData(data, projects);

  res.send({
    dataSent: true,
    prepared
  });
};
