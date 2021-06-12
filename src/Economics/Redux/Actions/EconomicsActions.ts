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
export const UPDATE_ECONOMICS = "UPDATE_ECONOMICS";
export const STOREDCOSTSREVENUESDATA_REQUEST =
  "STOREDCOSTSREVENUESDATA_REQUEST";
export const STOREDCOSTSREVENUESDATA_SUCCESS =
  "STOREDCOSTSREVENUESDATA_SUCCESS";
export const STOREDCOSTSREVENUESDATA_FAILURE =
  "STOREDCOSTSREVENUESDATA_FAILURE";

export const STOREDECONOMICSPARAMETERSDATA_REQUEST =
  "STOREDECONOMICSPARAMETERSDATA_REQUEST";
export const STOREDECONOMICSPARAMETERSDATA_SUCCESS =
  "STOREDECONOMICSPARAMETERSDATA_SUCCESS";
export const STOREDECONOMICSPARAMETERSDATA_FAILURE =
  "STOREDECONOMICSPARAMETERSDATA_FAILURE";

export const SAVECOSTSREVENUES_REQUEST = "SAVECOSTSREVENUES_REQUEST";
export const SAVECOSTSREVENUES_SUCCESS = "SAVECOSTSREVENUES_SUCCESS";
export const SAVECOSTSREVENUES_FAILURE = "SAVECOSTSREVENUES_FAILURE";
export const SAVEECONOMICSPARAMETERS_REQUEST =
  "SAVEECONOMICSPARAMETERS_REQUEST";
export const SAVEECONOMICSPARAMETERS_SUCCESS =
  "SAVEECONOMICSPARAMETERS_SUCCESS";
export const SAVEECONOMICSPARAMETERS_FAILURE =
  "SAVEECONOMICSPARAMETERS_FAILURE";
export const FETCHCOSTSREVENUESHEADERS_REQUEST =
  "FETCHCOSTSREVENUESHEADERS_REQUEST";
export const FETCHCOSTSREVENUESHEADERS_SUCCESS =
  "FETCHCOSTSREVENUESHEADERS_SUCCESS";
export const FETCHCOSTSREVENUESHEADERS_FAILURE =
  "FETCHCOSTSREVENUESHEADERS_FAILURE";
export const PERSISTCOSTSREVENUESHEADERSSELECTOPTION_SUCCESS =
  "PERSISTCOSTSREVENUESHEADERSSELECTOPTION_SUCCESS";
export const PERSISTCOSTSREVENUESHEADERSSELECTOPTION_FAILURE =
  "PERSISTCOSTSREVENUESHEADERSSELECTOPTION_FAILURE";

export const FETCHECONOMICSPARAMETERSHEADERS_REQUEST =
  "FETCHECONOMICSPARAMETERSHEADERS_REQUEST";
export const FETCHECONOMICSPARAMETERSHEADERS_SUCCESS =
  "FETCHECONOMICSPARAMETERSHEADERS_SUCCESS";
export const FETCHECONOMICSPARAMETERSHEADERS_FAILURE =
  "FETCHECONOMICSPARAMETERSHEADERS_FAILURE";

export const PERSISTECONOMICSPARAMETERSHEADERSSELECTOPTION_SUCCESS =
  "PERSISTECONOMICSPARAMETERSHEADERSSELECTOPTION_SUCCESS";
export const PERSISTECONOMICSPARAMETERSHEADERSSELECTOPTION_FAILURE =
  "PERSISTECONOMICSPARAMETERSHEADERSSELECTOPTION_FAILURE";

export const STOREDECONOMICSDATA_REQUEST = "STOREDECONOMICSDATA_REQUEST";
export const STOREDECONOMICSDATA_SUCCESS = "STOREDECONOMICSDATA_SUCCESS";
export const STOREDECONOMICSDATA_FAILURE = "STOREDECONOMICSDATA_FAILURE";

export const STOREDECONOMICSSENSITIVITIES_REQUEST =
  "STOREDECONOMICSSENSITIVITIES_REQUEST";
export const STOREDECONOMICSSENSITIVITIES_SUCCESS =
  "STOREDECONOMICSSENSITIVITIES_SUCCESS";
export const STOREDECONOMICSSENSITIVITIES_FAILURE =
  "STOREDECONOMICSSENSITIVITIES_FAILURE";

export const SAVEECONOMICSSENSITIVITIES_REQUEST =
  "SAVEECONOMICSSENSITIVITIES_REQUEST";
export const SAVEECONOMICSSENSITIVITIES_SUCCESS =
  "SAVEECONOMICSSENSITIVITIES_SUCCESS";
export const SAVEECONOMICSSENSITIVITIES_FAILURE =
  "SAVEECONOMICSSENSITIVITIES_FAILURE";

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
    type: UPDATE_ECONOMICS,
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
    type: FETCHCOSTSREVENUESHEADERS_REQUEST,
  };
};

export const fetchStoredCostsRevenuesHeadersSuccessAction = () => {
  return {
    type: FETCHCOSTSREVENUESHEADERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredCostsRevenuesDataFailureAction = () => {
  return {
    type: FETCHCOSTSREVENUESHEADERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const persistCostsRevHeadersSelectOptionSuccessAction = () => {
  return {
    type: PERSISTCOSTSREVENUESHEADERSSELECTOPTION_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const persistCostsRevDataFaiSelectOptionFailureAction = () => {
  return {
    type: PERSISTCOSTSREVENUESHEADERSSELECTOPTION_FAILURE,
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
    type: SAVECOSTSREVENUES_REQUEST,
    payload: { workflowProcess, reducer },
    meta: { showSpinner: true, message: "Saving costs & revenues..." },
  };
};

export const saveCostsRevenuesSuccessAction = () => {
  return {
    type: SAVECOSTSREVENUES_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveCostsRevenuesFailureAction = () => {
  return {
    type: SAVECOSTSREVENUES_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredEconomicsParametersHeadersRequestAction = () => {
  return {
    type: FETCHECONOMICSPARAMETERSHEADERS_REQUEST,
  };
};

export const fetchStoredEconomicsParametersHeadersSuccessAction = () => {
  return {
    type: FETCHECONOMICSPARAMETERSHEADERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredEconomicsParametersDataFailureAction = () => {
  return {
    type: FETCHECONOMICSPARAMETERSHEADERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const persistEconomicsParHeadersSelectOptionSuccessAction = () => {
  return {
    type: PERSISTECONOMICSPARAMETERSHEADERSSELECTOPTION_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const persistEconomicsParDataFaiSelectOptionFailureAction = () => {
  return {
    type: PERSISTECONOMICSPARAMETERSHEADERSSELECTOPTION_FAILURE,
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
    type: SAVEECONOMICSPARAMETERS_REQUEST,
    payload: { workflowProcess, reducer },
    meta: { showSpinner: true, message: "Saving economics parameters..." },
  };
};

export const saveEconomicsParametersSuccessAction = () => {
  return {
    type: SAVEECONOMICSPARAMETERS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveEconomicsParametersFailureAction = () => {
  return {
    type: SAVEECONOMICSPARAMETERS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredEconomicsDataRequestAction = (projectId: string) => {
  return {
    type: STOREDECONOMICSDATA_REQUEST,
    payload: { projectId },
    meta: { showSpinner: true, message: "Loading economics data..." },
  };
};

export const fetchStoredEconomicsDataSuccessAction = () => {
  return {
    type: STOREDECONOMICSDATA_SUCCESS,
    payload: { facilitiesInputDeckStored: [], forecastInputDeckStored: [] },
  };
};

export const fetchStoredEconomicsDataFailureAction = () => {
  return {
    type: STOREDECONOMICSDATA_FAILURE,
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
    type: STOREDECONOMICSSENSITIVITIES_REQUEST,
    payload: { projectId },
    meta: {
      showSpinner: shouldShowSpinner,
      message: "Loading economics sensitivities...",
    },
  };
};

export const fetchStoredEconomicsSensitivitiesSuccessAction = () => {
  return {
    type: STOREDECONOMICSSENSITIVITIES_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredEconomicsSensitivitiesFailureAction = () => {
  return {
    type: STOREDECONOMICSSENSITIVITIES_FAILURE,
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
    type: SAVEECONOMICSSENSITIVITIES_REQUEST,
    payload: { workflowProcess, reducer, analysisName },
    meta: { showSpinner: true, message: "Saving economics sensitivities..." },
  };
};

export const saveEconomicsSensitivitiesSuccessAction = () => {
  return {
    type: SAVEECONOMICSSENSITIVITIES_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveEconomicsSensitivitiesFailureAction = () => {
  return {
    type: SAVEECONOMICSSENSITIVITIES_FAILURE,
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
