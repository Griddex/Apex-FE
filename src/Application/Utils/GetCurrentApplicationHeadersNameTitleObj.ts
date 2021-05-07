import React from "react";
import { IApplicationHeaders } from "../../Import/Routes/Common/Workflows/MatchHeadersTypes";
import { IAllWorkflowProcesses } from "../Components/Workflows/WorkflowTypes";

const getCurrentApplicationHeadersNameTitleObj = (
  wp: IAllWorkflowProcesses["wrkflwPrcss"],
  allAppHeadersArr: IApplicationHeaders[][]
) => {
  let appHeaders: IApplicationHeaders[] = [];
  const [
    facilitiesAppHeaders,
    forecastAppHeaders,
    costsRevenuesAppHeaders,
    economicsParametersAppHeaders,
  ] = allAppHeadersArr;

  if (wp.includes("facilities")) appHeaders = facilitiesAppHeaders;
  else if (wp.includes("forecast")) appHeaders = forecastAppHeaders;
  else if (wp.includes("economicsCostsRevenues"))
    appHeaders = costsRevenuesAppHeaders;
  else if (wp.includes("economicsParameters"))
    appHeaders = economicsParametersAppHeaders;

  return appHeaders
};

export default getCurrentApplicationHeadersNameTitleObj;