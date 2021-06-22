import {
  IAllWorkflows,
  TOnlyWorkflowCategories,
} from "../../Components/Workflows/WorkflowTypes";
import {
  REINITIALIZE_WORKFLOW,
  SET_WORKFLOWPROCESS,
  INITIALIZE_WORKFLOW,
  RESET_WORKFLOW,
  NEXT_WORKFLOW,
  BACK_WORKFLOW,
  SKIP_WORKFLOW,
  NAVBUTTON_DISABLED,
  SAVE_WORKFLOW,
  RESET_CURRENTWORKFLOW,
} from "../Actions/WorkflowActions";
import workflowState from "../State/WorkflowState";
import {
  IWorkflowProcessState,
  IWorkflowState,
} from "../State/WorkflowStateTypes";
import { IAction } from "./../Actions/ActionTypes";
import set from "lodash.set";

const workflowReducer = (state = workflowState, action: IAction) => {
  switch (action.type) {
    case SET_WORKFLOWPROCESS:
      return {
        ...state,
        currentWorkflowProcess: action.payload.workflowProcess,
      };

    case REINITIALIZE_WORKFLOW: {
      const { path, value } = action.payload;

      const updatedState = set(state, path, value);
      return updatedState;
    }

    case INITIALIZE_WORKFLOW: {
      const { workflowCategory, workflowProcess } = action.payload;
      const wp = workflowProcess as IAllWorkflows["wrkflwPrcss"];
      const wc = workflowCategory as keyof IWorkflowState;

      return {
        ...state,
        [wc]: {
          ...(state[wc] as Record<string, IWorkflowProcessState>),
          [wp]: {
            activeStep: 0,
            steps: action.payload.steps,
            isStepSkipped: action.payload.isStepSkipped,
            isStepOptional: action.payload.isStepOptional,
          },
        },
      };
    }

    case RESET_WORKFLOW: {
      const { workflowCategory, workflowProcess } = action.payload;
      const wp = workflowProcess as IAllWorkflows["wrkflwPrcss"];
      const wc = workflowCategory as keyof IWorkflowState;

      return {
        ...state,
        [wc]: {
          ...(state[wc] as Record<string, IWorkflowProcessState>),
          [wp]: { activeStep: action.payload.activeStep },
        },
      };
    }

    case NEXT_WORKFLOW: {
      const { workflowCategory, workflowProcess } = action.payload;

      const wp = workflowProcess as IAllWorkflows["wrkflwPrcss"];
      const wc = workflowCategory as TOnlyWorkflowCategories;

      return {
        ...state,
        [wc]: {
          ...(state[wc] as Record<string, IWorkflowProcessState>),
          [wp]: {
            activeStep: action.payload.activeStep + 1,
            // skipped: newSkipped,
          },
        },
      };
    }

    case BACK_WORKFLOW: {
      const { workflowCategory, workflowProcess } = action.payload;
      const wp = workflowProcess as IAllWorkflows["wrkflwPrcss"];
      const wc = workflowCategory as keyof IWorkflowState;

      return {
        ...state,
        [wc]: {
          ...(state[wc] as Record<string, IWorkflowProcessState>),
          [wp]: {
            activeStep: action.payload.activeStep - 1,
          },
        },
      };
    }

    case SKIP_WORKFLOW: {
      const { workflowCategory, workflowProcess } = action.payload;
      const wp = workflowProcess as IAllWorkflows["wrkflwPrcss"];
      const wc = workflowCategory as keyof IWorkflowState;
      const { isStepOptional, activeStep } = action.payload;

      if (!isStepOptional()) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
      const workflowState = state["inputDataWorkflows"][wp];
      const newSkippedSet = new Set(
        workflowState.skipped && workflowState.skipped.values()
      );
      newSkippedSet.add(activeStep);

      return {
        ...state,
        [wc]: {
          ...(state[wc] as Record<string, IWorkflowProcessState>),
          [wp]: {
            activeStep: action.payload.activeStep + 1,
            skipped: newSkippedSet,
          },
        },
      };
    }

    case NAVBUTTON_DISABLED: {
      const { navButton, isDisabled, workflowCategory, workflowProcess } =
        action.payload;
      const wp = workflowProcess as IAllWorkflows["wrkflwPrcss"];
      const wc = workflowCategory as keyof IWorkflowState;
      const { isStepOptional, activeStep } = action.payload;

      const wcDef = state[wc] as Record<string, IWorkflowProcessState>;

      if (!isStepOptional()) {
        throw new Error("You can't skip a step that isn't optional.");
      }
      const workflowState = wcDef[wp];
      const newSkippedSet = new Set(
        workflowState.skipped && workflowState.skipped.values()
      );
      newSkippedSet.add(activeStep);

      return {
        ...state,
        [wc]: {
          ...wcDef,
          [wp]: {
            isNavButtonDisabled: {
              ...wcDef[wp]["isNavButtonDisabled"],
              [navButton]: isDisabled,
            },
          },
        },
      };
    }

    case SAVE_WORKFLOW:
      return state;

    case RESET_CURRENTWORKFLOW: {
      return workflowState;
    }

    default:
      return state;
  }
};

export default workflowReducer;
