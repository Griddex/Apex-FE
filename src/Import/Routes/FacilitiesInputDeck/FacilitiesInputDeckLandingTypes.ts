import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IExistingDataProps } from "../../../Application/Types/ApplicationTypes";

export interface IFacilitiesInputDeckLanding {
  excel: JSX.Element;
  database: JSX.Element;
  approveddeck: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IFacilitiesInputDeckLanding;
};

export interface IFacilitiesLandingData {
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
