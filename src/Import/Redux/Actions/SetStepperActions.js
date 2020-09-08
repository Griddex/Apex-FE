export const INITIALIZE_WORKFLOW = "INITIALIZE_WORKFLOW";
export const RESET_WORKFLOW = "RESET_WORKFLOW";
export const NEXT_WORKFLOW = "NEXT_WORKFLOW";
export const BACK_WORKFLOW = "BACK_WORKFLOW";
export const SKIP_WORKFLOW = "SKIP_WORKFLOW";
export const SAVE_WORKFLOW = "SAVE_WORKFLOW";

export const workflowInitAction = (name, moduleName, steps) => {
  return {
    type: INITIALIZE_WORKFLOW,
    payload: {
      workflowName: name,
      moduleName,
      steps,
      activeStep: 0,
    },
  };
};
export const workflowResetAction = (name, moduleName) => {
  return {
    type: RESET_WORKFLOW,
    payload: {
      workflowName: name,
      moduleName,
      activeStep: 0,
    },
  };
};
export const workflowNextAction = (name, moduleName, activeStep) => {
  return {
    type: NEXT_WORKFLOW,
    payload: {
      workflowName: name,
      moduleName,
      activeStep: activeStep + 1,
    },
  };
};
export const workflowBackAction = (name, moduleName, activeStep) => {
  return {
    type: BACK_WORKFLOW,
    payload: {
      workflowName: name,
      moduleName,
      activeStep: activeStep - 1,
    },
  };
};
export const workflowSkipAction = (name, moduleName, activeStep) => {
  return {
    type: SKIP_WORKFLOW,
    payload: {
      workflowName: name,
      moduleName,
      activeStep: activeStep - 1,
    },
  };
};
export const workflowSaveAction = (name) => {
  return {
    type: SAVE_WORKFLOW,
    payload: { workflowName: name },
  };
};
