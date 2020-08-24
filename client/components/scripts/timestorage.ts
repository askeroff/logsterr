const timestorage = {
  add(id, name, project): void {
    const settings = {
      taskId: id,
      taskName: name,
      projectId: project,
      time: Date.now(),
    };
    localStorage.setItem('timestorage', JSON.stringify(settings));
  },
  reset(): void {
    const settings = null;
    localStorage.setItem('timestorage', JSON.stringify(settings));
  },
  get(): {time: number; taskId: string; projectId: string; taskName: string} {
    return JSON.parse(localStorage.getItem('timestorage'));
  }
};
/*
  This is needed in case of emergency. If tab is not responding, or accidentally closed
  we'll have time when timer was started and will be able to tell the difference between
  now and when the timer was started if user needs it.
*/


export default timestorage;
