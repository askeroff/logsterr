const timestorage = {};
/*
  This is needed in case of emergency. If tab is not responding, or accidentally closed
  we'll have time when timer was started and will be able to tell the difference between
  now and when the timer was started if user needs it.
*/

timestorage.add = function addTime(id, name, project) {
  const settings = {
    taskId: id,
    taskName: name,
    projectId: project,
    time: Date.now(),
  };
  localStorage.setItem('timestorage', JSON.stringify(settings));
};

timestorage.reset = function addTime() {
  const settings = null;
  localStorage.setItem('timestorage', JSON.stringify(settings));
};

timestorage.get = function addTime() {
  return JSON.parse(localStorage.getItem('timestorage'));
};

export default timestorage;
