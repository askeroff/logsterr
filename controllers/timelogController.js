const mongoose = require('mongoose');

const Timelog = mongoose.model('Timelog');
const Project = mongoose.model('Project');
const Task = mongoose.model('Task');

exports.goThroughParents = async function goThroughParents(
  id,
  timeSpent,
  callback
) {
  const projects = [];
  async function recursive(myId) {
    const project = await Project.findById(myId);
    callback(project, timeSpent);
    await project.save();
    projects.push({ id: myId });
    if (project.parent_id !== '') {
      await recursive(project.parent_id, timeSpent, callback);
    }
  }
  await recursive(id, timeSpent, callback);
  return projects;
};

exports.addTimeToProject = function addTimeToProject(project, timeSpent) {
  project.timeSpent += timeSpent; // eslint-disable-line no-param-reassign
};

exports.removeTimeFromProject = function removeTimeFromProject(
  project,
  timeSpent
) {
  project.timeSpent -= timeSpent; // eslint-disable-line no-param-reassign
};

exports.addTime = async (req, res) => {
  if (req.body.seconds < 60) {
    res.status(500).send('Will not add time less than one minute');
    return null;
  }

  req.body.author = req.user._id; // eslint-disable-line no-underscore-dangle
  const timelogPromise = new Timelog(req.body).save();
  const taskPromise = Task.findById(req.body.task, (err, task) => {
    task.timeSpent += req.body.seconds; // eslint-disable-line no-param-reassign
    task.save();
  });

  const projectsPromise = exports.goThroughParents(
    req.body.project,
    req.body.seconds,
    exports.addTimeToProject
  );

  const [timelog, task, projects] = await Promise.all([
    timelogPromise,
    taskPromise,
    projectsPromise
  ]);

  res.json({
    timelog,
    task,
    project: { _id: req.body.project },
    projects,
    success: true
  });
  return true;
};

exports.getLogs = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 25;
  const skip = page * limit - limit;

  const timelogsPromise = Timelog.getProjects(req.user._id)
    .sort({
      started: 'desc'
    })
    .skip(skip)
    .limit(limit);

  const countPromise = Timelog.count({
    author: req.user._id
  });

  const [data, count] = await Promise.all([timelogsPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  if (!data.length && skip) {
    res.json({ info: 'This page doesnt exist' });
  }

  res.json({ data, page, pages, count, sent: true });
};

exports.deleteLog = async (req, res) => {
  const timelogTodelete = await Timelog.findById(req.body.id);

  const taskPromise = Task.findById(timelogTodelete.task, (err, task) => {
    if (task && task.timeSpent) {
      task.timeSpent -= timelogTodelete.seconds; // eslint-disable-line no-param-reassign
      task.save();
    }
  });

  const projectsPromise = exports.goThroughParents(
    timelogTodelete.project,
    timelogTodelete.seconds,
    exports.removeTimeFromProject
  );

  await Promise.all([taskPromise, projectsPromise]);
  // to subtract time from the task
  // to subtract time from the the projects reducers (including parents)
  // to subtract time from project from tasks reducers including parents
  Timelog.findByIdAndRemove(req.body.id, () => {
    res.json({
      deleted: true,
      task: timelogTodelete.task,
      project: timelogTodelete.project,
      timeSpent: timelogTodelete.seconds
    });
  });
};
