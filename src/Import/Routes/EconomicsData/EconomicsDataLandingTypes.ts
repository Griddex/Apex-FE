import { IExistingDataProps } from "../../../Application/Types/ApplicationTypes";
import { IAllWorkflowProcesses } from "./../../../Application/Components/Workflows/WorkflowTypes";
export interface IEconomicsDataLandingWorkflows {
  excel: JSX.Element;
  database: JSX.Element;
  approveddata: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IEconomicsDataLandingWorkflows;
};

export interface IEconomicsLandingData {
  name: string;
  description: string;
  icon: JSX.Element;
  route: string;
  workflowProcess:
    | IAllWorkflowProcesses["workflowProcess"]
    | IExistingDataProps["workflowProcess"];
  workflowCategory:
    | IAllWorkflowProcesses["workflowCategory"]
    | IExistingDataProps["workflowCategory"];
}
