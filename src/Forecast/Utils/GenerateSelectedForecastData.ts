import { get, groupBy, omit } from "lodash";
import { RenderTree } from "../Components/ForecastTreeViewTypes";

const generateSelectedForecastData = (
  forecastTreeData: RenderTree,
  variables: string[],
  paths: string[],
  modules: string[],
  selectedVariable: string
) => {
  const allData = [];

  let i = 0;
  for (const path of paths) {
    const moduleObj: Record<string, string | Record<string, string>> = {};
    const moduleData: Record<string, string> = {};

    let day;
    let month;
    let year;

    const lastIndex = path.lastIndexOf(".");
    for (const v of variables) {
      const vr = path.substring(0, lastIndex + 1);
      const newvr = `${vr}${v}`;
      if (newvr.endsWith("day")) {
        day = get(forecastTreeData, newvr);
      } else if (newvr.endsWith("month")) {
        month = get(forecastTreeData, newvr);
      } else if (newvr.endsWith("year")) {
        year = get(forecastTreeData, newvr);
      } else {
        moduleData[v] = get(forecastTreeData, newvr);
      }
    }

    const moduleName = modules[i];
    moduleObj[moduleName] = moduleData;

    const date = new Date(year, month, day).toLocaleDateString();
    moduleObj["date"] = date;

    allData.push(moduleObj);
    i = i + 1;
  }

  const grpAllData = groupBy(allData, (o) => o.date);
  // console.log(allData)
  // console.log(grpAllData);

  const sModules = Object.keys(grpAllData).map((k) => {
    const d = {} as Record<string, string>;
    d["date"] = k;

    const mdata = grpAllData[k].map((v) => {
      const moduleObj: Record<string, string | Record<string, string>> = omit(
        v,
        "date"
      );
      const moduleName = Object.keys(moduleObj)[0];
      const moduleData = Object.values(moduleObj)[0] as Record<string, string>;
      // console.log(moduleData)

      const vl: React.Key = moduleData[selectedVariable];
      return { [moduleName]: vl };
    });

    const mdataRed = mdata.reduce((acc, v) => {
      return { ...acc, ...v };
    }, {});

    // console.log("mdataRed,", mdataRed);

    const finalD = { ...d, ...mdataRed };

    return finalD;
  });

  return sModules;
};

export default generateSelectedForecastData;
