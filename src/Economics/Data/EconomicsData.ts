import zipObject from "lodash.zipobject";

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
    variableName: "intangibleDrilling",
    variableTitle: "Intangible Drilling Cost",
  },
  { variableName: "taxDepreciation", variableTitle: "Tax Depreciation" },
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
    variableName: "terminalFeeOpex",
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

export const developmentScenarioOptions = [
  {
    value: "oilDevelopment",
    label: "Oil Development",
  },
  {
    value: "nagDevelopment",
    label: "NAG Development",
  },
  {
    value: "oilNAGDevelopment",
    label: "Oil + NAG Development",
  },
];

export const costRevdevelopmentScenarioOptions = {
  costRevenuesOil: {
    value: "oilDevelopment",
    label: "Oil Development",
    altLabel: "OIL/AG",
  },
  costRevenuesNAG: {
    value: "nagDevelopment",
    label: "NAG Development",
    altLabel: "NAG",
  },
  costRevenuesOil_NAG: {
    value: "oilNAGDevelopment",
    label: "Oil + NAG Development",
    altLabel: "OIL + NAG",
  },
};

export const backendDevScenarioOptions = {
  "OIL/AG": {
    value: "oilDevelopment",
    label: "Oil Development",
  },
  NAG: {
    value: "nagDevelopment",
    label: "NAG Development",
  },
  "OIL + NAG": {
    value: "oilNAGDevelopment",
    label: "Oil + NAG Development",
  },
};

export type TBackendCostsRevenues =
  keyof typeof costRevdevelopmentScenarioOptions;

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

export const economicsAnalysisNamesAbbrMap = {
  netcashFlow: "ncf",
  payout: "payout",
  minimumCapitalRatio: "mcr",
  netPresentValue: "npv",
  presentValueRatio: "pvr",
  unitTechnicalCost: "utc",
  internalRateOfReturn: "irr",
  mulitpleAnalyses: "mpa",
};

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

export const economicsAnalysesMap = {
  netcashFlow: "Net Cashflow",
  payout: "Payout",
  minimumCapitalRatio: "Minimum Capital Ratio",
  netPresentValue: "Net Present Value",
  presentValueRatio: "Present Value Ratio",
  unitTechnicalCost: "Unit Technical Cost",
  internalRateOfReturn: "Internal Rate of Return",
  mulitpleAnalyses: "Multiple Analyses",
};

export const forecastCaseOptions = [
  { value: "1P_1C", label: "Low Case" },
  { value: "2P_2C", label: "Base Case" },
  { value: "3P_3C", label: "High Case" },
];

export const developmentScenariosMap = {
  "OIL/AG": "oilDevelopment",
  NAG: "nagDevelopment",
  "OIL + NAG": "oilNAGDevelopment",
};

export const devScenarios = {
  oilDevelopment: "OIL/AG",
  nagDevelopment: "NAG",
  oilNAGDevelopment: "OIL + NAG",
};

export const chartTypeOptions = {
  stackedArea: "StackedAreaChart",
  line: "LineChart",
  doughnut: "DoughnutChart",
  bar: "BarChart",
};

export type TChartTypeNames = keyof typeof chartTypeOptions;

export const economicsPerspectiveTreeMap = {
  heatMapTree: "sensitivitiesHeatMapTree",
  plotChartsTree: "economicsPlotChartsTree",
  templatesTree: "economicsTemplatesTree",
};

export type TEconomicsTreePerspective =
  keyof typeof economicsPerspectiveTreeMap;

export const economicsPlotChartsOptions = [
  {
    value: "stackedAreaChart",
    label: "Stacked Area",
  },
  {
    value: "lineChart",
    label: "Line",
  },
  {
    value: "doughnutChart",
    label: "Doughnut",
  },
  {
    value: "barChart",
    label: "Bar",
  },
  {
    value: "scatterChart",
    label: "Scatter",
  },
  {
    value: "radarChart",
    label: "Radar",
  },
  {
    value: "heatMapChart",
    label: "Heatmap",
  },
];

export const economicsSecondaryPlotChartsOptions = [
  {
    value: "stackedAreaChart",
    label: "Stacked Area",
  },
  {
    value: "lineChart",
    label: "Line",
  },
  {
    value: "barChart",
    label: "Bar",
  },
  {
    value: "scatterChart",
    label: "Scatter",
  },
];

export type TDevScenariosMapKeys = keyof typeof developmentScenariosMap;

export const oilNAGDevelopmentNames = [
  "project",
  "year",
  "baseOilRate",
  "associatedGasRate",
  "seismicCost",
  "explAppraisalCost",
  "facilitiesCapex",
  "tangibleDrillingCost",
  "intangibleDrillingCost",
  "abandonmentCost",
  "directCost",
  "projectCost",
  "cHA",
  "terminalFee",
  "tariffs",
  "taxDepreciation",
  "condensateRate",
  "nonAssociatedGasRate",
  "gasProcTraiffs",
];

export const oilDevelopmentNames = [
  "project",
  "year",
  "baseOilRate",
  "associatedGasRate",
  "seismicCost",
  "explAppraisalCost",
  "facilitiesCapex",
  "tangibleDrillingCost",
  "intangibleDrillingCost",
  "abandonmentCost",
  "directCost",
  "projectCost",
  "cHA",
  "terminalFee",
  "tariffs",
  "taxDepreciation",
];

export const nagDevelopmentNames = [
  "project",
  "year",
  "condensateRate",
  "nonAssociatedGasRate",
  "seismicCost",
  "explAppraisalCost",
  "facilitiesCapex",
  "tangibleDrillingCost",
  "intangibleDrillingCost",
  "abandonmentCost",
  "directCost",
  "projectCost",
  "cHA",
  "terminalFee",
  "tariffs",
  "gasProcTraiffs",
  "taxDepreciation",
];

export const productionTerrainOptions = [
  { value: "onshore", label: "Onshore" },
  { value: "shallowWater", label: "Shallow Water" },
];

export const gasDevelopmentConceptOptions = [
  { value: "monetize", label: "Monetize" },
  { value: "flare", label: "Flare" },
];

export const initialHeatMapData = {
  heatMapTreeByScenario: { id: "", name: "" },
  sensitivitiesHeatMapTree: { id: "", name: "" },
  sensitivitiesHeatMapData: {},
  sensitivitiesHeatMap1or2D: [],
  heatMapVariableXOptions: {},
  heatMapVariableYOptions: {},
  heatMapVariableZOptions: {},
  showCategoryZMembers: false,
  showHeatMapCategoryMembersObj: {
    "X Category": false,
    "Y Category": false,
    "Y Secondary Category": false,
    "Z Category": false,
    "R Category": false,
  },
  heatMapCategoryDragItems: {
    "X Category": {},
    "Y Category": {},
    "Y Secondary Category": {},
    "Z Category": {},
    "R Category": {},
  },
  heatMapCategoryHasDropped: {
    "X Category": {},
    "Y Category": {},
    "Y Secondary Category": {},
    "Z Category": {},
    "R Category": {},
  },
};

export const costsRevenueAggregationLevelOptions = [
  {
    value: "portfolio",
    label: "Portfolio",
  },
  {
    value: "module",
    label: "Module",
  },
  {
    value: "drainagePoint",
    label: "Drainage Point",
  },
  {
    value: "flowStation",
    label: "Station",
  },
  {
    value: "scenario",
    label: "Scenario",
  },
  {
    value: "field",
    label: "Field",
  },
  {
    value: "reservoir",
    label: "Reservoir",
  },
  {
    value: "projectName",
    label: "Project",
  },
  {
    value: "hydrocarbonStream",
    label: "Hydrocarbon Stream",
  },
  {
    value: "hydrocarbonType",
    label: "Hydrocarbon Type",
  },
  {
    value: "resourceClass",
    label: "Resource Class",
  },
  {
    value: "developmentTranche",
    label: "Development Tranche",
  },
];

export const costsRevenueAggregationLevelsNames =
  costsRevenueAggregationLevelOptions.map((o) => o?.value);
