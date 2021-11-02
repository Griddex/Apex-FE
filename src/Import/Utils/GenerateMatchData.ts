import { Theme } from "@mui/material/styles";

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

  const noMatch = fileHeaderMatches.reduce((acc, match) => {
    const bestMatch = Object.values(match)[0];

    if (bestMatch === 0) {
      return acc + 1;
    } else return acc;
  }, 0);

  const initheaderMatchChartData = [
    {
      id: "Full_Match",
      label: "Full Match",
      value: fullMatch,
      color: theme.palette.success.main,
    },
    {
      id: "Partial_Match",
      label: "Partial Match",
      value: partialMatch,
      color: theme.palette.primary.main,
    },
    {
      id: "No_Match",
      label: "No Match",
      value: noMatch,
      color: theme.palette.secondary.main,
    },
  ];

  const headerMatchChartData = initheaderMatchChartData.filter(
    (row) => row.value > 0
  );

  return headerMatchChartData;
};

export default generateMatchData;
