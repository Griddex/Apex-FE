import { IInputWorkflowProcess } from "../../Application/Components/Workflows/WorkflowTypes";
import { IExistingDataProps } from "../../Application/Types/ApplicationTypes";

// export const getInputWorkflowlabel: Record<IInputWorkflowProcess["wrkflwPrcss"],string> = {
export const getInputWorkflowlabel: {
  [P in IInputWorkflowProcess["wkPs"]]: string;
} = {
  facilitiesInputDeckExcel: "Facilities InputDeck",
  facilitiesInputDeckDatabase: "Facilities InputDeck",

  forecastInputDeckExcel: "Forecast InputDeck",
  forecastInputDeckDatabase: "Forecast InputDeck",

  forecastInputDeckSaveAutogenerate: "Forecast InputDeck Save & Auto Generate",
  forecastInputDeckSaveManualgenerate:
    "Forecast InputDeck Save & Manually Generate",

  productionInputDataExcel: "Production Data",
  productionInputDataDatabase: "Production Data",

  economicsCostsRevenuesDeckExcel: "Economics Data",
  economicsCostsRevenuesDeckDatabase: "Economics Data",
  economicsCostsRevenuesDeckManual: "Economics Data",
  economicsCostsRevenuesDeckApexForecast: "Economics Data",
  economicsCostsRevenuesDeckExisting: "Economics Data",
  economicsParametersDeckExcel: "Economics Data",
  economicsParametersDeckDatabase: "Economics Data",
  economicsParametersDeckManual: "Economics Data",
  economicsParametersDeckExisting: "Economics Data",
  economicsSensitivitiesExisting: "Economics Data",
};

export const getExistingWorkflowlabel: {
  [P in NonNullable<IExistingDataProps["wkPs"]>]: string;
} = {
  facilitiesInputDeckExisting: "Existing Facilities InputDeck",
  forecastInputDeckExisting: "Existing Forecast InputDeck",
  productionInputDataExisting: "Existing Production Data",
  forecastResultsData: "Forecast Results Data",
  forecastResultsVisualytics: "Forecast Results Visualytics",
  forecastResultsExisting: "Existing Forecast Results",
  networkExisting: "Existing Network Data",
  economicsCostsRevenuesDeckExisting: "Economics Data",
  economicsParametersDeckExisting: "Economics Data",
  economicsSensitivitiesExisting: "Economics Data",
  economicsResultsExisting: "Economics Data",
};
