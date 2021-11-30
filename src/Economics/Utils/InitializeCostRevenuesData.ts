import zipObject from "lodash.zipobject";
import { IRawRow } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";

const generateInitialRows = (noOfRows: number, headerNames: string[]) => {
  const iniRows = [];
  const row = zipObject(headerNames, Array(headerNames.length).fill(""));

  for (let i = 0; i < noOfRows; i++) {
    iniRows.push({ sn: i, ...row });
  }

  return iniRows;
};

const initializeCostRevenuesData = (
  forecastEconomicsAggregated: Record<string, any[]>,
  initialRowsLength: number,
  oilDevelopmentNames: string[],
  nagDevelopmentNames: string[],
  oilNAGDevelopmentNames: string[]
) => {
  let initialOilDevelopmentRows = [] as IRawRow[];
  let initialNAGDevelopmentRows = [] as IRawRow[];
  let initialOilNAGDevelopmentRows = [] as IRawRow[];
  if (
    forecastEconomicsAggregated &&
    Object.entries(forecastEconomicsAggregated["costRevenuesOil"]).length > 0
  ) {
    initialOilDevelopmentRows = forecastEconomicsAggregated[
      "costRevenuesOil"
    ].map((row: any, i: number) => ({ sn: i + 1, ...row }));
  } else {
    initialOilDevelopmentRows = generateInitialRows(
      initialRowsLength,
      oilDevelopmentNames
    ) as IRawRow[];
  }

  if (
    forecastEconomicsAggregated &&
    Object.entries(forecastEconomicsAggregated["costRevenuesNAG"]).length > 0
  ) {
    initialNAGDevelopmentRows = forecastEconomicsAggregated[
      "costRevenuesNAG"
    ].map((row: any, i: number) => ({ sn: i + 1, ...row }));
  } else {
    initialNAGDevelopmentRows = generateInitialRows(
      initialRowsLength,
      nagDevelopmentNames
    ) as IRawRow[];
  }

  if (
    forecastEconomicsAggregated &&
    Object.entries(forecastEconomicsAggregated["costRevenuesOil_NAG"]).length >
      0
  ) {
    initialOilNAGDevelopmentRows = forecastEconomicsAggregated[
      "costRevenuesOil_NAG"
    ].map((row: any, i: number) => ({ sn: i + 1, ...row }));
  } else {
    initialOilNAGDevelopmentRows = generateInitialRows(
      initialRowsLength,
      oilNAGDevelopmentNames
    ) as IRawRow[];
  }

  return {
    initialOilDevelopmentRows,
    initialNAGDevelopmentRows,
    initialOilNAGDevelopmentRows,
  };
};

export default initializeCostRevenuesData;
