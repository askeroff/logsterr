const mongoose = require('mongoose');

const Project = mongoose.model('Project');
const Task = mongoose.model('Task');

function getAllChildren(myID, projects) {
  // TODO: Possible duplication of code: to reduce
  if (myID === undefined) {
    return [];
  }
  const children = [];
  const recursive = id => {
    projects.forEach(project => {
      if (id === project.parent_id) {
        children.push(project._id.toString());
        recursive(project._id);
      }
    });
  };
  recursive(myID);
  return children;
}

exports.add = async (req, res) => {
  req.body.author = req.user._id; // eslint-disable-line no-underscore-dangle
  const project = await new Project(req.body).save();
  res.json({ project });
};

exports.update = async (req, res) => {
  const projects = await Project.find({});
  const children = getAllChildren(req.params.id, projects);
  const isChild = children.indexOf(req.body.parentID.toString()) !== -1;
  if (isChild) {
    res.json({
      error:
        'Could not update the project. Child project can not be chosen as a parent'
    });
    return;
  }
  await Project.findById(req.params.id, (err, data) => {
    data.name = req.body.name; // eslint-disable-line no-param-reassign
    // if (data.parent_id !== req.body.parentID) {
    //   data.parent_id = req.body.parentID; // eslint-disable-line no-param-reassign
    // }
    data.save();
    res.json({ project: data });
  });
};

exports.addTime = async (req, res) => {
  await Project.findById(req.body.id, (err, data) => {
    data.timeSpent += req.body.time; // eslint-disable-line no-param-reassign
    data.save();
    res.json({ timeAdded: true });
  });
};

exports.getProjects = async (req, res) => {
  const projectsList = await Project.find({
    author: req.user._id
  }).sort({ name: 1 });

  res.send({ projectsList });
};

exports.deleteProject = (req, res) => {
  Task.deleteMany(
    {
      project: req.body.id
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

exports.toggleDone = async (req, res) => {
  await Project.findById(req.body.id, (err, project) => {
    project.done = !project.done; // eslint-disable-line no-param-reassign
    project.updated = new Date(); // eslint-disable-line no-param-reassign
    project.save();
    res.json({ done: project.done });
  });
};
