export const WORKFLOW_TO_STORE = "WORKFLOW_TO_STORE";
export const INITIALIZE_WORKFLOW = "INITIALIZE_WORKFLOW";
export const RESET_WORKFLOW = "RESET_WORKFLOW";
export const NEXT_WORKFLOW = "NEXT_WORKFLOW";
export const BACK_WORKFLOW = "BACK_WORKFLOW";
export const SKIP_WORKFLOW = "SKIP_WORKFLOW";
export const SAVE_WORKFLOW = "SAVE_WORKFLOW";

export const workflowInitAction = (steps, isStepOptional, isStepSkipped) => {
  return {
    type: INITIALIZE_WORKFLOW,
    payload: {
      steps,
      isStepOptional,
      isStepSkipped,
    },
  };
};

export const workflowResetAction = (activeStep) => {
  return {
    type: RESET_WORKFLOW,
    payload: {
      activeStep,
    },
  };
};

export const workflowNextAction = (
  skipped,
  isStepSkipped,
  activeStep,
  steps,
  message
) => {
  return {
    type: NEXT_WORKFLOW,
    payload: {
      skipped,
      isStepSkipped,
      activeStep,
      steps,
    },
    meta: { showSpinner: false, message },
  };
};

export const workflowBackAction = (activeStep) => {
  return {
    type: BACK_WORKFLOW,
    payload: {
      activeStep,
    },
  };
};

export const workflowSkipAction = (isStepOptional, activeStep) => {
  return {
    type: SKIP_WORKFLOW,
    payload: {
      isStepOptional,
      activeStep,
    },
  };
};

export const workflowSaveAction = () => {
  return {
    type: SAVE_WORKFLOW,
  };
};
