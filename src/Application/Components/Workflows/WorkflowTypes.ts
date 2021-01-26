import { MutableRefObject } from "react";
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

export interface IWorkflowProcess {
  workflowProcess:
    | "facilitiesInputDeckExcel"
    | "facilitiesInputDeckDatabase"
    | "facilitiesInputDeckApproveddeck"
    | "forecastInputDeckExcel"
    | "forecastInputDeckDatabase"
    | "forecastInputDeckApproveddeck"
    | "productionDataExcel"
    | "productionDataDatabase"
    | "productionDataApproved"
    | "economicsDataExcel"
    | "economicsDataDatabase"
    | "economicsDataManual"
    | "economicsDataApproved"
    | "networkApproved"
    | "economicsWorkflow"
    | "economicsParameterImportWorkflow"
    | "economicsParameters"
    | "netCashAnalysisWorkflow"
    | "saveForecastParametersWorkflow"
    | "";
  finalAction?: () => void;
}
export interface IWorkflowProcessExtra extends IWorkflowProcess {
  // finalAction: () => void;
  // finalActionButtonText: string;
  snExistingData?: IExistingDataRow[];
  dataKey?: string;
  dataTitle?: string;
  chartData?: Record<string, React.Key>[];
  tableOptions?: ITableIconsOptions;
}
