import { get } from "lodash";
import objectScan from "object-scan";
import { RenderTree } from "../Components/ForecastTreeViewTypes";
import getLastTwoDotPositions from "./GetLastTwoDotPositions";

const generatePathsAndModules = (
  forecastTreeData: RenderTree,
  ids: string[]
) => {
  const pathArray = objectScan([`*.*[*].*[*].*._id`], {
    joined: true,
  })(forecastTreeData);

  const paths = [];
  const modules = [];
  for (const id of ids) {
    for (const path of pathArray) {
      const scannedId = get(forecastTreeData, path);

      if (id === scannedId) {
        paths.push(path);

        const dots = getLastTwoDotPositions(path);
        const module = path.substring(dots[0] + 1, dots[1]);
        modules.push(module);
        break;
      }
    }
  }

  return { paths, modules };
};

export default generatePathsAndModules;
