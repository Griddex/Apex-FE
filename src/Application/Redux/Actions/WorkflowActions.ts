import { IAllWorkflowProcesses } from "../../Components/Workflows/WorkflowTypes";
import { IExistingDataProps } from "../../Types/ApplicationTypes";

export const SET_WORKFLOWPROCESS = "SET_WORKFLOWPROCESS";
export const REINITIALIZE_WORKFLOW = "REINITIALIZE_WORKFLOW";
export const INITIALIZE_WORKFLOW = "INITIALIZE_WORKFLOW";
export const RESET_WORKFLOW = "RESET_WORKFLOW";
export const NEXT_WORKFLOW = "NEXT_WORKFLOW";
export const BACK_WORKFLOW = "BACK_WORKFLOW";
export const SKIP_WORKFLOW = "SKIP_WORKFLOW";
export const SAVE_WORKFLOW = "SAVE_WORKFLOW";
export const SETUP_WORKFLOW = "SETUP_WORKFLOW";

export const setWorkflowProcessAction = (
  workflowProcess:
    | IAllWorkflowProcesses["wrkflwPrcss"]
    | IExistingDataProps["wkPs"],
  workflowCategory:
    | IAllWorkflowProcesses["wrkflwCtgry"]
    | IExistingDataProps["wkCy"]
) => {
  return {
    type: SET_WORKFLOWPROCESS,
    payload: {
      workflowProcess,
      workflowCategory,
    },
  };
};

export const workflowReInitAction = (path: string, value: React.Key) => {
  return {
    type: REINITIALIZE_WORKFLOW,
    payload: {
      path,
      value,
    },
  };
};

export const workflowInitAction = (
  steps: string[],
  isStepOptional: (activeStep: number) => boolean,
  isStepSkipped: (step: number) => boolean,
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"],
  workflowCategory: IAllWorkflowProcesses["wrkflwCtgry"]
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
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"],
  workflowCategory: IAllWorkflowProcesses["wrkflwCtgry"]
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
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"],
  workflowCategory: IAllWorkflowProcesses["wrkflwCtgry"]
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
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"],
  workflowCategory: IAllWorkflowProcesses["wrkflwCtgry"]
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
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"],
  workflowCategory: IAllWorkflowProcesses["wrkflwCtgry"]
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
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"],
  workflowCategory: IAllWorkflowProcesses["wrkflwCtgry"]
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
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"],
  workflowCategory: IAllWorkflowProcesses["wrkflwCtgry"],
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
