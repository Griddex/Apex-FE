import { IWorkflowProcessState } from "../../Redux/State/WorkflowStateTypes";
import { IAllWorkflowProcesses } from "./../Workflows/WorkflowTypes";

export interface INavigationButtonsProp {
  isMainNav?: boolean;
  showReset?: boolean;
  showBack?: boolean;
  showSkip?: boolean;
  showNext?: boolean;
  nextDisabled?: boolean;
  isNavButtonDisabled?: {
    reset: boolean;
    skip: boolean;
    back: boolean;
    next: boolean;
  };
  finalAction?: () => void;
  finalNavIcon?: () => JSX.Element;
  workflowProps?: IWorkflowProcessState;
  workflowProcess?: IAllWorkflowProcesses["wrkflwPrcss"];
  workflowCategory?: IAllWorkflowProcesses["wrkflwCtgry"];
}
