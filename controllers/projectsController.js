const mongoose = require('mongoose');

const Project = mongoose.model('Project');
// const User = mongoose.model('User');

// const promisify = require('es6-promisify');

exports.add = async (req, res) => {
  req.body.author = req.user._id; // eslint-disable-line no-underscore-dangle
  const project = await new Project(req.body).save();
  res.redirect(`/projects/${project.slug}`);
};

exports.getProjects = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 10;
  const skip = page * limit - limit; // eslint-disable-line no-mixed-operators

  const projectsPromise = Project.find({
    author: req.user._id,
  })
    .skip(skip)
    .limit(limit);
  // .sort({ created: 'desc' });

  const countPromise = Project.count();

  const [projectsList, count] = await Promise.all([
    projectsPromise,
    countPromise,
  ]);
  const pages = Math.ceil(count / limit);
  if (!projectsList.length && skip) {
    res.redirect('/');
    return;
  }
  res.send({ projectsList, page, pages, count });
};

exports.delete = (req, res) => {
  Project.findByIdAndRemove(req.body.id, () => {
    res.redirect('/projects');
  });
};
