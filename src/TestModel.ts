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
  tariffs: number;
}

export const nameTitle = [
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
  { variableName: "tariffs", variableTitle: "Tariffs" },
];
