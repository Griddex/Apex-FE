import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import {
  IAllWorkflows,
  IEconomicsWorkflows,
  IInputWorkflows,
  ReducersType,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  TDevScenarioNames,
  TEconomicsAnalysesNames,
  TEconomicsAnalysesTitles,
} from "./../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";

export const LOAD_ECONOMICS_WORKFLOW = "LOAD_ECONOMICS_WORKFLOW";
export const UPDATE_ECONOMICSPARAMETER = "UPDATE_ECONOMICSPARAMETER";
export const STORED_COSTSREVENUESDATA_REQUEST =
  "STORED_COSTSREVENUESDATA_REQUEST";
export const STORED_COSTSREVENUESDATA_SUCCESS =
  "STORED_COSTSREVENUESDATA_SUCCESS";
export const STORED_COSTSREVENUESDATA_FAILURE =
  "STORED_COSTSREVENUESDATA_FAILURE";

export const STORED_ECONOMICSPARAMETERSDATA_REQUEST =
  "STORED_ECONOMICSPARAMETERSDATA_REQUEST";
export const STORED_ECONOMICSPARAMETERSDATA_SUCCESS =
  "STORED_ECONOMICSPARAMETERSDATA_SUCCESS";
export const STORED_ECONOMICSPARAMETERSDATA_FAILURE =
  "STORED_ECONOMICSPARAMETERSDATA_FAILURE";

export const SAVE_COSTSREVENUES_REQUEST = "SAVE_COSTSREVENUES_REQUEST";
export const SAVE_COSTSREVENUES_SUCCESS = "SAVE_COSTSREVENUES_SUCCESS";
export const SAVE_COSTSREVENUES_FAILURE = "SAVE_COSTSREVENUES_FAILURE";
export const SAVE_ECONOMICSPARAMETERS_REQUEST =
  "SAVE_ECONOMICSPARAMETERS_REQUEST";
export const SAVE_ECONOMICSPARAMETERS_SUCCESS =
  "SAVE_ECONOMICSPARAMETERS_SUCCESS";
export const SAVE_ECONOMICSPARAMETERS_FAILURE =
  "SAVE_ECONOMICSPARAMETERS_FAILURE";
export const FETCH_COSTSREVENUESHEADERS_REQUEST =
  "FETCH_COSTSREVENUESHEADERS_REQUEST";
export const FETCH_COSTSREVENUESHEADERS_SUCCESS =
  "FETCH_COSTSREVENUESHEADERS_SUCCESS";
export const FETCH_COSTSREVENUESHEADERS_FAILURE =
  "FETCH_COSTSREVENUESHEADERS_FAILURE";
export const PERSIST_COSTSREVENUESHEADERSSELECTOPTION_SUCCESS =
  "PERSIST_COSTSREVENUESHEADERSSELECTOPTION_SUCCESS";
export const PERSIST_COSTSREVENUESHEADERSSELECTOPTION_FAILURE =
  "PERSIST_COSTSREVENUESHEADERSSELECTOPTION_FAILURE";

export const FETCH_ECONOMICSPARAMETERSHEADERS_REQUEST =
  "FETCH_ECONOMICSPARAMETERSHEADERS_REQUEST";
export const FETCH_ECONOMICSPARAMETERSHEADERS_SUCCESS =
  "FETCH_ECONOMICSPARAMETERSHEADERS_SUCCESS";
export const FETCH_ECONOMICSPARAMETERSHEADERS_FAILURE =
  "FETCH_ECONOMICSPARAMETERSHEADERS_FAILURE";

export const PERSIST_ECONOMICSPARAMETERSHEADERSSELECTOPTION_SUCCESS =
  "PERSIST_ECONOMICSPARAMETERSHEADERSSELECTOPTION_SUCCESS";
export const PERSIST_ECONOMICSPARAMETERSHEADERSSELECTOPTION_FAILURE =
  "PERSIST_ECONOMICSPARAMETERSHEADERSSELECTOPTION_FAILURE";

export const STORED_ECONOMICSDATA_REQUEST = "STORED_ECONOMICSDATA_REQUEST";
export const STORED_ECONOMICSDATA_SUCCESS = "STORED_ECONOMICSDATA_SUCCESS";
export const STORED_ECONOMICSDATA_FAILURE = "STORED_ECONOMICSDATA_FAILURE";

export const STORED_ECONOMICSSENSITIVITIES_REQUEST =
  "STORED_ECONOMICSSENSITIVITIES_REQUEST";
export const STORED_ECONOMICSSENSITIVITIES_SUCCESS =
  "STORED_ECONOMICSSENSITIVITIES_SUCCESS";
export const STORED_ECONOMICSSENSITIVITIES_FAILURE =
  "STORED_ECONOMICSSENSITIVITIES_FAILURE";

export const SAVE_ECONOMICSSENSITIVITIES_REQUEST =
  "SAVE_ECONOMICSSENSITIVITIES_REQUEST";
export const SAVE_ECONOMICSSENSITIVITIES_SUCCESS =
  "SAVE_ECONOMICSSENSITIVITIES_SUCCESS";
export const SAVE_ECONOMICSSENSITIVITIES_FAILURE =
  "SAVE_ECONOMICSSENSITIVITIES_FAILURE";

export const GETECONOMICSSENSITIVITIESBYID_REQUEST =
  "GETECONOMICSSENSITIVITIESBYID_REQUEST";
export const GETECONOMICSSENSITIVITIESBYID_SUCCESS =
  "GETECONOMICSSENSITIVITIESBYID_SUCCESS";
export const GETECONOMICSSENSITIVITIESBYID_FAILURE =
  "GETECONOMICSSENSITIVITIESBYID_FAILURE";

export const RUNECONOMICSANALYSIS_REQUEST = "RUNECONOMICSANALYSIS_REQUEST";
export const RUNECONOMICSANALYSIS_SUCCESS = "RUNECONOMICSANALYSIS_SUCCESS";
export const RUNECONOMICSANALYSIS_FAILURE = "RUNECONOMICSANALYSIS_FAILURE";
export const PERSIST_ECONOMICSDECK = "PERSIST_ECONOMICSDECK";
export const CALCULATE_HEATMAPDATA_REQUEST = "CALCULATE_HEATMAPDATA_REQUEST";
export const CALCULATE_HEATMAPDATA_SUCCESS = "CALCULATE_HEATMAPDATA_SUCCESS";
export const CALCULATE_HEATMAPDATA_FAILURE = "CALCULATE_HEATMAPDATA_FAILURE";

export const SAVE_ECONOMICSRESULTS_REQUEST = "SAVE_ECONOMICSRESULTS_REQUEST";
export const SAVE_ECONOMICSRESULTS_SUCCESS = "SAVE_ECONOMICSRESULTS_SUCCESS";
export const SAVE_ECONOMICSRESULTS_FAILURE = "SAVE_ECONOMICSRESULTS_FAILURE";

export const STORED_ECONOMICSRESULTS_REQUEST =
  "STORED_ECONOMICSRESULTS_REQUEST";
export const STORED_ECONOMICSRESULTS_SUCCESS =
  "STORED_ECONOMICSRESULTS_SUCCESS";
export const STORED_ECONOMICSRESULTS_FAILURE =
  "STORED_ECONOMICSRESULTS_FAILURE";

export const GET_ECONOMICSRESULTSBYID_REQUEST =
  "GET_ECONOMICSRESULTSBYID_REQUEST";
export const GET_ECONOMICSRESULTSBYID_SUCCESS =
  "GET_ECONOMICSRESULTSBYID_SUCCESS";
export const GET_ECONOMICSRESULTSBYID_FAILURE =
  "GET_ECONOMICSRESULTSBYID_FAILURE";

export const updateEconomicsParameterAction = (path: string, value: any) => {
  return {
    type: UPDATE_ECONOMICSPARAMETER,
    payload: {
      path,
      value,
    },
  };
};

export const loadEconomicsWorkflowAction = (name: string) => {
  return {
    type: LOAD_ECONOMICS_WORKFLOW,
    payload: {
      name,
    },
  };
};

export const fetchStoredCostsRevenuesHeadersRequestAction = () => {
  return {
    type: FETCH_COSTSREVENUESHEADERS_REQUEST,
  };
};

export const fetchStoredCostsRevenuesHeadersSuccessAction = () => {
  return {
    type: FETCH_COSTSREVENUESHEADERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredCostsRevenuesDataFailureAction = () => {
  return {
    type: FETCH_COSTSREVENUESHEADERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const persistCostsRevHeadersSelectOptionSuccessAction = () => {
  return {
    type: PERSIST_COSTSREVENUESHEADERSSELECTOPTION_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const persistCostsRevDataFaiSelectOptionFailureAction = () => {
  return {
    type: PERSIST_COSTSREVENUESHEADERSSELECTOPTION_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveCostsRevenuesRequestAction = (
  workflowProcess: IAllWorkflows["wrkflwPrcss"],
  reducer: ReducersType
) => {
  return {
    type: SAVE_COSTSREVENUES_REQUEST,
    payload: { workflowProcess, reducer },
    meta: { showSpinner: true, message: "Saving costs & revenues..." },
  };
};

export const saveCostsRevenuesSuccessAction = () => {
  return {
    type: SAVE_COSTSREVENUES_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveCostsRevenuesFailureAction = () => {
  return {
    type: SAVE_COSTSREVENUES_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredEconomicsParametersHeadersRequestAction = () => {
  return {
    type: FETCH_ECONOMICSPARAMETERSHEADERS_REQUEST,
  };
};

export const fetchStoredEconomicsParametersHeadersSuccessAction = () => {
  return {
    type: FETCH_ECONOMICSPARAMETERSHEADERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredEconomicsParametersDataFailureAction = () => {
  return {
    type: FETCH_ECONOMICSPARAMETERSHEADERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const persistEconomicsParHeadersSelectOptionSuccessAction = () => {
  return {
    type: PERSIST_ECONOMICSPARAMETERSHEADERSSELECTOPTION_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const persistEconomicsParDataFaiSelectOptionFailureAction = () => {
  return {
    type: PERSIST_ECONOMICSPARAMETERSHEADERSSELECTOPTION_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveEconomicsParametersRequestAction = (
  workflowProcess: IAllWorkflows["wrkflwPrcss"],
  reducer: ReducersType
) => {
  return {
    type: SAVE_ECONOMICSPARAMETERS_REQUEST,
    payload: { workflowProcess, reducer },
    meta: { showSpinner: true, message: "Saving economics parameters..." },
  };
};

export const saveEconomicsParametersSuccessAction = () => {
  return {
    type: SAVE_ECONOMICSPARAMETERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveEconomicsParametersFailureAction = () => {
  return {
    type: SAVE_ECONOMICSPARAMETERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredEconomicsDataRequestAction = (projectId: string) => {
  return {
    type: STORED_ECONOMICSDATA_REQUEST,
    payload: { projectId },
    meta: { showSpinner: true, message: "Loading economics data..." },
  };
};

export const fetchStoredEconomicsDataSuccessAction = () => {
  return {
    type: STORED_ECONOMICSDATA_SUCCESS,
    payload: { facilitiesInputDeckStored: [], forecastInputDeckStored: [] },
  };
};

export const fetchStoredEconomicsDataFailureAction = () => {
  return {
    type: STORED_ECONOMICSDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredEconomicsSensitivitiesRequestAction = (
  projectId: string,
  shouldShowSpinner: boolean
) => {
  return {
    type: STORED_ECONOMICSSENSITIVITIES_REQUEST,
    payload: { projectId },
    meta: {
      showSpinner: shouldShowSpinner,
      message: "Loading economics sensitivities...",
    },
  };
};

export const fetchStoredEconomicsSensitivitiesSuccessAction = () => {
  return {
    type: STORED_ECONOMICSSENSITIVITIES_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredEconomicsSensitivitiesFailureAction = () => {
  return {
    type: STORED_ECONOMICSSENSITIVITIES_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveEconomicsSensitivitiesRequestAction = (
  workflowProcess: IEconomicsWorkflows["wkPs"],
  reducer: ReducersType,
  analysisName: TEconomicsAnalysesNames
) => {
  return {
    type: SAVE_ECONOMICSSENSITIVITIES_REQUEST,
    payload: { workflowProcess, reducer, analysisName },
    meta: { showSpinner: true, message: "Saving economics sensitivities..." },
  };
};

export const saveEconomicsSensitivitiesSuccessAction = () => {
  return {
    type: SAVE_ECONOMICSSENSITIVITIES_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveEconomicsSensitivitiesFailureAction = () => {
  return {
    type: SAVE_ECONOMICSSENSITIVITIES_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const getEconomicsSensitivitiesByIdRequestAction = (
  workflowProcess: IEconomicsWorkflows["wkPs"],
  reducer: ReducersType
) => {
  return {
    type: GETECONOMICSSENSITIVITIESBYID_REQUEST,
    payload: { workflowProcess, reducer },
    meta: { showSpinner: true, message: "Loading economics sensitivities..." },
  };
};

export const getEconomicsSensitivitiesByIdSuccessAction = () => {
  return {
    type: GETECONOMICSSENSITIVITIESBYID_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const getEconomicsSensitivitiesByIdFailureAction = () => {
  return {
    type: GETECONOMICSSENSITIVITIESBYID_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const runEconomicsAnalysisRequestAction = (
  workflowProcess: IEconomicsWorkflows["wkPs"],
  analysisName: TEconomicsAnalysesNames,
  analysisTitle: TEconomicsAnalysesTitles
) => {
  return {
    type: RUNECONOMICSANALYSIS_REQUEST,
    payload: { workflowProcess, analysisName, analysisTitle },
    meta: { showSpinner: true, message: `Calculating ${analysisTitle}...` },
  };
};

export const runEconomicsAnalysisSuccessAction = () => {
  return {
    type: RUNECONOMICSANALYSIS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const runEconomicsAnalysisFailureAction = () => {
  return {
    type: RUNECONOMICSANALYSIS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const persistEconomicsDeckRequestAction = (
  workflowProcess: IInputWorkflows["wkPs"],
  devValue: TDevScenarioNames,
  rows: IRawRow[],
  isRowsInPayload: boolean
) => {
  return {
    type: PERSIST_ECONOMICSDECK,
    payload: { workflowProcess, devValue, rows },
    meta: { isRowsInPayload },
  };
};

export const calculateHeatMapDataRequestAction = (
  analysisName: TEconomicsAnalysesNames,
  analysisTitle: TEconomicsAnalysesTitles,
  selectedZValue: string
) => {
  return {
    type: CALCULATE_HEATMAPDATA_REQUEST,
    payload: { analysisName, analysisTitle, selectedZValue },
    meta: { showSpinner: true, message: `Calculating map data...` },
  };
};

export const calculateHeatMapDataSuccessAction = () => {
  return {
    type: CALCULATE_HEATMAPDATA_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const calculateHeatMapDataFailureAction = () => {
  return {
    type: CALCULATE_HEATMAPDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveEconomicsResultsRequestAction = () => {
  return {
    type: SAVE_ECONOMICSRESULTS_REQUEST,
    meta: { showSpinner: true, message: "Saving economics results..." },
  };
};

export const saveEconomicsResultsSuccessAction = () => {
  return {
    type: SAVE_ECONOMICSRESULTS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveEconomicsResultsFailureAction = () => {
  return {
    type: SAVE_ECONOMICSRESULTS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredEconomicsResultsRequestAction = (
  projectId: string,
  showSpinner: boolean
) => {
  return {
    type: STORED_ECONOMICSRESULTS_REQUEST,
    payload: { projectId },
    meta: { showSpinner, message: "Loading economics results..." },
  };
};

export const fetchStoredEconomicsResultsSuccessAction = () => {
  return {
    type: STORED_ECONOMICSRESULTS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredEconomicsResultsFailureAction = () => {
  return {
    type: STORED_ECONOMICSRESULTS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const getEconomicsResultsByIdRequestAction = (
  workflowProcess: IEconomicsWorkflows["wkPs"],
  reducer: ReducersType
) => {
  return {
    type: GET_ECONOMICSRESULTSBYID_REQUEST,
    payload: { workflowProcess, reducer },
    meta: { showSpinner: true, message: "Loading economics result..." },
  };
};

export const getEconomicsResultsByIdSuccessAction = () => {
  return {
    type: GET_ECONOMICSRESULTSBYID_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const getEconomicsResultsByIdFailureAction = () => {
  return {
    type: GET_ECONOMICSRESULTSBYID_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};
