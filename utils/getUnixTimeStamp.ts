const getUnixTimeStamp = (timestamp: string | number) => {
  const time = Number(timestamp);
  let date: any;

  isNaN(time)
    ? (date = new Date(`${(timestamp as string).replace(/ /g, "T")}Z`))
    : (date = new Date(time * 1000));

  return date.toLocaleString();
};

export default getUnixTimeStamp;
