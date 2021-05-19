import { IApplicationHeaders } from "../../Import/Routes/Common/Workflows/MatchHeadersTypes";
import { IAllWorkflowProcesses } from "../Components/Workflows/WorkflowTypes";

const getCurrentApplicationHeaders = (
  wp: IAllWorkflowProcesses["wrkflwPrcss"],
  allAppHeadersObj: Record<string, IApplicationHeaders[]>,
  returnIsStringArray: boolean
) => {
  let appHeaders: IApplicationHeaders[] = [];
  const {
    facilitiesAppHeaders,
    forecastAppHeaders,
    costsRevenuesAppHeaders,
    economicsParametersAppHeaders,
  } = allAppHeadersObj;

  console.log(
    "Logged output --> ~ file: GetCurrentApplicationHeaders.ts ~ line 31 ~ costsRevenuesAppHeaders",
    costsRevenuesAppHeaders
  );
  if (wp.includes("facilities")) appHeaders = facilitiesAppHeaders;
  else if (wp.includes("forecast")) appHeaders = forecastAppHeaders;
  else if (wp.includes("economicsCostsRevenues"))
    appHeaders = costsRevenuesAppHeaders;
  else if (wp.includes("economicsParameters"))
    appHeaders = economicsParametersAppHeaders;

  return appHeaders.map((header: IApplicationHeaders) =>
    returnIsStringArray ? header.variableTitle : header
  );
};
export default getCurrentApplicationHeaders;
