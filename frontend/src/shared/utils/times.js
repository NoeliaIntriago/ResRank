import moment from "moment";

export const secondsToTimeFormat = (seconds) => {
  return moment.utc(seconds * 1000).format("HH:mm:ss");
};

export const timeFormatToSeconds = (timeString) => {
  const duration = moment.duration(timeString);
  return duration.asSeconds();
};
