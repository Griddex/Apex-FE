import { IApplicationExistingData } from "../../../Application/Types/ApplicationTypes";

export interface IEconomicsState {
  id: string;
  userId?: string;
  title: string;
  description: string;
  createdAt: string;
}

export type IEconomicsWorkflowProcessesType =
  | "economicsAnalyses"
  | "economicsParameterImportWorkflow"
  | "economicsParameters"
  | "netCashAnalysisWorkflow"
  | "saveForecastingParametersWorkflowDialog";

export interface EconomicsStateType {
  //Remove from here
  forecastRun: string;
  currentWorkflowProcess: IEconomicsWorkflowProcessesType;
  loadCostsRevenueWorkflow: boolean;
  inputDataWorkflows: Record<string, IApplicationExistingData>;
  existingDataWorkflows: Record<string, IApplicationExistingData[]>;
}
