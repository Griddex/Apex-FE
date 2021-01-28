export interface IEconomicsState {
  forecastRun: string;
}

export type IEconomicsWorkflowProcessesType =
  | "economicsAnalyses"
  | "economicsParameterImportWorkflow"
  | "economicsParameters"
  | "netCashAnalysisWorkflow"
  | "saveForecastParametersWorkflow"
  | "";

export interface EconomicsStateType {
  currentWorkflowProcess: IEconomicsWorkflowProcessesType;
  importDataWorkflows: Record<string, IEconomicsState>;
  existingDataName: Record<string, IEconomicsState[]>;
}
