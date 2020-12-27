const formatDate = (date: Date) => {
  // Saturday, September 17, 2016
  const options: Record<string, string> = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // return date.toLocaleDateString("en-US", options);
  return date.toLocaleString("en-US", options);
};

export default formatDate;
