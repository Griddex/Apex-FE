export const IMPORT_WORKFLOW_INITIALIZE = "IMPORT_WORKFLOW_INITIALIZE";
export const IMPORT_WORKFLOW_RESET = "IMPORT_WORKFLOW_RESET";
export const IMPORT_WORKFLOW_NEXT = "IMPORT_WORKFLOW_NEXT";
export const IMPORT_WORKFLOW_BACK = "IMPORT_WORKFLOW_BACK";
export const IMPORT_WORKFLOW_SKIP = "IMPORT_WORKFLOW_SKIP";
export const IMPORT_WORKFLOW_SAVE = "IMPORT_WORKFLOW_SAVE";

export const stepperWorkflowInitializationAction = (
  moduleText,
  perspectiveText,
  steps
) => {
  return {
    type: IMPORT_WORKFLOW_INITIALIZE,
    payload: {
      ImportModule: moduleText,
      ContextImportPerspective: perspectiveText,
      Steps: steps,
      ActiveStep: 0,
    },
  };
};
export const stepperResetAction = (moduleText, perspectiveText) => {
  return {
    type: IMPORT_WORKFLOW_RESET,
    payload: {
      ImportModule: moduleText,
      ActiveStep: 0,
    },
  };
};
export const stepperNextAction = (moduleText, perspectiveText, activeStep) => {
  return {
    type: IMPORT_WORKFLOW_NEXT,
    payload: {
      ImportModule: moduleText,
      ActiveStep: activeStep + 1,
    },
  };
};
export const stepperBackAction = (moduleText, perspectiveText, activeStep) => {
  return {
    type: IMPORT_WORKFLOW_BACK,
    payload: {
      ImportModule: moduleText,
      ActiveStep: activeStep - 1,
    },
  };
};
export const stepperSkipAction = (moduleText, perspectiveText, activeStep) => {
  return {
    type: IMPORT_WORKFLOW_SKIP,
    payload: {
      ImportModule: moduleText,
      ActiveStep: activeStep - 1,
    },
  };
};
export const stepperSaveAction = (activeStep, moduleText, perspectiveText) => {
  return {
    type: IMPORT_WORKFLOW_SAVE,
  };
};
