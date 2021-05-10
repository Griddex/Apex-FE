import zipObject from "lodash.zipobject";

interface CostRevenueProperties {
  projectId: string;
  economicsDataId: string;
  year: number;
  oilProdRate: number;
  condensateProdRate: number;
  gasProdRate: number;
  totalExploartionCost: number;
  totalDevelopmentCost: number;
  productionCost: number;
  seismicCost: number;
  explAppraisalCost: number;
  facilitiesCapex: number;
  tangibleDrillingCost: number;
  intangibleDrillingCost: number;
  directCost: number;
  projectCost: number;
  abandonmentCost: number;
  gasProcessingCost: number;
  cha: number;
  tariffs: number;
  terminalCost: number;
}

export const costsRevenueHeaders = [
  { variableName: "projectId", variableTitle: "" },
  { variableName: "economicsDataId", variableTitle: "" },
  { variableName: "year", variableTitle: "Year" },
  { variableName: "oilProdRate", variableTitle: "Oil Rate" },
  { variableName: "condensateProdRate", variableTitle: "Condensate Rate" },
  { variableName: "gasProdRate", variableTitle: "Gas Rate" },
  { variableName: "totalExploartionCost", variableTitle: "Total Expl. Cost" },
  { variableName: "totalDevelopmentCost", variableTitle: "Total Dev. Cost" },
  { variableName: "productionCost", variableTitle: "Production Cost" },
  { variableName: "seismicCost", variableTitle: "Seismic Cost" },
  {
    variableName: "explAppraisalCost",
    variableTitle: "Expl. & Appraisal Cost",
  },
  { variableName: "facilitiesCapex", variableTitle: "Facilities Capex" },
  {
    variableName: "tangibleDrillingCost",
    variableTitle: "Tangible Drilling Cost",
  },
  {
    variableName: "intangibleDrillingCost",
    variableTitle: "Intangible Drilling Cost",
  },
  { variableName: "directCost", variableTitle: "Direct Cost" },
  { variableName: "projectCost", variableTitle: "Project Cost" },
  { variableName: "abandonmentCost", variableTitle: "Abandonment Cost" },
  { variableName: "gasProcessingCost", variableTitle: "Gas Processing Cost" },
  { variableName: "cha", variableTitle: "CHA" },
  { variableName: "tariffs", variableTitle: "Tariffs" },
  { variableName: "terminalCost", variableTitle: "Terminal Cost" },
];

export const economicsParameterHeaders = [
  {
    variableName: "yearDiscounting",
    variableTitle: "Reference Year for Discounting",
  },
  { variableName: "firstOilYear", variableTitle: "First Oil Date" },
  { variableName: "oilPrice", variableTitle: "Oil price" },
  { variableName: "gasPrice", variableTitle: "Gas price" },
  { variableName: "lPGPrice", variableTitle: "LPG Price" },
  { variableName: "leanWHGasRatio", variableTitle: "Lean Gas/WH Gas Ratio" },
  {
    variableName: "LPGWHGasRatio",
    variableTitle: "LPG Prod/WH Gas Prod Ratio",
  },
  { variableName: "farmInBonus", variableTitle: "Farm-in Signature Bonus" },
  { variableName: "preProd", variableTitle: "G&A Cost (Pre-Prod) " },
  { variableName: "postProd", variableTitle: "G&A Cost (Post-Prod) " },
  { variableName: "CHAOpex", variableTitle: "Var Oil Opex (CHA)" },

  {
    variableName: "terminalFee",
    variableTitle: "Var Oil Opex (Terminaling Fee)",
  },
  { variableName: "gasVarOpex", variableTitle: "Gas Var Opex" },
  {
    variableName: "operationDaysPerAnnum",
    variableTitle: "Operation Days/annum",
  },
  {
    variableName: "utilizedGasVolume",
    variableTitle: "Self Utilized Gas Volume",
  },
  { variableName: "inflationRate", variableTitle: "Inflation Rate" },
  { variableName: "recReserves", variableTitle: "Recoverable Reserves" },
  { variableName: "abandCost", variableTitle: "Abandonment Cost" },
  {
    variableName: "recoverableReserves",
    variableTitle: "Recoverable Reserves",
  },
  {
    variableName: "abandCoostPerBbl",
    variableTitle: "Abandonment Cost per bbl",
  },
  { variableName: "prodTerrain", variableTitle: "Production Terrain" },
  { variableName: "gasDevConcept", variableTitle: "Gas Development Concept" },
  { variableName: "pia", variableTitle: "PIA" },
  { variableName: "ppt", variableTitle: "PPT" },
  { variableName: "citaOnGas", variableTitle: "CITA on Gas Sales" },
  { variableName: "nddcLevy", variableTitle: "NDDC Levy" },
  { variableName: "flarePenalty", variableTitle: "Flare Penalty" },
  { variableName: "pptOption", variableTitle: "PPT Option" },
  { variableName: "oilRoyalty", variableTitle: "Oil Royalty" },
  { variableName: "gasRoyalty", variableTitle: "Gas Royalty" },
];

export const getVariableTitlesNamesObj = () => {
  const titles = economicsParameterHeaders.map((v) => v.variableTitle);
  const names = economicsParameterHeaders.map((v) => v.variableName);

  return zipObject(titles, names);
};

export const economicsParametersSensitivities = [
  { variableName: "firstOilYear", variableTitle: "First Oil Date" },
  { variableName: "oilPrice", variableTitle: "Oil price" },
  { variableName: "gasPrice", variableTitle: "Gas price" },
  { variableName: "lPGPrice", variableTitle: "LPG Price" },
  { variableName: "farmInBonus", variableTitle: "Farm-in Signature Bonus" },
  { variableName: "inflationRate", variableTitle: "Inflation Rate" },
] as const;

export const developmentScenarios = [
  {
    variableName: "oilDevelopment",
    variableTitle: "Oil Development",
  },
  {
    variableName: "nagDevelopment",
    variableTitle: "NAG Development",
  },
  {
    variableName: "oilNAGDevelopment",
    variableTitle: "Oil + NAG Development",
  },
];

const EconomicsAnalysesNames = [
  "netcashFlow",
  "payout",
  "minimumCapitalRatio",
  "netPresentValue",
  "presentValueRatio",
  "unitTechnicalCost",
  "internalRateOfReturn",
  "mulitpleAnalyses",
];

const EconomicsAnalysesTitles = [
  "Net Cashflow",
  "Payout",
  "Minimum Capital Ratio",
  "Net Present Value",
  "Present Value Ratio",
  "Unit Technical Cost",
  "Internal Rate of Return",
  "Multiple Analyses",
];

export const economicsAnalysesNameTitlesObj = zipObject(
  EconomicsAnalysesNames,
  EconomicsAnalysesTitles
);

export const economicsAnalysesNameTitle = [
  {
    variableName: "netcashFlow",
    variableTitle: "Net Cashflow",
  },
  {
    variableName: "payout",
    variableTitle: "Payout",
  },
  {
    variableName: "minimumCapitalRatio",
    variableTitle: "Minimum Capital Ratio",
  },
  {
    variableName: "netPresentValue",
    variableTitle: "Net Present Value",
  },
  {
    variableName: "presentValueRatio",
    variableTitle: "Present Value Ratio",
  },
  {
    variableName: "unitTechnicalCost",
    variableTitle: "Unit Technical Cost",
  },
  {
    variableName: "internalRateOfReturn",
    variableTitle: "Internal Rate of Return",
  },
  {
    variableName: "mulitpleAnalyses",
    variableTitle: "Multiple Analyses",
  },
];

export const economicsAnalysesOptions = [
  {
    value: "netcashFlow",
    label: "Net Cashflow",
  },
  {
    value: "payout",
    label: "Payout",
  },
  {
    value: "minimumCapitalRatio",
    label: "Minimum Capital Ratio",
  },
  {
    value: "netPresentValue",
    label: "Net Present Value",
  },
  {
    value: "presentValueRatio",
    label: "Present Value Ratio",
  },
  {
    value: "unitTechnicalCost",
    label: "Unit Technical Cost",
  },
  {
    value: "internalRateOfReturn",
    label: "Internal Rate of Return",
  },
  {
    value: "mulitpleAnalyses",
    label: "Multiple Analyses",
  },
];
