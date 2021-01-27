import { IInputWorkflowProcess } from "../../Application/Components/Workflows/WorkflowTypes";

// export const getWorkflowlabel: Record<IInputWorkflowProcess["workflowProcess"],string> = {
export const getWorkflowlabel: {
  [P in IInputWorkflowProcess["workflowProcess"]]: string;
} = {
  facilitiesInputDeckExcel: "Facilities InputDeck",
  facilitiesInputDeckDatabase: "Facilities InputDeck",
  facilitiesInputDeckApproveddeck: "Approved Facilities InputDeck",

  forecastInputDeckExcel: "Forecast InputDeck",
  forecastInputDeckDatabase: "Forecast InputDeck",
  forecastInputDeckApproveddeck: "Approved Forecast InputDeck",

  productionInputDataExcel: "Production Data",
  productionInputDataDatabase: "Production Data",
  productionInputDataApproved: "Approved Production Data",

  networkApproved: "Approved Network Data",
  networkGeneration: "",

  economicsInputDataExcel: "",
  economicsInputDataDatabase: "",
  economicsInputDataManual: "",
  economicsInputDataApproved: "Approved Economics Data",

  economicsAnalyses: "",
  economicsParameterImportWorkflow: "",
  economicsParameters: "",
  netCashAnalysisWorkflow: "",
  saveForecastParametersWorkflow: "",
  "": "",
};
