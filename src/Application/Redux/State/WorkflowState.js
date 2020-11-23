const workflowState = {
  steps: "",
  activeStep: 0,
  skipped: new Set(),
  errorSteps: [],
  optionalSteps: [],

  isStepOptional: null,
  isStepFailed: null,
  isStepSkipped: null,
};

export default workflowState;
