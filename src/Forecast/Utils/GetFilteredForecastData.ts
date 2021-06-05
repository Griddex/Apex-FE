import get from "lodash.get";
import zipWith from "lodash.zipwith";
import objectScan from "object-scan";
import React from "react";
import getModuleObject from "./GetModuleObject";
import { forecastVariablesMap } from "./ForecastVariables";

const getFilteredForecastData = (
  scenarios: string[],
  moduleNames: string[],
  forecastData: any,
  selectedVariable: string
) => {
  const selectedVariableValue = forecastVariablesMap[selectedVariable];

  const moduleVariableArr = [];
  const moduleNameModuleObj: Record<string, Record<string, React.Key>[]> = {};

  for (const scenario of scenarios) {
    const scenarioData = forecastData[scenario];

    const modulePaths = objectScan([`*[*].*[*].module`], {
      joined: true,
    })(scenarioData);

    for (const name of moduleNames) {
      const moduleObjsArr = [];

      for (const modulePath of modulePaths) {
        const foundModuleName = get(scenarioData, modulePath);

        if (name === foundModuleName) {
          const moduleObj = getModuleObject(scenarioData, modulePath);
          moduleObjsArr.push(moduleObj);
        }
      }
    }

    for (const moduleName of Object.keys(moduleNameModuleObj)) {
      const moduleVariablesArr = moduleNameModuleObj[moduleName];

      const arr = moduleVariablesArr.map((obj) => ({
        [`${moduleName}_${scenario}`]: obj[selectedVariableValue],
      }));

      moduleVariableArr.push(arr);
    }
  }

  const finalArr = moduleVariableArr.reduce((acc, arr) => {
    const newArr = zipWith(acc, arr, (a, b) => ({ ...a, ...b }));

    return newArr;
  }, []);

  return finalArr;
};

export default getFilteredForecastData;
