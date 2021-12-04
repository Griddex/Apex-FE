import zipObject from "lodash.zipobject";
import { IRawRow } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { TBackendDevScenarioTitles } from "../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";

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

  const isForecastEconomicsAggFilled = (devName: TBackendDevScenarioTitles) => {
    if (forecastEconomicsAggregated === undefined || null) return false;
    if (Object.entries(forecastEconomicsAggregated).length <= 0) return false;
    if (forecastEconomicsAggregated[devName].length <= 0) return false;

    return true;
  };

  if (isForecastEconomicsAggFilled("OIL/AG")) {
    initialOilDevelopmentRows = forecastEconomicsAggregated["OIL/AG"].map(
      (row: any, i: number) => ({ sn: i + 1, ...row })
    );
  } else {
    initialOilDevelopmentRows = generateInitialRows(
      initialRowsLength,
      oilDevelopmentNames
    ) as IRawRow[];
  }

  if (isForecastEconomicsAggFilled("NAG")) {
    initialNAGDevelopmentRows = forecastEconomicsAggregated["NAG"].map(
      (row: any, i: number) => ({ sn: i + 1, ...row })
    );
  } else {
    initialNAGDevelopmentRows = generateInitialRows(
      initialRowsLength,
      nagDevelopmentNames
    ) as IRawRow[];
  }

  if (isForecastEconomicsAggFilled("OIL + NAG")) {
    initialOilNAGDevelopmentRows = forecastEconomicsAggregated["OIL + NAG"].map(
      (row: any, i: number) => ({ sn: i + 1, ...row })
    );
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
