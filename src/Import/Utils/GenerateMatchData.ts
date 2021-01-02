const generateMatchData = (fileHeaderMatches: Record<string, number>[]) => {
  const fullMatch = fileHeaderMatches.reduce((acc: number, match) => {
    const bestMatch = Object.values(match)[0];

    if (bestMatch === 100) {
      return acc + 1;
    } else return acc;
  }, 0);

  const partialMatch = fileHeaderMatches.reduce((acc, match) => {
    const bestMatch = Object.values(match)[0];

    if (bestMatch > 0 && bestMatch < 100) {
      return acc + 1;
    } else return acc;
  }, 0);

  const NoMatch = fileHeaderMatches.reduce((acc, match) => {
    const bestMatch = Object.values(match)[0];

    if (bestMatch === 0) {
      return acc + 1;
    } else return acc;
  }, 0);

  const headerMatchChartData = [
    { name: "Full Match", value: fullMatch },
    { name: "Partial Match", value: partialMatch },
    { name: "No Match", value: NoMatch },
  ];

  return headerMatchChartData;
};

export default generateMatchData;
