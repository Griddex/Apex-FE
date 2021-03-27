import { IWorkflowProcessState } from "../../Redux/State/WorkflowStateTypes";
import { IAllWorkflowProcesses } from "./../Workflows/WorkflowTypes";

export interface INavigationButtonsProp {
  mainNav?: boolean;
  showReset?: boolean;
  showBack?: boolean;
  showSkip?: boolean;
  showNext?: boolean;
  nextDisabled?: boolean;
  finalAction?: () => void;
  finalNavIcon?: () => JSX.Element;
  workflowProps?: IWorkflowProcessState;
  workflowProcess?: IAllWorkflowProcesses["wrkflwPrcss"];
  workflowCategory?: IAllWorkflowProcesses["wrkflwCtgry"];
}
