const getUnitIdByUnitTitle = (
  unitTitles: string | string[],
  titleUnitIdObj: Record<string, string>
) => {
  if (typeof unitTitles === "string") {
    return titleUnitIdObj[unitTitles];
  } else {
    return unitTitles.map((title) => titleUnitIdObj[title]);
  }
};

export default getUnitIdByUnitTitle;
