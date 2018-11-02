/* eslint no-unused-vars: 0, no-param-reassign: 0 */

function buildProjects(projects) {
  const parents = projects.filter(project => project.parent_id === '');
  const childrenToRemove = [];
  function findChildren(parent) {
    const children = projects.filter(
      child => child.parent_id.toString() === parent._id.toString()
    );
    return children;
  }
  function putChildren(items) {
    items.forEach(parent => {
      const children = findChildren(parent);
      parent.children = children;
      const childrenIDs = children.map(item => item._id.toString());
      childrenToRemove.push(...childrenIDs);
      if (children.length !== 0) {
        putChildren(children);
      }
    });
  }
  putChildren(parents);
  return projects.filter(
    project => childrenToRemove.indexOf(project._id.toString()) === -1
  );
}

function addTimeToParents(myProjects, myParent, mySeconds) {
  function recursive(projects, parentID, seconds) {
    projects.forEach(project => {
      if (project._id.toString() === parentID) {
        project.seconds = (project.seconds || 0) + seconds;
        if (project.parent_id !== '') {
          recursive(myProjects, project.parent_id, seconds);
        }
      } else if (project.children.length > 0) {
        recursive(project.children, parentID, seconds);
      }
    });
  }
  recursive(myProjects, myParent, mySeconds);
}

function putTimeLog(projects, timelog) {
  function recursive(myProjects, myTimeLog) {
    myProjects.forEach(project => {
      if (timelog.project.toString() === project._id.toString()) {
        if (project.tasks) {
          project.tasks.push(timelog);
        } else {
          project.tasks = [timelog];
        }
        project.seconds = (project.seconds || 0) + timelog.seconds;
        addTimeToParents(projects, project.parent_id, timelog.seconds);
      } else if (project.children.length > 0) {
        recursive(project.children, timelog);
      }
    });
  }
  recursive(projects, timelog);
}

function prepareStatsData(timelogs, projects) {
  if (!projects || !timelogs) {
    throw new Error('need 2 arguments, arrays for Project Schema and Timelog');
  }
  const builtProjects = buildProjects(
    projects.map(project => ({ ...project }))
  );

  timelogs.forEach(timelog => {
    putTimeLog(builtProjects, timelog);
  });
  return builtProjects;
}

module.exports = prepareStatsData;
