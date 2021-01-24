import { IWorkflowProcessState } from "../../Redux/State/WorkflowStateTypes";

export interface INavigationButtonsProp {
  mainNav: boolean;
  showReset?: boolean;
  showBack?: boolean;
  showSkip?: boolean;
  showNext?: boolean;
  finalAction?: () => void;
  workflowProps?: IWorkflowProcessState;
  workflowProcess?: string;
}
