import { get } from "lodash";
import objectScan from "object-scan";
import getLastTwoDotPositions from "./GetLastTwoDotPositions";

const generatePathsAndModules = (forecastData: any[], ids: string[]) => {
  const pathArray = objectScan([`*[*].*[*].*._id`], {
    joined: true,
  })(forecastData);

  const paths = [];
  const modules = [];
  const scaneedIds = [];

  for (const id of ids) {
    for (const path of pathArray) {
      const scannedId = get(forecastData, path);
      scaneedIds.push(scannedId);
      if (id === scannedId) {
        paths.push(path);

        const dots = getLastTwoDotPositions(path);
        const module = path.substring(dots[0] + 1, dots[1]);
        modules.push(module);

        break;
      }
    }
  }
  console.log(
    "Logged output --> ~ file: GeneratePathsAndModules.ts ~ line 15 ~ generatePathsAndModules ~ ids",
    ids
  );

  // const strIds = scaneedIds.join();
  // console.log(
  //   "Logged output --> ~ file: GeneratePathsAndModules.ts ~ line 31 ~ generatePathsAndModules ~ strIds",
  //   strIds
  // );

  return { paths, modules };
};

export default generatePathsAndModules;
