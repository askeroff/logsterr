/* eslint no-unused-vars: 0 */

function prepareStatsData(timelogs, projects) {
  if (!projects || !timelogs) {
    throw new Error('need 2 arguments, arrays for Project Schema and Timelog');
  }
  const newData = [];
  for (const [index, timelog] of timelogs.entries()) {
    const found = projects.find(project => project._id === timelog.project);
    const isAlreadyPushed = newData.find(
      item => item.project === timelog.project
    );
    if (found && !isAlreadyPushed) {
      const tasks = timelogs.filter(item => item.project === found._id);
      const data = {
        project: found._id,
        tasks
      };
      newData.push(data);
    }
  }
  // console.log(newData);
  // console.log('END OF FUNCTION');
  return newData;
}

module.exports = prepareStatsData;
