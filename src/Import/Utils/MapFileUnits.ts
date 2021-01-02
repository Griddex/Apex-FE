const mapFileUnits = (fileUnits: string[], fileUniqueUnits: string[]) => {
  const uniqueUnitsMapping: Record<string, number[]> = {};
  let i = 0;

  for (const uniqueUnit of fileUniqueUnits) {
    const columns: number[] = [];

    for (const unit of fileUnits) {
      if (uniqueUnit.toLowerCase() === unit.toLowerCase()) {
        columns.push(i);
      }
    }

    uniqueUnitsMapping[uniqueUnit] = columns;
  }

  i = i + 1;
  return uniqueUnitsMapping;
};

export default mapFileUnits;
