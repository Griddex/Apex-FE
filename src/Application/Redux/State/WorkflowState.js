const workflowState = {
  steps: "",
  activeStep: 0,
  skipped: new Set(),
  errorSteps: [],
  OptionalSteps: [],

  isStepOptional: null,
  IsStepFailed: null,
  IsStepSkipped: null,
};

export default workflowState;
