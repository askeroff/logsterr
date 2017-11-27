const mongoose = require('mongoose');

const Project = mongoose.model('Project');
const Task = mongoose.model('Task');

exports.add = async (req, res) => {
  req.body.author = req.user._id; // eslint-disable-line no-underscore-dangle
  const project = await new Project(req.body).save();
  res.json({ project });
};

exports.update = async (req, res) => {
  await Project.findById(req.params.id, (err, data) => {
    data.name = req.body.name; // eslint-disable-line no-param-reassign
    data.save();
    res.json({ project: data });
  });
};

exports.getProjects = async (req, res) => {
  const projectsList = await Project.find({
    author: req.user._id,
  });

  res.send({ projectsList });
};

exports.deleteProject = (req, res) => {
  Task.deleteMany(
    {
      project: req.body.id,
    },
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
  Project.findByIdAndRemove(req.body.id, () => {
    res.json({ deleted: true });
  });
};

exports.newTask = async (req, res) => {
  await new Task(req.body).save();
  res.redirect(`/projects/${req.body.project}`);
};

exports.getTasks = async (req, res) => {
  const tasksList = await Task.find({
    project: req.params.id,
  });
  res.json(tasksList);
};

exports.deleteTask = (req, res) => {
  Task.findByIdAndRemove(req.body.id, () => {
    res.json({ deleted: true });
  });
};

exports.renameTask = async (req, res) => {
  await Task.findById(req.body.id, (err, task) => {
    task.name = req.body.name; // eslint-disable-line no-param-reassign
    task.save();
  });
  res.json({ renamed: true });
};

exports.toggleDone = async (req, res) => {
  await Task.findById(req.body.id, (err, task) => {
    task.done = !task.done; // eslint-disable-line no-param-reassign
    task.updated = new Date(); // eslint-disable-line no-param-reassign
    task.save();
    res.json({ done: task.done });
  });
};
