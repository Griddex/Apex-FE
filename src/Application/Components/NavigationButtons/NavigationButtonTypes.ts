import { IWorkflowProcessState } from "../../Redux/State/WorkflowStateTypes";
import { IAllWorkflowProcesses } from "./../Workflows/WorkflowTypes";

export interface INavigationButtonsProp {
  mainNav: boolean;
  showReset?: boolean;
  showBack?: boolean;
  showSkip?: boolean;
  showNext?: boolean;
  finalAction?: () => void;
  workflowProps?: IWorkflowProcessState;
  workflowProcess?: IAllWorkflowProcesses["workflowProcess"];
  workflowCategory: IAllWorkflowProcesses["workflowCategory"];
}
