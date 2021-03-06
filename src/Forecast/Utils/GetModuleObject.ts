import get from "lodash.get";
import { forecastVariablesMap } from "./ForecastVariables";

const getModuleObject = (scenarioData: any, modulePath: string) => {
  const variables = Object.values(forecastVariablesMap);
  const moduleData: Record<string, string> = {};

  const lastIndex = modulePath.lastIndexOf(".");

  for (const v of variables) {
    const vr = modulePath.substring(0, lastIndex + 1);

    const newvr = `${vr}${v}`;
    moduleData[v] = get(scenarioData, newvr);
  }

  return moduleData;
};

export default getModuleObject;
