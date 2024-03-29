export function formatDate(date) {
  const newDate = new Date(date);
  const parsedDate = `${newDate.getDate()}/${newDate.getMonth() +
    1}/${newDate.getFullYear()}`;
  return parsedDate;
}

export function formatTime(number) {
  const secNum = parseInt(number, 10);
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor((secNum - hours * 3600) / 60);
  const seconds = secNum - hours * 3600 - minutes * 60;

  const hoursString = hours === 1 ? `${hours} hour` : `${hours} hours`;
  const minutesString =
    minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;

  if (hours === 0 && minutes === 0 && seconds > 0) {
    return `${seconds} seconds`;
  } else if (hours === 0 && minutes > 0) {
    return `${minutesString}`;
  } else if (hours > 0 && minutes === 0) {
    return `${hoursString}`;
  } else if (hours > 0 && minutes > 0) {
    return `${hoursString} ${minutesString}`;
  }

  return 0;
}

export function formatForTimer(number) {
  const secNum = parseInt(number, 10);
  let hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - hours * 3600) / 60);
  let seconds = secNum - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  const time = `${hours}:${minutes}:${seconds}`;
  return time;
}

export function findParents(arr, id) {
  const parents = [];
  function recursive(myId) {
    arr.forEach(item => {
      if (item._id === myId) {
        parents.push(myId);
        if (item.parent_id !== '') {
          recursive(item.parent_id);
        }
      }
    });
  }
  recursive(id);
  return parents;
}
