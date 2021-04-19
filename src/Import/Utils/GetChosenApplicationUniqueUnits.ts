const getChosenApplicationUniqueUnits = (
  fileUnitMatches: Record<string, number>[],
  chosenApplicationUnitIndices: Record<string, number>
) => {
  const applicationUniqueUnitsIndices = Object.values(
    chosenApplicationUnitIndices
  );

  const applicationUniqueUnits = fileUnitMatches.map((match, i: number) => {
    const units = Object.keys(match);
    const unitIndex = applicationUniqueUnitsIndices[i];

    return units[unitIndex];
  });

  return applicationUniqueUnits;
};

export default getChosenApplicationUniqueUnits;
