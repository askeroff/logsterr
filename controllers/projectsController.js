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
      if (id.toString() === project.parent_id.toString()) {
        children.push(project._id.toString());
        recursive(project._id);
      }
    });
  };
  recursive(myID);
  return children;
}

function checkIfHasActiveChildren(projects, id) {
  let result = false;
  projects.forEach(project => {
    if (
      project.parent_id.toString() === id.toString() &&
      project.done === false
    ) {
      result = true;
    }
  });
  return result;
}

function checkIfAnyParentIsDone(projects, id) {
  let result = false;
  function recursive(parentID) {
    projects.forEach(project => {
      if (project.id === parentID && project.done === true) {
        result = true;
      } else if (
        project.id === parentID &&
        project.done !== true &&
        project.parent_id !== '' &&
        result !== true
      ) {
        recursive(project.parent_id);
      }
    });
  }
  recursive(id);
  return result;
}

exports.add = async (req, res) => {
  req.body.author = req.user._id; // eslint-disable-line no-underscore-dangle
  const projects = await Project.find({});
  const hasArchivedParents = checkIfAnyParentIsDone(
    projects,
    req.body.parent_id
  );
  if (hasArchivedParents) {
    res.json({
      error: 'Can not add children to the archived project'
    });
  } else {
    const project = await new Project(req.body).save();
    res.json({ project });
  }
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
  Project.findById(req.params.id, (err, data) => {
    data.name = req.body.name; // eslint-disable-line no-param-reassign
    // if (data.parent_id !== req.body.parentID) {
    //   data.parent_id = req.body.parentID; // eslint-disable-line no-param-reassign
    // }
    data.save();
    res.json({ project: data });
  });
};

exports.addTime = (req, res) => {
  Project.findById(req.body.id, (err, data) => {
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
  const projects = await Project.find({});
  const hasActiveChildren = checkIfHasActiveChildren(projects, req.body.id);
  if (hasActiveChildren) {
    res.json({
      error: 'Project has active children. Archive them first'
    });
  } else {
    const project = await Project.findById(req.body.id);
    project.done = !project.done;
    project.updated = new Date();
    project.save();
    res.json({ done: project.done });
  }
};
