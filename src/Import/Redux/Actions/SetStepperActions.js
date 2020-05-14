export const IMPORT_STEPPERSTEPFAILED_SET = "IMPORT_STEPPERSTEPFAILED_SET";
export const IMPORT_STEPPERSTEPSKIPPED_SET = "IMPORT_STEPPERSTEPSKIPPED_SET";
export const IMPORT_STEPPERSTEPSACTIVESTEPS_SET =
  "IMPORT_STEPPERSTEPSACTIVESTEPS_SET";

export const setStepperStepFailed = (stepFailed) => {
  return {
    type: IMPORT_STEPPERSTEPFAILED_SET,
    payload: { IsStepFailed: stepFailed },
  };
};
export const setStepperStepSkipped = (stepSkipped) => {
  return {
    type: IMPORT_STEPPERSTEPSKIPPED_SET,
    payload: { IsStepSkipped: stepSkipped },
  };
};
export const setStepperStepsAndActiveStep = (steps, activeStep) => {
  return {
    type: IMPORT_STEPPERSTEPSACTIVESTEPS_SET,
    payload: { Steps: steps, ActiveStep: activeStep },
  };
};
