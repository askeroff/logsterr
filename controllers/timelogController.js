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
  const page = req.params.page || 1;
  const limit = 5;
  const skip = page * limit - limit;

  const timelogsPromise = Timelog.getProjects(req.user._id)
    .skip(skip)
    .limit(limit)
    .sort({
      started: 'desc',
    });

  const countPromise = Timelog.count();

  const [data, count] = await Promise.all([timelogsPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  if (!data.length && skip) {
    res.json({ info: 'This page doesnt exist' });
  }

  res.json({ data, page, pages, count });
};
