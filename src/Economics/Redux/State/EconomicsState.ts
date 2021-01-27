import { IEconomicsState } from "./EconomicsStateTypes";

const economicsWorkflowProcesses = [
  "economicsAnalyses",
  "economicsParameterImportWorkflow",
  "economicsParameters",
  "netCashAnalysisWorkflow",
  "saveForecastParametersWorkflow",
];
const generateExistingDataState = () => {
  return economicsWorkflowProcesses.reduce((acc, workflowProcess: string) => {
    return {
      ...acc,
      [workflowProcess]: {
        existingData: [],

        existingDataId: "",
        statusCode: 0,
        message: "",
        errors: { message: "" },
        success: false,
      },
    };
  }, {});
};

const EconomicsState: IEconomicsState = {
  forecastRun: "",
};
export default EconomicsState;
