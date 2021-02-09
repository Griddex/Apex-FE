import { IImportWorkflowProcess } from "../../Application/Components/Workflows/WorkflowTypes";
import { IExistingDataProps } from "../../Application/Types/ApplicationTypes";

// export const getInputWorkflowlabel: Record<IImportWorkflowProcess["wrkflwPrcss"],string> = {
export const getInputWorkflowlabel: {
  [P in IImportWorkflowProcess["wkPs"]]: string;
} = {
  facilitiesInputDeckExcel: "Facilities InputDeck",
  facilitiesInputDeckDatabase: "Facilities InputDeck",

  forecastInputDeckExcel: "Forecast InputDeck",
  forecastInputDeckDatabase: "Forecast InputDeck",

  productionInputDataExcel: "Production Data",
  productionInputDataDatabase: "Production Data",

  economicsInputDataExcel: "Economics Data",
  economicsInputDataDatabase: "Economics Data",
  economicsInputDataManual: "Economics Data",
};

export const getExistingWorkflowlabel: {
  [P in NonNullable<IExistingDataProps["wkPs"]>]: string;
} = {
  facilitiesInputDeckExisting: "Existing Facilities InputDeck",
  forecastInputDeckExisting: "Existing Forecast InputDeck",
  productionInputDataExisting: "Existing Production Data",
  forecastResultsVisualytics: "Forecast Results Visualytics",
  forecastResultsExisting: "Existing Forecast Results",
  economicsInputDataExisting: "Existing Economics Data",
  economicsParametersExisting: "Existing Economics Parameters Data",
  networkExisting: "Existing Network Data",
};
