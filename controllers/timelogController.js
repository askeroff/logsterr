const mongoose = require('mongoose');

const Timelog = mongoose.model('Timelog');
const Task = mongoose.model('Task');

exports.addTime = async (req, res) => {
  req.body.author = req.user._id; // eslint-disable-line no-underscore-dangle
  const timelogPromise = new Timelog(req.body).save();
  const taskPromise = Task.findById(req.body.task, (err, task) => {
    task.timeSpent += req.body.seconds; // eslint-disable-line no-param-reassign
    task.save();
  });
  const [timelog, task] = await Promise.all([timelogPromise, taskPromise]);
  res.json({ timelog, task });
};

exports.getLogs = async (req, res) => {
  const timelogs = await Timelog.getProjects(req.user._id).sort({
    started: 'desc',
  });
  res.json(timelogs);
};
