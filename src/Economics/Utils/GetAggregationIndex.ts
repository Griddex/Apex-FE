export const getAggregationLevelIndex = (path: string) => {
  const reg = /(@#\$%)(\d+)(@#\$%)/g;
  const match = reg.exec(path) as RegExpExecArray;

  const indexStr = match[2];
  const index = +indexStr ? +indexStr : parseInt(indexStr, 10);

  return index;
};
