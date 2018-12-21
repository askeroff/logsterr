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
  const lastSunday = moment()
    .isoWeekday(0)
    .endOf('day')._d;
  const lastMonday = moment()
    .isoWeekday(-6)

    .startOf('day')._d;
  const thisMonday = moment()
    .isoWeekday(1)
    .startOf('day')._d;
  const thisSunday = moment()
    .isoWeekday(7)
    .endOf('day')._d;

  const getTimelogs = await Timelog.getProjects(
    req.user._id,
    new Date(lastMonday),
    new Date(thisSunday)
  );

  const data = formatLogs(getTimelogs);

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
  // const startDate = `${start} 00:00:00`;
  // const endDate = `${end} 23:59:59`;
  const getTimelogs = await Timelog.getProjects(
    req.user._id,
    new Date(start),
    new Date(end)
  );

  const data = formatLogs(getTimelogs);
  const projects = await Project.find({ author: req.user._id }).lean();

  const prepared = prepareStatsData(data, projects);

  res.send({
    dataSent: true,
    prepared
  });
};
