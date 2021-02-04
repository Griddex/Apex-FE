export interface IEconomicsState {
  forecastRun: string;
}

export type IEconomicsWorkflowProcessesType =
  | "economicsAnalyses"
  | "economicsParameterImportWorkflow"
  | "economicsParameters"
  | "netCashAnalysisWorkflow"
  | "saveForecastingParametersWorkflowDialog";

export interface EconomicsStateType {
  currentWorkflowProcess: IEconomicsWorkflowProcessesType;
  importDataWorkflows: Record<string, IEconomicsState>;
  existingDataWorkflows: Record<string, IEconomicsState[]>;
}
