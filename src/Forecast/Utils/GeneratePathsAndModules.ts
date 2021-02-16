import { get } from "lodash";
import objectScan from "object-scan";

const makeModulePath = (path: string) => {
  const l = path.length;
  const lastIndex = path.lastIndexOf(".");

  return path.substring(0, lastIndex + 1) + "module";
};

const getUpperPath = (path: string) => {
  const l = path.length;
  const lastIndex = path.lastIndexOf(".");
  return path.substring(0, lastIndex);
};

const generatePathsAndModules = (forecastData: any[], ids: string[]) => {
  const idPaths = objectScan([`*[*]*.*[*]._id`], {
    joined: true,
  })(forecastData);

  const paths = [];
  const modules = [];
  const dates = [];
  for (const id of ids) {
    for (const idPath of idPaths) {
      const scannedId = get(forecastData, idPath);

      if (id === scannedId) {
        paths.push(idPath);

        const datePath = getUpperPath(getUpperPath(idPath));
        const dateObjs = get(forecastData, datePath);
        const dateKeys = Object.keys(dateObjs);

        dates.push(...dateKeys);

        const modulePath = makeModulePath(idPath);
        const module = get(forecastData, modulePath);

        modules.push(module);
        break;
      }
    }
  }

  return { paths, modules };
};

export default generatePathsAndModules;
