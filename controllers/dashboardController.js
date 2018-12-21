const mongoose = require('mongoose');
const moment = require('moment-timezone');
// const filterData = require('./common/filterData');
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

function formatLogs(logs) {
  return logs.map(item => {
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
}

exports.getMotivationData = async (req, res) => {
  const lastSunday = moment(+req.query.date)
    .isoWeekday(0)
    .endOf('day')
    .valueOf();
  const lastMonday = moment(+req.query.date)
    .isoWeekday(-6)
    .startOf('day')
    .valueOf();
  const thisMonday = moment(+req.query.date)
    .isoWeekday(1)
    .startOf('day')
    .valueOf();
  const thisSunday = moment(+req.query.date)
    .isoWeekday(7)
    .endOf('day')
    .valueOf();

  const getTimelogs = await Timelog.getProjects(
    req.user._id,
    new Date(lastMonday),
    new Date(lastSunday)
  );

  const getTimelogs2 = await Timelog.getProjects(
    req.user._id,
    new Date(thisMonday),
    new Date(thisSunday)
  );

  const lastWeek = formatLogs(getTimelogs);
  const thisWeek = formatLogs(getTimelogs2);

  console.log(lastWeek.length);
  console.log(thisWeek.length);

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

  const getTimelogs = await Timelog.getProjects(
    req.user._id,
    new Date(+start),
    new Date(+end)
  );

  const data = formatLogs(getTimelogs);
  const projects = await Project.find({ author: req.user._id }).lean();

  const prepared = prepareStatsData(data, projects);

  res.send({
    dataSent: true,
    prepared
  });
};
