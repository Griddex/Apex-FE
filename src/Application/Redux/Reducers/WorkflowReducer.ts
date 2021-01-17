import {
  INITIALIZE_WORKFLOW,
  RESET_WORKFLOW,
  NEXT_WORKFLOW,
  BACK_WORKFLOW,
  SKIP_WORKFLOW,
  SAVE_WORKFLOW,
  FINALIZE_WORKFLOW,
} from "../Actions/WorkflowActions";
import workflowState from "../State/WorkflowState";
import { IAction } from "./../Actions/ActionTypes";

const workflowReducer = (state = workflowState, action: IAction) => {
  switch (action.type) {
    case INITIALIZE_WORKFLOW: {
      const { workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as string;
      return {
        ...state,
        [workflowProcessDefined]: {
          steps: action.payload.steps,
          isStepSkipped: action.payload.isStepSkipped,
          isStepOptional: action.payload.isStepOptional,
        },
      };
    }
    case RESET_WORKFLOW: {
      const { workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as string;

      return {
        ...state,
        [workflowProcessDefined]: { activeStep: action.payload.activeStep },
      };
    }
    case NEXT_WORKFLOW: {
      const { workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as string;
      let newSkipped = state[workflowProcessDefined].skipped;
      const {
        [workflowProcessDefined]: { skipped, isStepSkipped, activeStep, steps },
      } = action.payload;

      if (isStepSkipped && isStepSkipped(activeStep)) {
        newSkipped = new Set(skipped.values());
        newSkipped.delete(activeStep);
      }

      if (activeStep === steps.length - 1) {
        return { ...state[workflowProcessDefined] };
      }

      return {
        ...state,
        [workflowProcessDefined]: {
          activeStep: action.payload.activeStep + 1,
          skipped: newSkipped,
        },
      };
    }
    case BACK_WORKFLOW: {
      const { workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as string;
      return {
        ...state,
        [workflowProcessDefined]: { activeStep: action.payload.activeStep - 1 },
      };
    }
    case SKIP_WORKFLOW: {
      const { workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as string;
      const {
        [workflowProcessDefined]: { isStepOptional, activeStep },
      } = action.payload;

      if (!isStepOptional()) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
      const workflowState = state[workflowProcessDefined];
      const newSkippedSet = new Set(
        workflowState.skipped && workflowState.skipped.values()
      );
      newSkippedSet.add(activeStep);

      return {
        ...state,
        [workflowProcessDefined]: {
          activeStep: action.payload.activeStep + 1,
          skipped: newSkippedSet,
        },
      };
    }

    case SAVE_WORKFLOW: //Not yet complete
      return state;

    case FINALIZE_WORKFLOW: //Not yet complete
      return state;

    default:
      return state;
  }
};

export default workflowReducer;
