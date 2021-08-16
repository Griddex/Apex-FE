export interface IWorkflowProcessState {
  steps: string[];
  activeStep: number;
  skipped?: Set<number>;
  errorSteps?: number[];
  optionalSteps?: number[];
  workflowProcess?: string;
  isNavButtonDisabled?: {
    reset: boolean;
    skip: boolean;
    back: boolean;
    next: boolean;
  };

  isStepOptional?: (activeStep: number) => boolean;
  isStepFailed?: () => boolean;
  isStepSkipped?: (step: number) => boolean;
}

export interface IWorkflowState {
  currentWorkflowProcess: string;
  projectDataWorkflows: Record<string, IWorkflowProcessState>;
  inputDataWorkflows: Record<string, IWorkflowProcessState>;
  networkDataWorkflows: Record<string, IWorkflowProcessState>;
  economicsDataWorkflows: Record<string, IWorkflowProcessState>;
  economicsAnalysisWorkflows: Record<string, IWorkflowProcessState>;
  economicsChartsWorkflows: Record<string, IWorkflowProcessState>;
}
