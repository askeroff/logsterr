const mongoose = require('mongoose');

const Timelog = mongoose.model('Timelog');
const Project = mongoose.model('Project');
const Task = mongoose.model('Task');

let projectsPromises = [];

function goThroughParents(id, timeSpent, callback) {
  const promise = Project.findById(id, async (err, project) => {
    callback(project, timeSpent);
    project.save();
    if (project.parent_id !== '') {
      goThroughParents(project.parent_id, timeSpent, callback);
    }
  });
  projectsPromises.push(promise);
}

function addTimeToProject(project, timeSpent) {
  project.timeSpent += timeSpent; // eslint-disable-line no-param-reassign
}

function removeTimeFromProject(project, timeSpent) {
  project.timeSpent -= timeSpent; // eslint-disable-line no-param-reassign
}

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
  projectsPromises = [];
  goThroughParents(req.body.project, req.body.seconds, addTimeToProject);

  const [timelog, task] = await Promise.all([
    timelogPromise,
    taskPromise,
    ...projectsPromises
  ]);
  res.json({
    timelog,
    task,
    project: { _id: req.body.project },
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

  projectsPromises = [];
  goThroughParents(
    timelogTodelete.project,
    timelogTodelete.seconds,
    removeTimeFromProject
  );

  await Promise.all([taskPromise, ...projectsPromises]);

  Timelog.findByIdAndRemove(req.body.id, () => {
    res.json({ deleted: true });
  });
};
