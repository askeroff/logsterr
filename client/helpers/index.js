/* export function formatTime(seconds) {
  // https://stackoverflow.com/a/25279340/4208724
  const date = new Date(null);
  date.setSeconds(seconds);
  const result = date.toISOString().substr(11, 8);
  return result;
} */

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
