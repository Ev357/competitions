export const useTimeFormat = (ms: number) => {
  const time = new Date(ms);
  const hours = time.getUTCHours();
  const minutes = time.getUTCMinutes();
  const seconds = time.getUTCSeconds();
  const milliseconds = time.getUTCMilliseconds();
  return hours + ":" + minutes + ":" + seconds;
};
