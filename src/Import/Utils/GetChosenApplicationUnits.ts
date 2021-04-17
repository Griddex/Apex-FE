const getChosenApplicationUnits = (
  fileUnits: string[],
  keyedFileUnitMatches: { [index: string]: Record<string, React.Key> },
  chosenApplicationUniqueUnitIndices: Record<string, number | number[]>
) => {
  const chosenApplicationUnits = fileUnits.map((unit) => {
    if (unit === "") return "unitless";
    else {
      const optionIndex = chosenApplicationUniqueUnitIndices[unit];
      const unitMatches = keyedFileUnitMatches[unit];

      const unitTitles = Object.keys(unitMatches);
      if (typeof optionIndex === "number") {
        return unitTitles[optionIndex];
      } else {
        const multipleUnitTitles: string[] = optionIndex.map(
          (_: number, i) => unitTitles[i]
        );
        return multipleUnitTitles.join("&|&");
      }
    }
  });

  return chosenApplicationUnits;
};
export default getChosenApplicationUnits;
