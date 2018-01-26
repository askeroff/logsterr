const mongoose = require('mongoose');

const Timelog = mongoose.model('Timelog');
const Project = mongoose.model('Project');
const Task = mongoose.model('Task');

exports.addTime = async (req, res) => {
  req.body.author = req.user._id; // eslint-disable-line no-underscore-dangle
  const timelogPromise = new Timelog(req.body).save();
  const taskPromise = Task.findById(req.body.task, (err, task) => {
    task.timeSpent += req.body.seconds; // eslint-disable-line no-param-reassign
    task.save();
  });
  const projectPromise = Project.findById(req.body.project, (err, project) => {
    project.timeSpent += req.body.seconds; // eslint-disable-line no-param-reassign
    project.save();
  });

  const [timelog, task, project] = await Promise.all([
    timelogPromise,
    taskPromise,
    projectPromise,
  ]);
  res.json({ timelog, task, project });
};

exports.getLogs = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 25;
  const skip = page * limit - limit;

  const timelogsPromise = Timelog.getProjects(req.user._id)
    .sort({
      started: 'desc',
    })
    .skip(skip)
    .limit(limit);

  const countPromise = Timelog.count({
    author: req.user._id,
  });

  const [data, count] = await Promise.all([timelogsPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  if (!data.length && skip) {
    res.json({ info: 'This page doesnt exist' });
  }

  res.json({ data, page, pages, count });
};

exports.deleteLog = async (req, res) => {
  const timelogTodelete = await Timelog.findById(req.body.id);

  const taskPromise = Task.findById(timelogTodelete.task, (err, task) => {
    if (!task) {
      return 1;
    }
    task.timeSpent -= timelogTodelete.seconds; // eslint-disable-line no-param-reassign
    return task.save();
  });

  const projectPromise = Project.findById(
    timelogTodelete.project,
    (err, project) => {
      project.timeSpent -= timelogTodelete.seconds; // eslint-disable-line no-param-reassign
      project.save();
    }
  );

  await Promise.all([taskPromise, projectPromise]);

  Timelog.findByIdAndRemove(req.body.id, () => {
    res.json({ deleted: true });
  });
};
