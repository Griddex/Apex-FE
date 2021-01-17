import { runForecastRequestAction } from "../../../Network/Redux/Actions/ForecastingActions";
import { createNewProjectAction } from "../../../Project/Redux/Actions/ProjectActions";
import {
  workflowResetAction,
  workflowBackAction,
  workflowSkipAction,
  workflowNextAction,
} from "../../Redux/Actions/WorkflowActions";
import { DialogStuff } from "../Dialogs/DialogTypes";

export interface INavigationButtonsProp {
  showReset?: boolean;
  showBack?: boolean;
  showSkip?: boolean;
  showNext?: boolean;
  workflowResetAction?: typeof workflowResetAction;
  workflowBackAction?: typeof workflowBackAction;
  workflowSkipAction?: typeof workflowSkipAction;
  workflowNextAction?: typeof workflowNextAction;
  finalAction?: typeof createNewProjectAction | typeof runForecastRequestAction;
  activeStep: number;
  steps: string[];
  isStepOptional: (activeStep: number) => boolean;
  skipped: Set<number>;
  isStepSkipped: (step: number) => boolean;
  dialogParameters?: DialogStuff;
  workflowProcess?: string;
}
