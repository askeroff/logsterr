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
