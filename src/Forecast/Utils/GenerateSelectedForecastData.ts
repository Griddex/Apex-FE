import get from "lodash.get";
import { forecastVariablesMap } from "./ForecastVariables";

const generateSelectedForecastData = (
  forecastData: any,
  paths: string[],
  modules: string[],
  selectedVariable: string
) => {
  const variables = Object.values(forecastVariablesMap);
  const selectedVariableValue = forecastVariablesMap[selectedVariable];

  const allData: Record<string, Record<string, React.Key>>[] = [];

  let i = 0;
  for (const path of paths) {
    const moduleObj: Record<string, Record<string, React.Key>> = {};
    const moduleData: Record<string, string> = {};

    let day;
    let month;
    let year;

    const lastIndex = path.lastIndexOf(".");
    for (const v of variables) {
      const vr = path.substring(0, lastIndex + 1);
      const newvr = `${vr}${v}`;

      if (newvr.endsWith("day")) {
        day = get(forecastData, newvr);
      } else if (newvr.endsWith("month")) {
        month = get(forecastData, newvr);
      } else if (newvr.endsWith("year")) {
        year = get(forecastData, newvr);
      } else {
        moduleData[v] = get(forecastData, newvr);
      }
    }

    const moduleName = modules[i];
    moduleObj[moduleName] = moduleData;

    allData.push(moduleObj);
    i = i + 1;
  }

  const filteredData = allData.map((module) => {
    const mNames = Object.keys(module);

    const data = mNames.map((m) => {
      return {
        [m]: module[m][selectedVariableValue],
      };
    });

    return data;
  });

  return filteredData;
};

export default generateSelectedForecastData;
