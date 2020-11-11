import uniq from "lodash/uniq";
import has from "lodash/has";

const GenerateUniqueElements = (tableData) => {
  const drainagePoints = tableData.map((row) => {
    if (has(row, "Drainage Point")) return row["Drainage Point"];
  });
  const flowStations = tableData.map((row) => {
    if (has(row, "Flow station") && row["Hydrocarbon Stream"] === "OIL")
      return row["Flow station"];
  });
  const gasFacilities = tableData.map((row) => {
    if (has(row, "Flow station") && row["Hydrocarbon Stream"] === "GAS")
      return row["Flow station"];
  });

  const drainagePointsUnique = uniq(drainagePoints);
  const flowStationsUnique = uniq(flowStations);
  const gasFacilitiesUnique = uniq(gasFacilities);
  const manifoldsUnique = [...flowStationsUnique, ...gasFacilitiesUnique];

  return {
    drainagePointsUnique,
    flowStationsUnique,
    gasFacilitiesUnique,
    manifoldsUnique,
  };
};

export default GenerateUniqueElements;
