const mongoose = require('mongoose');

const Project = mongoose.model('Project');
// const User = mongoose.model('User');

// const promisify = require('es6-promisify');

exports.add = async (req, res) => {
  req.body.author = req.user._id; // eslint-disable-line no-underscore-dangle
  const project = await new Project(req.body).save();
  res.redirect(`/projects/${project.slug}`);
};
