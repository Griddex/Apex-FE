import { IUnit } from "../../Settings/Redux/State/UnitSettingsStateTypes";
import { IAllWorkflows } from "../Components/Workflows/WorkflowTypes";

const getCurrentApplicationHeadersMap = (
  wp: IAllWorkflows["wrkflwPrcss"],
  allAppHeadersMap: Record<string, Record<string, string>>
) => {
  let appHeadersMap: Record<string, string> = {};
  const {
    facilitiesHeadersNameMap,
    forecastHeadersNameMap,
    costsRevenuesAppHeadersMap,
    ecoParAppHeadersNameMap,
  } = allAppHeadersMap;

  if (wp.includes("facilities")) appHeadersMap = facilitiesHeadersNameMap;
  else if (wp.includes("forecast")) appHeadersMap = forecastHeadersNameMap;
  else if (wp.includes("economicsCostsRevenues"))
    appHeadersMap = costsRevenuesAppHeadersMap;
  else if (wp.includes("economicsParameters"))
    appHeadersMap = ecoParAppHeadersNameMap;

  return appHeadersMap;
};
export default getCurrentApplicationHeadersMap;
