const getChosenApplicationUnits = (
  fileUnits: string[],
  keyedFileUnitMatches: { [index: string]: Record<string, React.Key> },
  chosenApplicationUniqueUnitIndices: Record<string, number>
) => {
  const chosenApplicationUnits = fileUnits.map((unit) => {
    if (unit === "") return "";
    else {
      const unitMatches = keyedFileUnitMatches[unit];
      const optionIndex = chosenApplicationUniqueUnitIndices[unit];
      return Object.keys(unitMatches)[optionIndex];
    }
  });

  return chosenApplicationUnits;
};
export default getChosenApplicationUnits;
