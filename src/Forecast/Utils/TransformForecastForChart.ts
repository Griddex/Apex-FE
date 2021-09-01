import zipObject from "lodash.zipobject";

export const transformModulePaths = (paths: string[]) => {
  const newPaths = paths.map((k) => {
    const parts = k.split("@#$%");
    const scenario = parts[0];
    const moduleName = parts[2];

    if (scenario.toLowerCase() === "1p_1c") return `${moduleName}_LOW`;
    else if (scenario.toLowerCase() === "2p_2c") return `${moduleName}_BASE`;
    else return `${moduleName}_HIGH`;
  });

  return newPaths;
};

const transformForecastForChart = (data: any[]) => {
  const forecastResults = data.map((row: any) => {
    const keys = Object.keys(row);
    const values = Object.values(row);
    const newKeys = transformModulePaths(keys);

    return zipObject(newKeys, values);
  });

  return forecastResults;
};

export default transformForecastForChart;
