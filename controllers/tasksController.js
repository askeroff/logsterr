const mongoose = require('mongoose');

const Task = mongoose.model('Task');
const Project = mongoose.model('Project');

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

/*
THIS IS WHAT I GET NOW FROM THE CLIENT:
{
   id: '5a394bd1cec11c01124d8783',
   name: 'Coding timetracker',
   currentProject: '5a281df108567500ade59253',
   timeSpent: 97392,
   newProject: '5a2694c6ee7544097c707d1c',
   moveTime: true,
   deleteTime: true
}
*/
exports.renameTask = async (req, res) => {
  const {
    id,
    name,
    currentProject,
    newProject,
    timeSpent,
    moveTime,
    deleteTime,
  } = req.body;
  const promises = [];
  if (moveTime === true) {
    const timeMovePromise = Project.findById(newProject, (err, data) => {
      data.timeSpent += timeSpent; // eslint-disable-line no-param-reassign
      data.save();
    });
    promises.push(timeMovePromise);
  }

  if (deleteTime === true) {
    const timeDeletePromise = Project.findById(currentProject, (err, data) => {
      data.timeSpent -= timeSpent; // eslint-disable-line no-param-reassign
      data.save();
    });
    promises.push(timeDeletePromise);
  }

  const taskEditPromise = Task.findById(id, (err, task) => {
    task.name = name; // eslint-disable-line no-param-reassign
    task.project = newProject; // eslint-disable-line no-param-reassign
    task.save();
  });
  promises.push(taskEditPromise);

  await Promise.all(promises);

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
