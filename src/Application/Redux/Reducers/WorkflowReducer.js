import {
  INITIALIZE_WORKFLOW,
  RESET_WORKFLOW,
  NEXT_WORKFLOW,
  BACK_WORKFLOW,
  SKIP_WORKFLOW,
  SAVE_WORKFLOW,
} from "../Actions/WorkflowActions";
import workflowState from "../State/WorkflowState";

const workflowReducer = (state = workflowState, action) => {
  switch (action.type) {
    case INITIALIZE_WORKFLOW:
      return {
        ...state,
        steps: action.payload.steps,
        isStepSkipped: action.payload.isStepSkipped,
        isStepOptional: action.payload.isStepOptional,
      };

    case RESET_WORKFLOW:
      return {
        ...state,
        activeStep: action.payload.activeStep,
      };

    case NEXT_WORKFLOW: {
      let newSkipped = state.skipped;
      const { skipped, isStepSkipped, activeStep, steps } = action.payload;

      if (isStepSkipped && isStepSkipped(activeStep)) {
        newSkipped = new Set(skipped.values());
        newSkipped.delete(activeStep);
      }

      if (activeStep === steps.length - 1) {
        return { ...state };
      }

      return {
        ...state,
        activeStep: action.payload.activeStep + 1,
        skipped: newSkipped,
      };
    }
    case BACK_WORKFLOW:
      return {
        ...state,
        activeStep: action.payload.activeStep - 1,
      };

    case SKIP_WORKFLOW: {
      const { isStepOptional, activeStep } = action.payload;

      if (!isStepOptional()) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
      const newSkippedSet = new Set(state.skipped.values());
      newSkippedSet.add(activeStep);

      return {
        ...state,
        activeStep: action.payload.activeStep + 1,
        skipped: newSkippedSet,
      };
    }
    case SAVE_WORKFLOW: //Not yet complete
      return { ...state };

    default:
      return { ...state };
  }
};

export default workflowReducer;
