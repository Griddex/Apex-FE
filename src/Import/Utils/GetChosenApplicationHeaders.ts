const getChosenApplicationHeaders = (
  fileHeaderMatches: Record<string, number>[],
  chosenApplicationHeadersIndices: Record<string, number>
) => {
  const applicationHeadersIndices = Object.values(
    chosenApplicationHeadersIndices
  );

  const applicationHeaders = fileHeaderMatches.map((match, rowSN: number) => {
    const headers = Object.keys(match);
    const headerIndex = applicationHeadersIndices[rowSN];

    return headers[headerIndex];
  });

  return applicationHeaders;
};

export default getChosenApplicationHeaders;
