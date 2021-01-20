import { IWorkflowProcessState } from "../../Redux/State/WorkflowStateTypes";

export interface IWorkflowBannerProps {
  activeStep: number;
  steps: string[];
  moduleName: string;
  subModuleName: string;
  workflowName: string;
}

export interface IWorkflowDataProps extends IWorkflowProcessState {
  moduleName: string;
  subModuleName: string;
  workflowName: string;
  workflowData?: any;
}

export interface IWorkflowProcess {
  workflowProcess:
    | "facilitiesInputDeckExcel"
    | "facilitiesInputDeckDatabase"
    | "facilitiesInputDeckApproveddeck"
    | "forecastInputDeckExcel"
    | "forecastInputDeckDatabase"
    | "forecastInputDeckApproveddeck"
    | "productionDataExcel"
    | "productionDataDatabase"
    | "productionDataApproved"
    | "economicsDataExcel"
    | "economicsDataDatabase"
    | "economicsDataManual"
    | "economicsDataApproved";
}
