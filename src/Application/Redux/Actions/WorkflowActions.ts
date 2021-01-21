export const SET_WORKFLOWPROCESS = "SET_WORKFLOWPROCESS";
export const INITIALIZE_WORKFLOW = "INITIALIZE_WORKFLOW";
export const RESET_WORKFLOW = "RESET_WORKFLOW";
export const NEXT_WORKFLOW = "NEXT_WORKFLOW";
export const BACK_WORKFLOW = "BACK_WORKFLOW";
export const SKIP_WORKFLOW = "SKIP_WORKFLOW";
export const SAVE_WORKFLOW = "SAVE_WORKFLOW";

export const setWorkflowProcessAction = (workflowProcess: string) => {
  return {
    type: SET_WORKFLOWPROCESS,
    payload: {
      workflowProcess,
    },
  };
};

export const workflowInitAction = (
  steps: string[],
  isStepOptional: (activeStep: number) => boolean,
  isStepSkipped: (step: number) => boolean,
  workflowProcess: string
) => {
  return {
    type: INITIALIZE_WORKFLOW,
    payload: {
      steps,
      isStepOptional,
      isStepSkipped,
      workflowProcess,
    },
  };
};

export const workflowResetAction = (
  activeStep: number,
  workflowProcess: string
) => {
  return {
    type: RESET_WORKFLOW,
    payload: {
      activeStep,
      workflowProcess,
    },
  };
};

export const workflowNextAction = (
  skipped: Set<number>,
  isStepSkipped: (step: number) => boolean,
  activeStep: number,
  steps: string[],
  message: string,
  workflowProcess: string
) => {
  return {
    type: NEXT_WORKFLOW,
    payload: {
      skipped,
      isStepSkipped,
      activeStep,
      steps,
      workflowProcess,
    },
    meta: { showSpinner: false, message },
  };
};

export const workflowBackAction = (
  activeStep: number,
  workflowProcess: string
) => {
  return {
    type: BACK_WORKFLOW,
    payload: {
      activeStep,
      workflowProcess,
    },
  };
};

export const workflowSkipAction = (
  isStepOptional: (activeStep: number) => boolean,
  activeStep: number,
  workflowProcess: string
) => {
  return {
    type: SKIP_WORKFLOW,
    payload: {
      isStepOptional,
      activeStep,
      workflowProcess,
    },
  };
};

export const workflowSaveAction = (workflowProcess: string) => {
  return {
    type: SAVE_WORKFLOW,
    payload: {
      workflowProcess,
    },
  };
};
