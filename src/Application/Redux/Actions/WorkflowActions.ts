import { INavigationButtonsProp } from "../../Components/NavigationButtons/NavigationButtonTypes";
import {
  TAllWorkflowCategories,
  TAllWorkflowProcesses,
} from "../../Components/Workflows/WorkflowTypes";
import { IStoredDataProps } from "../../Types/ApplicationTypes";

export const SET_WORKFLOWPROCESS = "SET_WORKFLOWPROCESS";
export const INITIALIZE_WORKFLOW = "INITIALIZE_WORKFLOW";
export const RESET_WORKFLOW = "RESET_WORKFLOW";
export const NEXT_WORKFLOW = "NEXT_WORKFLOW";
export const BACK_WORKFLOW = "BACK_WORKFLOW";
export const SKIP_WORKFLOW = "SKIP_WORKFLOW";
export const NAVBUTTON_DISABLED = "NAVBUTTON_DISABLED";
export const SAVE_WORKFLOW = "SAVE_WORKFLOW";
export const RESET_CURRENTWORKFLOW = "RESET_CURRENTWORKFLOW";

export const setWorkflowProcessAction = (
  workflowProcess: TAllWorkflowProcesses | IStoredDataProps["wkPs"],
  workflowCategory: TAllWorkflowCategories | IStoredDataProps["wkCy"]
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
  workflowProcess: TAllWorkflowProcesses,
  workflowCategory: TAllWorkflowCategories
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
  workflowProcess: TAllWorkflowProcesses,
  workflowCategory: TAllWorkflowCategories
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
  workflowProcess: TAllWorkflowProcesses,
  workflowCategory: TAllWorkflowCategories
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
  workflowProcess: TAllWorkflowProcesses,
  workflowCategory: TAllWorkflowCategories
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
  workflowProcess: TAllWorkflowProcesses,
  workflowCategory: TAllWorkflowCategories
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

export const updateNavButtonDisbledAction = (
  navButton: keyof INavigationButtonsProp["isNavButtonDisabled"],
  isDisabled: boolean,
  workflowProcess: TAllWorkflowProcesses,
  workflowCategory: TAllWorkflowCategories
) => {
  return {
    type: NAVBUTTON_DISABLED,
    payload: {
      navButton,
      isDisabled,
      workflowProcess,
      workflowCategory,
    },
  };
};

export const workflowSaveAction = (
  workflowProcess: TAllWorkflowProcesses,
  workflowCategory: TAllWorkflowCategories
) => {
  return {
    type: SAVE_WORKFLOW,
    payload: {
      workflowProcess,
      workflowCategory,
    },
  };
};

export const resetCurrentWorkflowAction = () => {
  return {
    type: RESET_CURRENTWORKFLOW,
  };
};
