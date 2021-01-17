export interface IWorkflowProcessState {
  steps: string[];
  activeStep: number;
  skipped?: Set<number>;
  errorSteps?: number[];
  optionalSteps?: number[];
  workflowProcess?: string;

  isStepOptional?: (activeStep: number) => boolean;
  isStepFailed?: () => boolean;
  isStepSkipped?: (step: number) => boolean;
}
export type WorkflowStateType = Record<string, IWorkflowProcessState>;
