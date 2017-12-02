export function formatTime(seconds) {
  // https://stackoverflow.com/a/25279340/4208724
  const date = new Date(null);
  date.setSeconds(seconds);
  const result = date.toISOString().substr(11, 8);
  return result;
}

export function formatDate(date) {
  const newDate = new Date(date);
  const parsedDate = `${newDate.getDate()}/${newDate.getMonth() +
    1}/${newDate.getFullYear()}`;
  return parsedDate;
}
