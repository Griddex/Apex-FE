import { EconomicsStateType, IEconomicsState } from "./EconomicsStateTypes";

const importWorkflowProcesses = ["economicsParameterImportWorkflow"];
const generateImportState = () => {
  return importWorkflowProcesses.reduce((acc, workflowProcess) => {
    return {
      ...acc,
      [workflowProcess]: {
        existingData: [], //change this

        statusCode: 0,
        message: "",
        errors: { message: "" },
        success: false,
      },
    };
  }, {});
};

// const analysesWorkflowProcesses = [
//   "economicsAnalyses",
//   "economicsParameterImportWorkflow",
//   "economicsParameters",
//   "netCashAnalysisWorkflow",
//   "saveForecastingParametersWorkflowDialog",
// ];
const analysesWorkflowProcesses = [
  "economicsAnalyses",
  "economicsParameterImportWorkflow",
  "economicsParameters",
  "netCashAnalysisWorkflow",
  "saveForecastingParametersWorkflowDialog",
];
const generateExistingDataState = () => {
  return analysesWorkflowProcesses.reduce((acc, workflowProcess) => {
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

const importDataState = generateImportState();
const existingDataState = generateExistingDataState();
const EconomicsState: EconomicsStateType = {
  currentWorkflowProcess: "economicsAnalyses",
  importDataWorkflows: importDataState,
  existingDataWorkflows: existingDataState,
};

export default EconomicsState;
