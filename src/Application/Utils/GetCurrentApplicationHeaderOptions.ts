import { TAllWorkflowProcesses } from "../Components/Workflows/WorkflowTypes";
import { ISelectOption } from "./../Components/Selects/SelectItemsType";

const getCurrentApplicationHeaderOptions = (
  wp: TAllWorkflowProcesses,
  allAppHeadersObjOptions: Record<string, ISelectOption[]>,
  returnIsStringArray: boolean
) => {
  let appHeaders: ISelectOption[] = [];
  const {
    facilitiesHeadersSelectOptions,
    forecastHeadersSelectOptions,
    cstRevAppHeadersSelectOptions,
    ecoParAppHeadersSelectOptions,
  } = allAppHeadersObjOptions;

  if (wp.includes("facilities")) appHeaders = facilitiesHeadersSelectOptions;
  else if (wp.includes("forecast")) appHeaders = forecastHeadersSelectOptions;
  else if (wp.includes("economicsCostsRevenues"))
    appHeaders = cstRevAppHeadersSelectOptions;
  else if (wp.includes("economicsParameters"))
    appHeaders = ecoParAppHeadersSelectOptions;

  return appHeaders.map((header: ISelectOption) =>
    returnIsStringArray ? header.label : header
  );
};
export default getCurrentApplicationHeaderOptions;
