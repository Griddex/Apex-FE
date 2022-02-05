import { WorkBook } from "xlsx";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { IWorkflowProcessState } from "../../Redux/State/WorkflowStateTypes";
import { TUseState } from "../../Types/ApplicationTypes";
import { IAction } from "./../../Redux/Actions/ActionTypes";

export interface IWorkflowBannerProps {
  activeStep: number;
  steps: string[];
  moduleName?: string;
  subModuleName: string;
  workflowName?: string;
  showChip?: boolean;
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
  reducer: TReducer;
  wkPs: "userRegistration" | "manageProfile";
  wkCy: "inputDataWorkflows";
}

export interface IInputWorkflows {
  reducer: TReducer;
  wkPs:
    | "facilitiesInputDeckExcel"
    | "facilitiesInputDeckDatabase"
    | "forecastInputDeckExcel"
    | "forecastInputDeckDatabase"
    | "forecastInputDeckSaveAutogenerate"
    | "forecastInputDeckSaveManualgenerate"
    | "forecastProfilesExcel"
    | "forecastProfilesDatabase"
    | "forecastProfilesStored"
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
  basePathStr?: string;
  forecastEconomicsAggregated?: Record<string, any[]>;
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
    | "visualyticsPlotCharts"
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
    | "economicsRanking"
    | "economicsResultsStored";
  wkCy:
    | "economicsDataWorkflows"
    | "economicsAnalysisWorkflows"
    | "economicsChartsWorkflows";
}

export type TReducer = keyof {
  [P in NonNullable<keyof RootState> as Exclude<P, symbol>]: boolean;
};
export interface IAllWorkflows {
  reducer: TReducer;
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
  inputWorkbook?: WorkBook;
  setInputWorkbook?: TUseState<WorkBook>;
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
  reducer: TReducer;
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
  inputWorkbook?: WorkBook;
  setInputWorkbook?: TUseState<WorkBook>;
  extraComponent?: React.FC<any>;
  hasExtraComponent?: boolean;
}
