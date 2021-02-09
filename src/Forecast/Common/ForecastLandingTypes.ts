import { IAllWorkflowProcesses } from "../../Application/Components/Workflows/WorkflowTypes";
import { IExistingDataProps } from "../../Application/Types/ApplicationTypes";

export interface IForecastLanding {
  forecastvisualytics: JSX.Element;
  approvedforecastresults: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IForecastLanding;
};

export interface IForecastLandingData {
  name: string;
  description: string;
  icon: JSX.Element;
  route: string;
  workflowProcess:
    | IAllWorkflowProcesses["wrkflwPrcss"]
    | IExistingDataProps["wkPs"];
  workflowCategory:
    | IAllWorkflowProcesses["wrkflwCtgry"]
    | IExistingDataProps["wkCy"];
}
