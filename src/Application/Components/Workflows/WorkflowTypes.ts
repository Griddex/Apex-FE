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
