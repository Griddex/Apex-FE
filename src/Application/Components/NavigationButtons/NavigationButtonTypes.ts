import { IWorkflowProcessState } from "../../Redux/State/WorkflowStateTypes";
import {
  TReducer,
  TAllWorkflowCategories,
  TAllWorkflowProcesses,
} from "./../Workflows/WorkflowTypes";

export interface INavigationButtonsProp {
  isMainNav?: boolean;
  showReset?: boolean;
  showBack?: boolean;
  showSkip?: boolean;
  showNext?: boolean;
  nextOrFinalDisabled?: boolean;
  isNavButtonDisabled?: {
    reset: boolean;
    skip: boolean;
    back: boolean;
    next: boolean;
  };
  finalAction?: () => void;
  finalNavIcon?: () => JSX.Element;
  workflowProps?: IWorkflowProcessState;
  workflowProcess?: TAllWorkflowProcesses;
  workflowCategory?: TAllWorkflowCategories;
  reducer?: TReducer;
}
