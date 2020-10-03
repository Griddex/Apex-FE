const formatDate = (date) => {
  // Saturday, September 17, 2016
  const options1 = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options1);
};

export default formatDate;
