import { IWorkflowProcessState } from "../../Redux/State/WorkflowStateTypes";

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

export interface IProjectWorkflowProcess {
  workflowProcess: "newProjectDialogWorkflow" | "";
  workflowCategory: "projectDataWorkflows";
  finalAction?: () => void;
  finalIcon?: JSX.Element;
  finalText?: string;
}
export interface IImportWorkflowProcess {
  workflowProcess:
    | "facilitiesInputDeckExcel"
    | "facilitiesInputDeckDatabase"
    | "forecastInputDeckExcel"
    | "forecastInputDeckDatabase"
    | "productionInputDataExcel"
    | "productionInputDataDatabase"
    | "economicsInputDataExcel"
    | "economicsInputDataDatabase"
    | "economicsInputDataManual"
    | "";
  workflowCategory: "importDataWorkflows";
}
export interface INetworkWorkflowProcess {
  workflowProcess: "networkGeneration" | "saveForecastParametersWorkflow" | "";
  workflowCategory: "networkDataWorkflows";
}
export interface IEconomicsWorkflowProcess {
  workflowProcess:
    | "economicsAnalyses"
    | "economicsParameterImportWorkflow"
    | "economicsParameters"
    | "netCashAnalysisWorkflow"
    | "";
  workflowCategory: "economicsDataWorkflows";
}

export interface IAllWorkflowProcesses {
  workflowProcess:
    | IProjectWorkflowProcess["workflowProcess"]
    | IImportWorkflowProcess["workflowProcess"]
    | INetworkWorkflowProcess["workflowProcess"]
    | IEconomicsWorkflowProcess["workflowProcess"];
  workflowCategory:
    | IProjectWorkflowProcess["workflowCategory"]
    | IImportWorkflowProcess["workflowCategory"]
    | INetworkWorkflowProcess["workflowCategory"]
    | IEconomicsWorkflowProcess["workflowCategory"];
  finalAction?: () => void;
  finalIcon?: JSX.Element;
  finalText?: string;
}
