const convertSecondsToHHMMSS = (durationInSecs: number) => {
  const hours = Math.floor(durationInSecs / 3600);
  const minutes = Math.floor((durationInSecs - hours * 3600) / 60);
  const seconds = durationInSecs - hours * 3600 - minutes * 60;

  let hoursStr = "";
  let minutesStr = "";
  let secondsStr = "";
  if (hours < 10) {
    hoursStr = "0" + hours;
  }
  if (minutes < 10) {
    minutesStr = "0" + minutes;
  }
  if (seconds < 10) {
    secondsStr = "0" + seconds;
  }

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
};

export default convertSecondsToHHMMSS;
