import { IWorkflowProcessState } from "../../Redux/State/WorkflowStateTypes";

export interface IWorkflowBannerProps {
  activeStep: number;
  steps: string[];
  moduleName: string;
  subModuleName: string;
  workflowName: string;
}

export interface IWorkflowDataProps extends IWorkflowProcessState {
  moduleName?: string;
  subModuleName?: string;
  workflowName?: string;
  workflowData?: any;
}

export interface IProjectWorkflowProcess {
  wkPs: "newProjectWorkflowDialog";
  wkCy: "projectDataWorkflows";
  finalAction?: () => void;
  finalIcon?: JSX.Element;
  finalText?: string;
}
export interface IImportWorkflowProcess {
  wkPs:
    | "facilitiesInputDeckExcel"
    | "facilitiesInputDeckDatabase"
    | "forecastInputDeckExcel"
    | "forecastInputDeckDatabase"
    | "forecastInputDeckSaveAutogenerate"
    | "forecastInputDeckSaveManualgenerate"
    | "productionInputDataExcel"
    | "productionInputDataDatabase"
    | "economicsInputDataExcel"
    | "economicsInputDataDatabase"
    | "economicsInputDataManual";
  wkCy: "importDataWorkflows";
}
export interface INetworkWorkflowProcess {
  wkPs:
    | "networkGeneration"
    | "saveForecastingParametersWorkflowDialog"
    | "declineCurveParametersDialog";
  wkCy: "networkDataWorkflows";
}
export interface IEconomicsWorkflowProcess {
  wkPs:
    | "economicsAnalyses"
    | "economicsParameterImportWorkflow"
    | "economicsParameters"
    | "netCashAnalysisWorkflow";
  wkCy: "economicsDataWorkflows";
}

export interface IAllWorkflowProcesses {
  wrkflwPrcss:
    | IProjectWorkflowProcess["wkPs"]
    | IImportWorkflowProcess["wkPs"]
    | INetworkWorkflowProcess["wkPs"]
    | IEconomicsWorkflowProcess["wkPs"];
  wrkflwCtgry:
    | IProjectWorkflowProcess["wkCy"]
    | IImportWorkflowProcess["wkCy"]
    | INetworkWorkflowProcess["wkCy"]
    | IEconomicsWorkflowProcess["wkCy"];
  finalAction?: () => void;
  finalIcon?: JSX.Element;
  finalText?: string;
}
