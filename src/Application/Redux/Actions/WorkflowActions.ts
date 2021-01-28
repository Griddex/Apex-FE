import { IAllWorkflowProcesses } from "../../Components/Workflows/WorkflowTypes";
import { IExistingDataProps } from "../../Types/ApplicationTypes";

export const SET_WORKFLOWPROCESS = "SET_WORKFLOWPROCESS";
export const INITIALIZE_WORKFLOW = "INITIALIZE_WORKFLOW";
export const RESET_WORKFLOW = "RESET_WORKFLOW";
export const NEXT_WORKFLOW = "NEXT_WORKFLOW";
export const BACK_WORKFLOW = "BACK_WORKFLOW";
export const SKIP_WORKFLOW = "SKIP_WORKFLOW";
export const SAVE_WORKFLOW = "SAVE_WORKFLOW";
export const SETUP_WORKFLOW = "SETUP_WORKFLOW";

export const setWorkflowProcessAction = (
  workflowProcess:
    | IAllWorkflowProcesses["workflowProcess"]
    | IExistingDataProps["workflowProcess"],
  workflowCategory:
    | IAllWorkflowProcesses["workflowCategory"]
    | IExistingDataProps["workflowCategory"]
) => {
  return {
    type: SET_WORKFLOWPROCESS,
    payload: {
      workflowProcess,
      workflowCategory,
    },
  };
};

export const workflowInitAction = (
  steps: string[],
  isStepOptional: (activeStep: number) => boolean,
  isStepSkipped: (step: number) => boolean,
  workflowProcess: IAllWorkflowProcesses["workflowProcess"],
  workflowCategory: IAllWorkflowProcesses["workflowCategory"]
) => {
  return {
    type: INITIALIZE_WORKFLOW,
    payload: {
      steps,
      isStepOptional,
      isStepSkipped,
      workflowProcess,
      workflowCategory,
    },
  };
};

export const workflowResetAction = (
  activeStep: number,
  workflowProcess: IAllWorkflowProcesses["workflowProcess"],
  workflowCategory: IAllWorkflowProcesses["workflowCategory"]
) => {
  return {
    type: RESET_WORKFLOW,
    payload: {
      activeStep,
      workflowProcess,
      workflowCategory,
    },
  };
};

export const workflowNextAction = (
  skipped: Set<number>,
  isStepSkipped: (step: number) => boolean,
  activeStep: number,
  steps: string[],
  message: string,
  workflowProcess: IAllWorkflowProcesses["workflowProcess"],
  workflowCategory: IAllWorkflowProcesses["workflowCategory"]
) => {
  return {
    type: NEXT_WORKFLOW,
    payload: {
      skipped,
      isStepSkipped,
      activeStep,
      steps,
      workflowProcess,
      workflowCategory,
    },
    meta: { showSpinner: false, message },
  };
};

export const workflowBackAction = (
  activeStep: number,
  workflowProcess: IAllWorkflowProcesses["workflowProcess"],
  workflowCategory: IAllWorkflowProcesses["workflowCategory"]
) => {
  return {
    type: BACK_WORKFLOW,
    payload: {
      activeStep,
      workflowProcess,
      workflowCategory,
    },
  };
};

export const workflowSkipAction = (
  isStepOptional: (activeStep: number) => boolean,
  activeStep: number,
  workflowProcess: IAllWorkflowProcesses["workflowProcess"],
  workflowCategory: IAllWorkflowProcesses["workflowCategory"]
) => {
  return {
    type: SKIP_WORKFLOW,
    payload: {
      isStepOptional,
      activeStep,
      workflowProcess,
      workflowCategory,
    },
  };
};

export const workflowSaveAction = (
  workflowProcess: IAllWorkflowProcesses["workflowProcess"],
  workflowCategory: IAllWorkflowProcesses["workflowCategory"]
) => {
  return {
    type: SAVE_WORKFLOW,
    payload: {
      workflowProcess,
      workflowCategory,
    },
  };
};

export const setUpWorkflowAction = (
  workflowProcess: IAllWorkflowProcesses["workflowProcess"],
  workflowCategory: IAllWorkflowProcesses["workflowCategory"],
  name: string
) => {
  return {
    type: SETUP_WORKFLOW,
    payload: {
      name,
      workflowProcess,
      workflowCategory,
    },
  };
};
