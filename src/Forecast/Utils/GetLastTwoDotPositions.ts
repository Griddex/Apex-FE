const getLastTwoDotPositions = (path: string) => {
  const regex = /\./g;
  let current: RegExpExecArray | null = null;
  const matchIndexes = [];

  while ((current = regex.exec(path)) != null) {
    matchIndexes.push(current.index);
  }

  return matchIndexes.slice(-2);
};

export default getLastTwoDotPositions;
