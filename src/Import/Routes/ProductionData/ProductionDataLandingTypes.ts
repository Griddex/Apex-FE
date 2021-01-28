import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IExistingDataProps } from "../../../Application/Types/ApplicationTypes";

export interface IProductionDataLandingWorkflows {
  excel: JSX.Element;
  database: JSX.Element;
  approveddata: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IProductionDataLandingWorkflows;
};

export interface IProductionLandingData {
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
