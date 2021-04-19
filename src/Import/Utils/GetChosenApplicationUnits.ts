const getChosenApplicationUnits = (
  fileHeadersWithoutNone: string[],
  keyedFileUnitMatches: { [index: string]: Record<string, React.Key> },
  chosenApplicationUnitIndices: Record<string, number | number[]>
) => {
  const chosenApplicationUnits = fileHeadersWithoutNone.map((header) => {
    if (header === "") return "unitless";
    else {
      const optionIndex = chosenApplicationUnitIndices[header];
      const unitMatches = keyedFileUnitMatches[header];

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
