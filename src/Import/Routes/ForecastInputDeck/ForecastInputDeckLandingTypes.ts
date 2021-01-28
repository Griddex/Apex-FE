import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  IExistingDataProps,
  IExistingDataRow,
} from "../../../Application/Types/ApplicationTypes";

export interface IForecastDeckRow extends IExistingDataRow {}

export interface IForecastInputDeckLanding {
  excel: JSX.Element;
  database: JSX.Element;
  approveddeck: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IForecastInputDeckLanding;
};

export interface IForecastLandingData {
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
