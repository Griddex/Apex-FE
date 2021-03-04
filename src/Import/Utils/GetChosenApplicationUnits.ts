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

  console.log(
    "Logged output --> ~ file: GetChosenApplicationUnits.ts ~ line 19 ~ chosenApplicationUnits",
    chosenApplicationUnits
  );
  return chosenApplicationUnits;
};
export default getChosenApplicationUnits;
