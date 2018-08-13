/*
  format data for the dashboard component to use on client side
*/

function formatData(arr) {
  const newObj = {};

  arr.forEach(item => {
    // console.log(item);
    if (newObj[item.project] === undefined) {
      newObj[item.project] = { time: 0, id: 0 };
      newObj[item.project][item.task] = { taskName: '', time: 0, id: 0 };
      newObj[item.project].time += item.seconds;
      newObj[item.project].id = item.project;
      newObj[item.project][item.task].taskName = item.name;
      newObj[item.project][item.task].id = item.task;
      newObj[item.project][item.task].time += item.seconds;
    } else {
      newObj[item.project].time += item.seconds;
      if (newObj[item.project][item.task] === undefined) {
        newObj[item.project][item.task] = { taskName: '', time: 0, id: 0 };
        newObj[item.project][item.task].taskName = item.name;
        newObj[item.project][item.task].id = item.task;
        newObj[item.project][item.task].time += item.seconds;
      } else {
        newObj[item.project][item.task].time += item.seconds;
      }
    }
  });

  return Object.values(newObj);
}

module.exports = formatData;
