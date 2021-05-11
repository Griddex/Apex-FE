import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { IEconomicsWorkflowProcess } from "../../../Application/Components/Workflows/WorkflowTypes";

export interface IEconomicsSensitivitiesViews {
  create: JSX.Element;
  existingsensitivities: JSX.Element;
}

export type IdType = {
  dataInputId: TEconomicsAnalysesNames;
};

export type TEconomicsAnalysesNames =
  | "netcashFlow"
  | "payout"
  | "minimumCapitalRatio"
  | "netPresentValue"
  | "presentValueRatio"
  | "unitTechnicalCost"
  | "internalRateOfReturn"
  | "mulitpleAnalyses";

export type TEconomicsAnalysesTitles =
  | "Net Cashflow"
  | "Payout"
  | "Minimum Capital Ratio"
  | "Net Present Value"
  | "Present Value Ratio"
  | "Unit Technical Cost"
  | "Internal Rate of Return"
  | "Multiple Analyses";

export type TParametersId = "Parameter 1" | "Parameter 2" | "Parameter 3";

export interface IEconomicsSensitivities {
  analysisName: TEconomicsAnalysesNames;
  targetParameterOptions: ISelectOption[];
  selectedTargetParameterOption: ISelectOption;
  sensitivityValues: any[];
}

export type TEconomicsDecks = "costsRevenue" | "economicsParameters";
export interface IDecksObj {
  id: string;
  title: string;
}

export interface ISensitivitiesRow {
  sn?: number;
  parameter: TParametersId;
  parameterTitle: string;
  parameterValues: string;
}

export type TDevScenarioNames =
  | "oilDevelopment"
  | "nagDevelopment"
  | "oilNAGDevelopment";
export type TDevScenarioTitles =
  | "Oil Development"
  | "NAG Development"
  | "Oil + NAG Development";

export type TSensitivitiesTable = ISensitivitiesRow[];
export interface IEconomicsAnalysis {
  name: TEconomicsAnalysesNames;
  title: TEconomicsAnalysesTitles;
  icon: JSX.Element;
  workflowProcess?: IEconomicsWorkflowProcess["wkPs"];
  devScenario?: TDevScenarioTitles;
  economicsDecks?: Record<TEconomicsDecks, IDecksObj>;
  sensitivities?: IEconomicsSensitivities;
  showSensitivitiesTable?: boolean;
  sensitivitiesTable?: ISensitivitiesRow[];
  analysisTableTitle?: string;
}
export type TEconomicsAnalysisWorkflows =
  `${TEconomicsAnalysesNames}WorkflowProcess`;

export type TEconomicsAnalyses = Record<
  TEconomicsAnalysesNames,
  IEconomicsAnalysis
>;

export interface IEconomicsParametersSensitivitiesProps {
  economicsAnalyses?: IEconomicsAnalysis[];
  workflowProcess?: IEconomicsWorkflowProcess["wkPs"];
  selectedAnalysis?: IEconomicsAnalysis;
  setSelectedAnalysis?: React.Dispatch<any>;
}
