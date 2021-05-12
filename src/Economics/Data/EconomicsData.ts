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

export const forecastCaseOptions = [
  { value: "1P_1C", label: "Low Case" },
  { value: "2P_2C", label: "Base Case" },
  { value: "3P_3C", label: "High Case" },
];

export const mapData = [
  {
    country: "AD",
    "hot dog": 17,
    "hot dogColor": "hsl(184, 70%, 50%)",
    burger: 64,
    burgerColor: "hsl(351, 70%, 50%)",
    sandwich: 14,
    sandwichColor: "hsl(103, 70%, 50%)",
    kebab: 58,
    kebabColor: "hsl(223, 70%, 50%)",
    fries: 38,
    friesColor: "hsl(187, 70%, 50%)",
    donut: 70,
    donutColor: "hsl(73, 70%, 50%)",
    junk: 53,
    junkColor: "hsl(198, 70%, 50%)",
    sushi: 47,
    sushiColor: "hsl(97, 70%, 50%)",
    ramen: 2,
    ramenColor: "hsl(138, 70%, 50%)",
    curry: 69,
    curryColor: "hsl(163, 70%, 50%)",
    udon: 41,
    udonColor: "hsl(31, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 99,
    "hot dogColor": "hsl(259, 70%, 50%)",
    burger: 67,
    burgerColor: "hsl(131, 70%, 50%)",
    sandwich: 37,
    sandwichColor: "hsl(218, 70%, 50%)",
    kebab: 68,
    kebabColor: "hsl(167, 70%, 50%)",
    fries: 15,
    friesColor: "hsl(324, 70%, 50%)",
    donut: 70,
    donutColor: "hsl(57, 70%, 50%)",
    junk: 66,
    junkColor: "hsl(320, 70%, 50%)",
    sushi: 22,
    sushiColor: "hsl(225, 70%, 50%)",
    ramen: 97,
    ramenColor: "hsl(299, 70%, 50%)",
    curry: 25,
    curryColor: "hsl(8, 70%, 50%)",
    udon: 91,
    udonColor: "hsl(267, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 48,
    "hot dogColor": "hsl(211, 70%, 50%)",
    burger: 6,
    burgerColor: "hsl(53, 70%, 50%)",
    sandwich: 61,
    sandwichColor: "hsl(208, 70%, 50%)",
    kebab: 43,
    kebabColor: "hsl(294, 70%, 50%)",
    fries: 18,
    friesColor: "hsl(163, 70%, 50%)",
    donut: 30,
    donutColor: "hsl(89, 70%, 50%)",
    junk: 63,
    junkColor: "hsl(12, 70%, 50%)",
    sushi: 30,
    sushiColor: "hsl(331, 70%, 50%)",
    ramen: 35,
    ramenColor: "hsl(111, 70%, 50%)",
    curry: 90,
    curryColor: "hsl(83, 70%, 50%)",
    udon: 88,
    udonColor: "hsl(316, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 49,
    "hot dogColor": "hsl(242, 70%, 50%)",
    burger: 20,
    burgerColor: "hsl(298, 70%, 50%)",
    sandwich: 79,
    sandwichColor: "hsl(176, 70%, 50%)",
    kebab: 81,
    kebabColor: "hsl(84, 70%, 50%)",
    fries: 83,
    friesColor: "hsl(266, 70%, 50%)",
    donut: 48,
    donutColor: "hsl(69, 70%, 50%)",
    junk: 46,
    junkColor: "hsl(66, 70%, 50%)",
    sushi: 96,
    sushiColor: "hsl(319, 70%, 50%)",
    ramen: 37,
    ramenColor: "hsl(340, 70%, 50%)",
    curry: 82,
    curryColor: "hsl(260, 70%, 50%)",
    udon: 5,
    udonColor: "hsl(138, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 85,
    "hot dogColor": "hsl(349, 70%, 50%)",
    burger: 75,
    burgerColor: "hsl(148, 70%, 50%)",
    sandwich: 95,
    sandwichColor: "hsl(242, 70%, 50%)",
    kebab: 4,
    kebabColor: "hsl(12, 70%, 50%)",
    fries: 15,
    friesColor: "hsl(11, 70%, 50%)",
    donut: 62,
    donutColor: "hsl(178, 70%, 50%)",
    junk: 70,
    junkColor: "hsl(128, 70%, 50%)",
    sushi: 86,
    sushiColor: "hsl(169, 70%, 50%)",
    ramen: 46,
    ramenColor: "hsl(221, 70%, 50%)",
    curry: 55,
    curryColor: "hsl(15, 70%, 50%)",
    udon: 71,
    udonColor: "hsl(316, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 36,
    "hot dogColor": "hsl(62, 70%, 50%)",
    burger: 91,
    burgerColor: "hsl(27, 70%, 50%)",
    sandwich: 34,
    sandwichColor: "hsl(200, 70%, 50%)",
    kebab: 69,
    kebabColor: "hsl(245, 70%, 50%)",
    fries: 36,
    friesColor: "hsl(360, 70%, 50%)",
    donut: 81,
    donutColor: "hsl(114, 70%, 50%)",
    junk: 90,
    junkColor: "hsl(352, 70%, 50%)",
    sushi: 28,
    sushiColor: "hsl(316, 70%, 50%)",
    ramen: 98,
    ramenColor: "hsl(332, 70%, 50%)",
    curry: 41,
    curryColor: "hsl(334, 70%, 50%)",
    udon: 43,
    udonColor: "hsl(203, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 74,
    "hot dogColor": "hsl(51, 70%, 50%)",
    burger: 86,
    burgerColor: "hsl(280, 70%, 50%)",
    sandwich: 29,
    sandwichColor: "hsl(72, 70%, 50%)",
    kebab: 98,
    kebabColor: "hsl(211, 70%, 50%)",
    fries: 59,
    friesColor: "hsl(60, 70%, 50%)",
    donut: 0,
    donutColor: "hsl(310, 70%, 50%)",
    junk: 17,
    junkColor: "hsl(211, 70%, 50%)",
    sushi: 2,
    sushiColor: "hsl(320, 70%, 50%)",
    ramen: 25,
    ramenColor: "hsl(115, 70%, 50%)",
    curry: 8,
    curryColor: "hsl(13, 70%, 50%)",
    udon: 2,
    udonColor: "hsl(192, 70%, 50%)",
  },
  {
    country: "AO",
    "hot dog": 28,
    "hot dogColor": "hsl(42, 70%, 50%)",
    burger: 33,
    burgerColor: "hsl(236, 70%, 50%)",
    sandwich: 0,
    sandwichColor: "hsl(344, 70%, 50%)",
    kebab: 84,
    kebabColor: "hsl(314, 70%, 50%)",
    fries: 83,
    friesColor: "hsl(154, 70%, 50%)",
    donut: 14,
    donutColor: "hsl(351, 70%, 50%)",
    junk: 56,
    junkColor: "hsl(267, 70%, 50%)",
    sushi: 27,
    sushiColor: "hsl(265, 70%, 50%)",
    ramen: 58,
    ramenColor: "hsl(42, 70%, 50%)",
    curry: 76,
    curryColor: "hsl(336, 70%, 50%)",
    udon: 32,
    udonColor: "hsl(106, 70%, 50%)",
  },
  {
    country: "AQ",
    "hot dog": 48,
    "hot dogColor": "hsl(18, 70%, 50%)",
    burger: 52,
    burgerColor: "hsl(165, 70%, 50%)",
    sandwich: 59,
    sandwichColor: "hsl(145, 70%, 50%)",
    kebab: 14,
    kebabColor: "hsl(334, 70%, 50%)",
    fries: 2,
    friesColor: "hsl(261, 70%, 50%)",
    donut: 20,
    donutColor: "hsl(217, 70%, 50%)",
    junk: 34,
    junkColor: "hsl(127, 70%, 50%)",
    sushi: 59,
    sushiColor: "hsl(138, 70%, 50%)",
    ramen: 66,
    ramenColor: "hsl(335, 70%, 50%)",
    curry: 27,
    curryColor: "hsl(65, 70%, 50%)",
    udon: 99,
    udonColor: "hsl(255, 70%, 50%)",
  },
];
