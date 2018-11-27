const mongoose = require('mongoose');
const timelogController = require('./timelogController');

const Task = mongoose.model('Task');
const Project = mongoose.model('Project');

exports.newTask = async (req, res) => {
  const task = await new Task(req.body).save();
  res.json({ task });
};

exports.getTasks = async (req, res) => {
  const done = req.query.done === 'true';
  const projectPromise = Project.findById(req.params.id);
  const list = Task.find({
    project: req.params.id,
    done,
    deleted: false
  });

  try {
    const [project, tasksList] = await Promise.all([projectPromise, list]);
    return res.json({ tasksList, project });
  } catch (err) {
    return res.json({ tasksList: [], project: false });
  }
};

exports.deleteTask = (req, res) => {
  Task.findById(req.body.id, (err, task) => {
    task.deleted = true; // eslint-disable-line no-param-reassign
    task.save();
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
    deleteTime
  } = req.body;
  const {
    goThroughParents,
    removeTimeFromProject,
    addTimeToProject
  } = timelogController;
  const promises = [];
  if (moveTime === true) {
    const timeMovePromise = goThroughParents(
      newProject,
      timeSpent,
      addTimeToProject
    );
    promises.push(timeMovePromise);
  }

  if (deleteTime === true) {
    const timeDeletePromise = goThroughParents(
      currentProject,
      timeSpent,
      removeTimeFromProject
    );
    promises.push(timeDeletePromise);
  }

  const taskEditPromise = Task.findById(id, (err, task) => {
    task.name = name; // eslint-disable-line no-param-reassign
    task.project = newProject; // eslint-disable-line no-param-reassign
    task.save();
  });

  await Promise.all([...promises, taskEditPromise]);

  res.json({ renamed: true, body: req.body });
};

exports.toggleDone = async (req, res) => {
  const task = await Task.findById(req.body.id);
  task.done = !task.done;
  task.updated = new Date();
  task.save();
  res.json({ done: task.done });
};
