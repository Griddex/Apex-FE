import { IExistingDataRow } from "../../../Import/Routes/Common/InputLayoutTypes";
import { IWorkflowProcessState } from "../../Redux/State/WorkflowStateTypes";
import { ITableIconsOptions } from "./../Table/ReactDataGrid/ApexGridTypes";

export interface IWorkflowBannerProps {
  activeStep: number;
  steps: string[];
  moduleName: string;
  subModuleName: string;
  workflowName: string;
}

export interface IWorkflowDataProps extends IWorkflowProcessState {
  moduleName: string;
  subModuleName: string;
  workflowName: string;
  workflowData?: any;
}

export interface IInputWorkflowProcess {
  workflowProcess:
    | "facilitiesInputDeckExcel"
    | "facilitiesInputDeckDatabase"
    | "facilitiesInputDeckApproveddeck"
    | "forecastInputDeckExcel"
    | "forecastInputDeckDatabase"
    | "forecastInputDeckApproveddeck"
    | "productionInputDataExcel"
    | "productionInputDataDatabase"
    | "productionInputDataApproved"
    | "economicsInputDataExcel"
    | "economicsInputDataDatabase"
    | "economicsInputDataManual"
    | "economicsInputDataApproved"
    // | "networkApproved"
    // | "networkGeneration"
    // | "economicsAnalyses"
    // | "economicsParameterImportWorkflow"
    // | "economicsParameters"
    // | "netCashAnalysisWorkflow"
    // | "saveForecastParametersWorkflow"
    | "";
  finalAction?: () => void;
}
export interface IInputWorkflowProcessExtra extends IInputWorkflowProcess {
  // finalAction: () => void;
  // finalActionButtonText: string;
  snExistingData?: IExistingDataRow[];
  dataKey?: string;
  dataTitle?: string;
  chartData?: Record<string, React.Key>[];
  tableOptions?: ITableIconsOptions;
}
