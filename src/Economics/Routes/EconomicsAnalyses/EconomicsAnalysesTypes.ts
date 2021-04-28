export type TEconomicsAnalysesNames =
  | "netcashFlow"
  | "Payout"
  | "unitTechnicalCost"
  | "netpresentvalue"
  | "presentValueRatio"
  | "minimumCapitalRatio"
  | "internalRateOfReturn"
  | "mulitpleAnalyses";

export type TEconomicsAnalysesTitles =
  | "Net Cashflow"
  | "Payout"
  | "Unit Technical Cost"
  | "Net Present Value"
  | "Present Value Ratio"
  | "Minimum Capital Ratio"
  | "Internal Rate of Return"
  | "Multiple Analyses";

export interface IEconomicsAnalysis {
  name: TEconomicsAnalysesNames;
  title: TEconomicsAnalysesTitles;
  icon: JSX.Element;
}

export type TEconomicsAnalyses = IEconomicsAnalysis[];

export interface IEconomicsParametersSensitivites {
  economicsAnalyses: TEconomicsAnalyses;
}
