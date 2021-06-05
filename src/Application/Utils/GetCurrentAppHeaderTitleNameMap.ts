import { IAllWorkflows } from "../Components/Workflows/WorkflowTypes";

const getCurrentAppHeaderTitleNameMap = (
  wp: IAllWorkflows["wrkflwPrcss"],
  allAppHeadersMap: Record<string, Record<string, React.Key>>
) => {
  let appHeadersMap: Record<string, React.Key> = {};

  const {
    facilitiesHeadersNameMap,
    forecastHeadersNameMap,
    costsRevenuesAppHeadersMap,
    ecoParAppHeadersNameMap,
  } = allAppHeadersMap;
  console.log(
    "Logged output --> ~ file: GetCurrentAppHeaderTitleNameMap.ts ~ line 15 ~ allAppHeadersMap",
    allAppHeadersMap
  );

  if (wp.includes("facilities")) appHeadersMap = facilitiesHeadersNameMap;
  else if (wp.includes("forecast")) appHeadersMap = forecastHeadersNameMap;
  else if (wp.includes("economicsCostsRevenues"))
    appHeadersMap = costsRevenuesAppHeadersMap;
  else if (wp.includes("economicsParameters")) {
    console.log("Helloooooooooooooooooooo");
    appHeadersMap = ecoParAppHeadersNameMap;
  }

  console.log(
    "Logged output --> ~ file: GetCurrentAppHeaderTitleNameMap.ts ~ line 33 ~ appHeadersMap",
    appHeadersMap
  );
  return appHeadersMap;
};

export default getCurrentAppHeaderTitleNameMap;
