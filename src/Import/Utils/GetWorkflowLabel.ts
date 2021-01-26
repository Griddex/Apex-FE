import { IWorkflowProcess } from "../../Application/Components/Workflows/WorkflowTypes";

// export const getWorkflowlabel: Record<IWorkflowProcess["workflowProcess"],string> = {
export const getWorkflowlabel: {
  [P in IWorkflowProcess["workflowProcess"]]: string;
} = {
  facilitiesInputDeckExcel: "Facilities InputDeck",
  facilitiesInputDeckDatabase: "Facilities InputDeck",
  facilitiesInputDeckApproveddeck: "Approved Facilities InputDeck",

  forecastInputDeckExcel: "Forecast InputDeck",
  forecastInputDeckDatabase: "Forecast InputDeck",
  forecastInputDeckApproveddeck: "Approved Forecast InputDeck",

  productionDataExcel: "Production Data",
  productionDataDatabase: "Production Data",
  productionDataApproved: "Approved Production Data",

  networkApproved: "Approved Network Data",

  economicsDataExcel: "",
  economicsDataDatabase: "",
  economicsDataManual: "",
  economicsDataApproved: "Approved Economics Data",

  economicsWorkflow: "",
  economicsParameterImportWorkflow: "",
  economicsParameters: "",
  netCashAnalysisWorkflow: "",
  saveForecastParametersWorkflow: "",
  "": "",
};
