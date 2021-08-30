import { RootState } from "../../Redux/Reducers/AllReducers";
import { IWorkflowProcessState } from "../../Redux/State/WorkflowStateTypes";
import { TUseState } from "../../Types/ApplicationTypes";
import { IAction } from "./../../Redux/Actions/ActionTypes";
import * as xlsx from "xlsx";
export interface IWorkflowBannerProps {
  activeStep: number;
  steps: string[];
  moduleName?: string;
  subModuleName: string;
  workflowName?: string;
}

export interface IWorkflowDataProps extends IWorkflowProcessState {
  moduleName?: string;
  subModuleName?: string;
  workflowName?: string;
  workflowData?: any;
}

export interface IProjectWorkflows {
  wkPs: "newProjectWorkflow";
  wkCy: "projectDataWorkflows";
  finalAction?: () => void;
  finalIcon?: JSX.Element;
  finalText?: string;
}
export interface IAdminWorkflows {
  reducer: ReducersType;
  wkPs: "userRegistration";
  wkCy: "inputDataWorkflows";
}
export interface IInputWorkflows {
  reducer: ReducersType;
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
    | "economicsCostsRevenuesDeckStored"
    | "economicsParametersDeckExcel"
    | "economicsParametersDeckDatabase"
    | "economicsParametersDeckManual"
    | "economicsSensitivitiesStored"
    | "economicsParametersDeckStored"
    | "settings";
  wkCy: "inputDataWorkflows";
  finalAction?: () => void;
}
export interface INetworkWorkflows {
  wkPs:
    | "networkGeneration"
    | "networkManualBuild"
    | "networkAutoGeneration"
    | "networkStored"
    | "declineParametersStored"
    | "declineParametersCreate"
    | "productionPrioritizationStored"
    | "productionPrioritizationCreate"
    | "runForecastWorkflow"
    | "createForecastingParametersWorkflow"
    | "editForecastingParametersWorkflow"
    | "declineCurveParametersWorkflow"
    | "createDeclineParametersWorkflow";
  wkCy:
    | "networkDataWorkflows"
    | "storedDataWorkflows"
    | "networkCreationWorkflows";
}
export interface IVisualyticsWorkflows {
  wkPs:
    | "visualyticsDeckExcel"
    | "visualyticsDeckDatabase"
    | "visualyticsDeckStored";
  wkCy:
    | "visualyticsDataWorkflows"
    | "storedDataWorkflows"
    | "visualyticsChartsWorkflows";
}
export interface IForecastResultsWorkflows {
  wkPs:
    | "forecastResultsGeneration"
    | "forecastResultsData"
    | "forecastResultsQualityAssurance"
    | "forecastResultsVisualytics"
    | "forecastResultsStored";
  wkCy: "storedDataWorkflows" | "forecastChartsWorkflows";
}
export interface IEconomicsWorkflows {
  wkPs:
    | "economicsAnalyses"
    | "economicsParameterImportWorkflow"
    | "economicsParameters"
    | "netcashFlow"
    | "payout"
    | "minimumCapitalRatio"
    | "netPresentValue"
    | "presentValueRatio"
    | "unitTechnicalCost"
    | "internalRateOfReturn"
    | "mulitpleAnalyses"
    | "economicsSensitivitiesCreate"
    | "economicsSensitivitiesStored"
    | "economicsTemplateResultsData"
    | "economicsResultsPlotCharts"
    | "economicsResultsSensitivitiesHeatmap"
    | "economicsResultsStored";
  wkCy:
    | "economicsDataWorkflows"
    | "economicsAnalysisWorkflows"
    | "economicsChartsWorkflows";
}

export type ReducersType = keyof {
  [P in NonNullable<keyof RootState> as Exclude<P, symbol>]: boolean;
};
export interface IAllWorkflows {
  reducer: ReducersType;
  wrkflwPrcss:
    | IAdminWorkflows["wkPs"]
    | IProjectWorkflows["wkPs"]
    | IInputWorkflows["wkPs"]
    | INetworkWorkflows["wkPs"]
    | IVisualyticsWorkflows["wkPs"]
    | IForecastResultsWorkflows["wkPs"]
    | IEconomicsWorkflows["wkPs"];
  wrkflwCtgry:
    | IAdminWorkflows["wkCy"]
    | IProjectWorkflows["wkCy"]
    | IInputWorkflows["wkCy"]
    | INetworkWorkflows["wkCy"]
    | IVisualyticsWorkflows["wkCy"]
    | IForecastResultsWorkflows["wkCy"]
    | IEconomicsWorkflows["wkCy"];
  finalAction?: () => void;
  persistSelectedIdTitleAction?: (
    reducer: IAllWorkflows["reducer"],
    idTitleObj: Record<string, string>
  ) => IAction;
  idTitleArr?: string[];
  finalIcon?: JSX.Element;
  finalText?: string;
  inputWorkbook?: xlsx.WorkBook;
  setInputWorkbook?: TUseState<xlsx.WorkBook>;
  extraComponent?: React.FC<any>;
  hasExtraComponent?: boolean;
}

export type TAllWorkflowProcesses = IAllWorkflows["wrkflwPrcss"];
export type TOnlyWorkflowProcesses = Exclude<TAllWorkflowProcesses, "">;
export type TAllWorkflowCategories = IAllWorkflows["wrkflwCtgry"];
export type TOnlyWorkflowCategories = Exclude<
  TAllWorkflowCategories,
  "storedDataWorkflows" | "networkCreationWorkflows" | "forecastChartsWorkflows"
>;

export interface IOnlyWorkflows {
  reducer: ReducersType;
  wrkflwPrcss: TOnlyWorkflowProcesses;
  wrkflwCtgry: TOnlyWorkflowCategories;
  finalAction?: () => void;
  persistSelectedIdTitleAction?: (
    reducer: IAllWorkflows["reducer"],
    idTitleObj: Record<string, string>
  ) => IAction;
  idTitleArr?: string[];
  finalIcon?: JSX.Element;
  finalText?: string;
  inputWorkbook?: xlsx.WorkBook;
  setInputWorkbook?: TUseState<xlsx.WorkBook>;
  extraComponent?: React.FC<any>;
  hasExtraComponent?: boolean;
}
