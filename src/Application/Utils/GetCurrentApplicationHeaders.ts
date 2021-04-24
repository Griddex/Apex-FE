import React from "react";
import { IApplicationHeaders } from "../../Import/Routes/Common/Workflows/MatchHeadersTypes";
import { IAllWorkflowProcesses } from "../Components/Workflows/WorkflowTypes";

const getCurrentApplicationHeaders = (
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
  else if (wp.includes("costsRevenue")) appHeaders = costsRevenuesAppHeaders;
  else if (wp.includes("economicsParameters"))
    appHeaders = economicsParametersAppHeaders;

  return appHeaders.map((header: IApplicationHeaders) => header.variableTitle);
};

export default getCurrentApplicationHeaders;
