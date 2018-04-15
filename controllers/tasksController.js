const mongoose = require('mongoose');

const Task = mongoose.model('Task');

exports.newTask = async (req, res) => {
  const task = await new Task(req.body).save();
  res.json({ task });
};

exports.getTasks = async (req, res) => {
  const tasksList = await Task.find({
    project: req.params.id,
  });
  res.json({ tasksList });
};

exports.deleteTask = (req, res) => {
  Task.findByIdAndRemove(req.body.id, () => {
    res.json({ deleted: true });
  });
};

exports.renameTask = async (req, res) => {
  await Task.findById(req.body.id, (err, task) => {
    task.name = req.body.name; // eslint-disable-line no-param-reassign
    task.project = req.body.project; // eslint-disable-line no-param-reassign
    task.save();
  });
  res.json({ renamed: true, body: req.body });
};

exports.toggleDone = async (req, res) => {
  await Task.findById(req.body.id, (err, task) => {
    task.done = !task.done; // eslint-disable-line no-param-reassign
    task.updated = new Date(); // eslint-disable-line no-param-reassign
    task.save();
    res.json({ done: task.done });
  });
};
