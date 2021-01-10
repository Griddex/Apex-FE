const getGlobalUnitGroup = (group: string[]) => {
  const isTrue = (g: string) =>
    group.every((u) => u.toLowerCase() === g.toLowerCase());

  if (isTrue("field")) return "Field";
  else if (isTrue("metric")) return "Metric";
  else return "Mixed";
};

export default getGlobalUnitGroup;
