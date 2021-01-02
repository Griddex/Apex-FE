const getChosenApplicationUniqueUnits = (
  fileUnitMatches: Record<string, number>[],
  chosenApplicationUniqueUnitIndices: Record<string, number>
) => {
  const applicationUniqueUnitsIndices = Object.values(
    chosenApplicationUniqueUnitIndices
  );

  const applicationUniqueUnits = fileUnitMatches.map((match, i: number) => {
    const units = Object.keys(match);
    const unitIndex = applicationUniqueUnitsIndices[i];

    return units[unitIndex];
  });

  return applicationUniqueUnits;
};

export default getChosenApplicationUniqueUnits;
