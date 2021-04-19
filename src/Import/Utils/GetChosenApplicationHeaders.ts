const getChosenApplicationHeaders = (
  fileHeaderMatches: Record<string, number>[],
  chosenApplicationHeadersIndices: Record<string, number>
) => {
  const applicationHeadersIndices = Object.values(
    chosenApplicationHeadersIndices
  );

  const applicationHeaders = fileHeaderMatches.map((match, i: number) => {
    const headerIndex = applicationHeadersIndices[i];
    const headers = Object.keys(match);

    return headers[headerIndex];
  });

  return applicationHeaders;
};

export default getChosenApplicationHeaders;
