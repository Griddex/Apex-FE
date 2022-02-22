import { CSSProperties } from "react";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { IEconomicsWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAggregateButtonProps } from "../EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsAndRevenuesTypes";

export interface IEconomicsSensitivitiesViews {
  create: JSX.Element;
  storedsensitivities: JSX.Element;
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

export type TEconomicsAnalysesNamesAbbr =
  | "irr"
  | "mcr"
  | "npv"
  | "payout"
  | "utc";

export type TParametersId = "Parameter 1" | "Parameter 2" | "Parameter 3";

export interface IEcoSelectedSensitivities {
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
  id?: string;
  _id?: string;
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

export type TBackendDevScenarioTitles = "OIL/AG" | "NAG" | "OIL + NAG";

export type TForecastScenario = "1P_1C" | "2P_2C" | "3P_3C";

export type TSensitivitiesTable = ISensitivitiesRow[];
export interface IEconomicsAnalysis {
  name: TEconomicsAnalysesNames;
  title: TEconomicsAnalysesTitles;
  icon: JSX.Element;
  workflowProcess?: IEconomicsWorkflows["wkPs"];
  devScenario?: TDevScenarioTitles;
  economicsDecks?: Record<TEconomicsDecks, IDecksObj>;
  forecastScenarioAnalysis?: TForecastScenario;
  economicsAnalysisButtons?: IAggregateButtonProps[];
}
export interface IEconomicsSensitivities {
  sensitivitiesData?: IEcoSelectedSensitivities;
  showSensitivitiesTable?: boolean;
  sensitivitiesTable?: ISensitivitiesRow[];
  sensitivitiesTableTitle?: string;
}

export type TEconomicsAnalysisWorkflows =
  `${TEconomicsAnalysesNames}WorkflowProcess`;

export type TEconomicsAnalyses = Record<
  TEconomicsAnalysesNames,
  IEconomicsAnalysis
>;

export interface IEconomicsParametersSensitivitiesProps {
  economicsAnalyses?: IEconomicsAnalysis[];
  workflowProcess?: IEconomicsWorkflows["wkPs"];
  selectedAnalysis?: IEconomicsAnalysis;
  setSelectedAnalysis?: React.Dispatch<any>;
  finalAction?: () => void;
  borderStyles?: CSSProperties;
}

export type TEconomicsResultsCase =
  | "noSensPort"
  | "noSensAgg"
  | "sensPort"
  | "sensAgg";
