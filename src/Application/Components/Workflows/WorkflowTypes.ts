import { RootState } from "../../Redux/Reducers/AllReducers";
import { IWorkflowProcessState } from "../../Redux/State/WorkflowStateTypes";
import { IAction } from "./../../Redux/Actions/ActionTypes";

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
export interface IInputWorkflowProcess {
  wkPs:
    | "facilitiesInputDeckExcel"
    | "facilitiesInputDeckDatabase"
    | "forecastInputDeckExcel"
    | "forecastInputDeckDatabase"
    | "forecastInputDeckSaveAutogenerate"
    | "forecastInputDeckSaveManualgenerate"
    | "productionInputDataExcel"
    | "productionInputDataDatabase"
    | "economicsCostsRevenuesDeckExcel"
    | "economicsCostsRevenuesDeckDatabase"
    | "economicsCostsRevenuesDeckManual"
    | "economicsCostsRevenuesDeckApexForecast"
    | "economicsCostsRevenuesDeckExisting"
    | "economicsParametersDeckExcel"
    | "economicsParametersDeckDatabase"
    | "economicsParametersDeckManual"
    | "economicsSensitivitiesExisting"
    | "economicsParametersDeckExisting";
  wkCy: "inputDataWorkflows";
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
    | "economicsResultsExisting"
    | "netcashFlow"
    | "payout"
    | "minimumCapitalRatio"
    | "netpresentvalue"
    | "presentValueRatio"
    | "unitTechnicalCost"
    | "internalRateOfReturn"
    | "mulitpleAnalyses";
  wkCy: "economicsDataWorkflows" | "economicsAnalysisWorkflows";
}

export type ReducersType = keyof {
  [P in NonNullable<keyof RootState> as Exclude<P, symbol>]: boolean;
};
export interface IAllWorkflowProcesses {
  reducer: ReducersType;
  wrkflwPrcss:
    | IProjectWorkflowProcess["wkPs"]
    | IInputWorkflowProcess["wkPs"]
    | INetworkWorkflowProcess["wkPs"]
    | IEconomicsWorkflowProcess["wkPs"];
  wrkflwCtgry:
    | IProjectWorkflowProcess["wkCy"]
    | IInputWorkflowProcess["wkCy"]
    | INetworkWorkflowProcess["wkCy"]
    | IEconomicsWorkflowProcess["wkCy"];
  finalAction?: () => void;
  persistSelectedIdTitleAction?: (
    reducer: IAllWorkflowProcesses["reducer"],
    idTitleObj: Record<string, string>
  ) => IAction;
  idTitleArr?: string[];
  finalIcon?: JSX.Element;
  finalText?: string;
}
