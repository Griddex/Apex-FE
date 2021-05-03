import { IEconomicsWorkflowProcess } from "../../../Application/Components/Workflows/WorkflowTypes";

export type TEconomicsAnalysesNames =
  | "netcashFlow"
  | "payout"
  | "minimumCapitalRatio"
  | "netpresentvalue"
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

export type TParameterNames = "parameter1" | "parameter2" | "parameter3";
export interface IParametersObj {
  name: string; //hard type to costrev and econ par?
  data: number[];
}
export interface IEconomicsSensitivities {
  targetVariable: TEconomicsAnalysesNames;
  sensitivityParameters: Record<TParameterNames, IParametersObj>;
}

export type TEconomicsDecks = "costsRevenue" | "economicsParameters";
export interface IDecksObj {
  id: string;
  title: string;
}
export interface IEconomicsAnalysis {
  name: TEconomicsAnalysesNames;
  title: TEconomicsAnalysesTitles;
  icon: JSX.Element;
  workflowProcess?: IEconomicsWorkflowProcess["wkPs"];
  devScenario?: "Oil Development" | "NAG Development" | "Oil + NAG Development";
  economicsDecks?: Record<TEconomicsDecks, IDecksObj>;
  sensitivities?: IEconomicsSensitivities;
}

export type TEconomicsAnalysisWorkflows = `${TEconomicsAnalysesNames}WorkflowProcess`;

export type TEconomicsAnalyses = IEconomicsAnalysis[];

export interface IEconomicsParametersSensitivitiesProps {
  economicsAnalyses: TEconomicsAnalyses;
  workflowProcess?: IEconomicsWorkflowProcess["wkPs"];
  selectedAnalysis?: IEconomicsAnalysis;
  setSelectedAnalysis?: React.Dispatch<any>;
}
