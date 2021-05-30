import { IApplicationHeaders } from "../../Import/Routes/Common/Workflows/MatchHeadersTypes";
import { IAllWorkflows } from "../Components/Workflows/WorkflowTypes";

const getCurrentAppHeaderTitleNameMap = (
  wp: IAllWorkflows["wrkflwPrcss"],
  allAppHeadersMap: Record<string, Record<string, React.Key>>
) => {
  let appHeadersMap: Record<string, React.Key> = {};
  const {
    facilitiesAppHeadersNameTitleMap,
    forecastAppHeadersNameTitleMap,
    cstRevAppHeadersNameTitleMap,
    ecoParAppHeadersNameTitleMap,
  } = allAppHeadersMap;

  if (wp.includes("facilities"))
    appHeadersMap = facilitiesAppHeadersNameTitleMap;
  else if (wp.includes("forecast"))
    appHeadersMap = forecastAppHeadersNameTitleMap;
  else if (wp.includes("economicsCostsRevenues"))
    appHeadersMap = cstRevAppHeadersNameTitleMap;
  else if (wp.includes("economicsParameters"))
    appHeadersMap = ecoParAppHeadersNameTitleMap;

  return appHeadersMap;
};
export default getCurrentAppHeaderTitleNameMap;
