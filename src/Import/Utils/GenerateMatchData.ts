const generateMatchData = (fileHeaderMatches: Record<string, number>[]) => {
  const fullMatch = fileHeaderMatches.reduce((acc: number, match) => {
    const bestMatch = 1 - Object.values(match)[0] * 1.0;

    if (bestMatch === 0.0) {
      return acc + 1;
    } else return acc;
  }, 0);
  const partialMatch = fileHeaderMatches.reduce((acc, match) => {
    const bestMatch = 1 - Object.values(match)[0] * 1.0;

    if (bestMatch > 0.0 && bestMatch < 1.0) {
      return acc + 1;
    } else return acc;
  }, 0);
  const NoMatch = fileHeaderMatches.reduce((acc, match) => {
    const bestMatch = 1 - Object.values(match)[0] * 1.0;

    if (bestMatch === 1.0) {
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
