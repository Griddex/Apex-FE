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

export interface IProjectWorkflows {
  wkPs: "newProjectWorkflow";
  wkCy: "projectDataWorkflows";
  finalAction?: () => void;
  finalIcon?: JSX.Element;
  finalText?: string;
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
    | "productionPrioritizationStored"
    | "runForecastWorkflow"
    | "saveForecastingParametersWorkflow"
    | "declineCurveParametersWorkflow";
  wkCy:
    | "networkDataWorkflows"
    | "storedDataWorkflows"
    | "networkCreationWorkflows";
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
  wkCy: "economicsDataWorkflows" | "economicsAnalysisWorkflows";
}

export type ReducersType = keyof {
  [P in NonNullable<keyof RootState> as Exclude<P, symbol>]: boolean;
};
export interface IAllWorkflows {
  reducer: ReducersType;
  wrkflwPrcss:
    | IProjectWorkflows["wkPs"]
    | IInputWorkflows["wkPs"]
    | INetworkWorkflows["wkPs"]
    | IEconomicsWorkflows["wkPs"];
  wrkflwCtgry:
    | IProjectWorkflows["wkCy"]
    | IInputWorkflows["wkCy"]
    | INetworkWorkflows["wkCy"]
    | IEconomicsWorkflows["wkCy"];
  finalAction?: () => void;
  persistSelectedIdTitleAction?: (
    reducer: IAllWorkflows["reducer"],
    idTitleObj: Record<string, string>
  ) => IAction;
  idTitleArr?: string[];
  finalIcon?: JSX.Element;
  finalText?: string;
  extraComponent?: React.FC<any>;
  hasExtraComponent?: boolean;
}

export type TAllWorkflowProcesses = IAllWorkflows["wrkflwPrcss"];
export type TOnlyWorkflowProcesses = Exclude<IAllWorkflows["wrkflwPrcss"], "">;
export type TAllWorkflowCategories = IAllWorkflows["wrkflwCtgry"];
export type TOnlyWorkflowCategories = Exclude<
  IAllWorkflows["wrkflwCtgry"],
  "storedDataWorkflows" | "networkCreationWorkflows"
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
  extraComponent?: React.FC<any>;
  hasExtraComponent?: boolean;
}
