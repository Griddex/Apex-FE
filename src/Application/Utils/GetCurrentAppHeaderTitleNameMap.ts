import { TAllWorkflowProcesses } from "../Components/Workflows/WorkflowTypes";

const getCurrentAppHeaderTitleNameMap = (
  wp: TAllWorkflowProcesses,
  allAppHeadersMap: Record<string, Record<string, React.Key>>
) => {
  let appHeadersMap: Record<string, React.Key> = {};

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
  else if (wp.includes("economicsParameters")) {
    appHeadersMap = ecoParAppHeadersNameMap;
  }

  return appHeadersMap;
};

export default getCurrentAppHeaderTitleNameMap;
