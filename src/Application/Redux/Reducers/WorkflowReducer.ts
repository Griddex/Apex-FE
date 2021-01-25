import {
  SET_WORKFLOWPROCESS,
  INITIALIZE_WORKFLOW,
  RESET_WORKFLOW,
  NEXT_WORKFLOW,
  BACK_WORKFLOW,
  SKIP_WORKFLOW,
  SAVE_WORKFLOW,
} from "../Actions/WorkflowActions";
import workflowState from "../State/WorkflowState";
import { IAction } from "./../Actions/ActionTypes";

const workflowReducer = (state = workflowState, action: IAction) => {
  switch (action.type) {
    case SET_WORKFLOWPROCESS:
      return {
        ...state,
        currentWorkflowProcess: action.payload.workflowProcess,
      };

    case INITIALIZE_WORKFLOW: {
      const { workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as string;
      return {
        ...state,
        importDataWorkflows: {
          ...state.importDataWorkflows,
          [workflowProcessDefined]: {
            activeStep: 0,
            steps: action.payload.steps,
            isStepSkipped: action.payload.isStepSkipped,
            isStepOptional: action.payload.isStepOptional,
          },
        },
      };
    }

    case RESET_WORKFLOW: {
      const { workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as string;

      return {
        ...state,
        importDataWorkflows: {
          ...state.importDataWorkflows,
          [workflowProcessDefined]: { activeStep: action.payload.activeStep },
        },
      };
    }

    case NEXT_WORKFLOW: {
      const { workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as string;
      const { activeStep, steps } = action.payload;

      // let newSkipped = new Set<number>();
      // try {
      //   newSkipped = state["importDataWorkflows"][workflowProcessDefined]["skipped"] as Set<number>;
      // } catch (error) {
      //   state["importDataWorkflows"][workflowProcessDefined]["skipped"] = new Set<number>();
      // }

      // if (isStepSkipped && isStepSkipped(activeStep)) {
      //   newSkipped = new Set(skipped.values());
      //   newSkipped.delete(activeStep);
      // }

      // if (activeStep === steps.length - 1) {
      //   return { ...state["importDataWorkflows"][workflowProcessDefined] };
      // }
      console.log(
        "Logged output --> ~ file: WorkflowReducer.ts ~ line 62 ~ workflowReducer ~ state",
        state
      );

      return {
        ...state,
        importDataWorkflows: {
          ...state.importDataWorkflows,
          [workflowProcessDefined]: {
            activeStep: action.payload.activeStep + 1,
            // skipped: newSkipped,
          },
        },
      };
    }

    case BACK_WORKFLOW: {
      const { workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as string;
      return {
        ...state,
        importDataWorkflows: {
          ...state.importDataWorkflows,
          [workflowProcessDefined]: {
            activeStep: action.payload.activeStep - 1,
          },
        },
      };
    }

    case SKIP_WORKFLOW: {
      const { workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as string;
      const { isStepOptional, activeStep } = action.payload;

      if (!isStepOptional()) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
      const workflowState =
        state["importDataWorkflows"][workflowProcessDefined];
      const newSkippedSet = new Set(
        workflowState.skipped && workflowState.skipped.values()
      );
      newSkippedSet.add(activeStep);

      return {
        ...state,
        importDataWorkflows: {
          ...state.importDataWorkflows,
          [workflowProcessDefined]: {
            activeStep: action.payload.activeStep + 1,
            skipped: newSkippedSet,
          },
        },
      };
    }

    //TODO - different scenarios for different workflows
    //Should it be handled here or in other actions?
    case SAVE_WORKFLOW:
      return state;

    default:
      return state;
  }
};

export default workflowReducer;
