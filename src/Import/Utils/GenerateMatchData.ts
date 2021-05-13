import { Theme } from "@material-ui/core/styles";

const generateMatchData = (
  fileHeaderMatches: Record<string, number>[],
  theme: Theme
) => {
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
    {
      id: "Full Match",
      label: "Full Match",
      value: fullMatch,
      color: theme.palette.success.main,
    },
    {
      id: "Partial Match",
      label: "Partial Match",
      value: partialMatch,
      color: theme.palette.primary.main,
    },
    {
      id: "No Match",
      label: "No Match",
      value: NoMatch,
      color: theme.palette.secondary.main,
    },
  ];

  return headerMatchChartData;
};

export default generateMatchData;
