const mongoose = require('mongoose');

const Project = mongoose.model('Project');
// const User = mongoose.model('User');

// const promisify = require('es6-promisify');

exports.add = async (req, res) => {
  req.body.author = req.user._id; // eslint-disable-line no-underscore-dangle
  await new Project(req.body).save();
  res.redirect('/projects');
};

exports.update = (req, res) => {
  Project.findById(req.params.id, (err, project) => {
    project.name = req.body.name; // eslint-disable-line no-param-reassign
    project.save();
  });

  res.redirect('/projects');
};

exports.getProjects = async (req, res) => {
  const projectsList = await Project.find({
    author: req.user._id,
  });

  res.send({ projectsList });
};

exports.delete = (req, res) => {
  Project.findByIdAndRemove(req.body.id, () => {
    res.json({ deleted: true });
  });
};
