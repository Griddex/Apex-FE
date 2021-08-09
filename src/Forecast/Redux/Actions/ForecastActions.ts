import {
  IAllWorkflows,
  ReducersType,
  TAllWorkflowProcesses,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  FORECAST_TREEVIEWKEYS_REQUEST,
  FORECAST_TREEVIEWKEYS_SUCCESS,
  FORECAST_TREEVIEWKEYS_FAILURE,
} from "../../../Application/Redux/Actions/ApplicationActions";
import { forecastChartObjectsNameTitleMap } from "../ForecastState/ForecastState";
import { IForecastChartObject } from "../ForecastState/ForecastStateTypes";

export const UPDATE_FORECASTPARAMETER = "UPDATE_FORECASTPARAMETER";
export const UPDATE_FORECASTPARAMETERS = "UPDATE_FORECASTPARAMETERS";
export const UPDATE_SELECTEDIDTITLE = "UPDATE_SELECTEDIDTITLE";
export const LOAD_FORECASTRESULTS_WORKFLOW = "LOAD_FORECASTRESULTS_WORKFLOW";
export const RUN_FORECAST_SUCCESS = "RUN_FORECAST_SUCCESS";
export const RUN_FORECAST_FAILURE = "RUN_FORECAST_FAILURE";
export const GET_FORECASTRESULTS_CHARTDATA_REQUEST =
  "GET_FORECASTRESULTS_CHARTDATA_REQUEST";
export const GET_FORECASTRESULTS_CHARTDATA_SUCCESS =
  "GET_FORECASTRESULTS_CHARTDATA_SUCCESS";
export const GET_FORECASTRESULTS_CHARTDATA_FAILURE =
  "GET_FORECASTRESULTS_CHARTDATA_FAILURE";

export const GET_FORECASTRESULTS_QUALITYASSURANCE_REQUEST =
  "GET_FORECASTRESULTS_QUALITYASSURANCE_REQUEST";
export const GET_FORECASTRESULTS_QUALITYASSURANCE_SUCCESS =
  "GET_FORECASTRESULTS_QUALITYASSURANCE_SUCCESS";
export const GET_FORECASTRESULTS_QUALITYASSURANCE_FAILURE =
  "GET_FORECASTRESULTS_QUALITYASSURANCE_FAILURE";

export const SAVE_FORECAST_SUCCESS = "SAVE_FORECAST_SUCCESS";
export const SAVE_FORECAST_FAILURE = "SAVE_FORECAST_FAILURE";
export const PERSIST_FORECASTCHARTINDEX = "PERSIST_FORECASTCHARTINDEX";
export const PERSIST_FORECASTCHARTELEMENTID = "PERSIST_FORECASTCHARTELEMENTID";
export const SET_FORECASTCHARTCOLOR = "SET_FORECASTCHARTCOLOR";
export const SET_FORECASTCHARTCELLCOLORS = "SET_FORECASTCHARTCELLCOLORS";
export const SET_FORECASTCHARTOBJECT = "SET_FORECASTCHARTOBJECT";
export const PERSIST_FORECASTCHARTOBJECT = "PERSIST_FORECASTCHARTOBJECT";
export const STORED_FORECASTINGRESULTS_REQUEST =
  "STORED_FORECASTINGRESULTS_REQUEST";
export const STORED_FORECASTINGRESULTS_SUCCESS =
  "STORED_FORECASTINGRESULTS_SUCCESS";
export const STORED_FORECASTINGRESULTS_FAILURE =
  "STORED_FORECASTINGRESULTS_FAILURE";

export const GET_FORECASTDATABYID_REQUEST = "GET_FORECASTDATABYID_REQUEST";
export const GET_FORECASTDATABYID_SUCCESS = "GET_FORECASTDATABYID_SUCCESS";
export const GET_FORECASTDATABYID_FAILURE = "GET_FORECASTDATABYID_FAILURE";
export const REMOVE_FORECAST = "REMOVE_FORECAST";

export const RUN_FORECASTRESULTSAGGREGATION_REQUEST =
  "RUN_FORECASTRESULTSAGGREGATION_REQUEST";
export const RUN_FORECASTRESULTSAGGREGATION_SUCCESS =
  "RUN_FORECASTRESULTSAGGREGATION_SUCCESS";
export const RUN_FORECASTRESULTSAGGREGATION_FAILURE =
  "RUN_FORECASTRESULTSAGGREGATION_FAILURE";

export const RUN_FORECASTECONOMICSAGGREGATION_REQUEST =
  "RUN_FORECASTECONOMICSAGGREGATION_REQUEST";
export const RUN_FORECASTECONOMICSAGGREGATION_SUCCESS =
  "RUN_FORECASTECONOMICSAGGREGATION_SUCCESS";
export const RUN_FORECASTECONOMICSAGGREGATION_FAILURE =
  "RUN_FORECASTECONOMICSAGGREGATION_FAILURE";

export const RESET_FORECAST = "RESET_FORECAST";

export const updateForecastResultsParameterAction = (
  path: string,
  value: any
) => {
  return {
    type: UPDATE_FORECASTPARAMETER,
    payload: { path, value },
  };
};

export const updateForecastResultsParametersAction = (
  updateObj: Record<string, any>
) => {
  return {
    type: UPDATE_FORECASTPARAMETERS,
    payload: {
      updateObj,
    },
  };
};

export const loadForecastResultsWorkflowAction = (
  name: string,
  trueOrFalse: boolean
) => {
  return {
    type: LOAD_FORECASTRESULTS_WORKFLOW,
    payload: {
      name,
      trueOrFalse,
    },
  };
};

export const runForecastSuccessAction = () => {
  return {
    type: RUN_FORECAST_SUCCESS,
    payload: {
      status: 0,
      data: [],
    },
  };
};

export const runForecastFailureAction = () => {
  return {
    type: RUN_FORECAST_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const getForecastResultsChartDataRequestAction = (
  selectedIds: string[],
  selectedModuleNames: string[],
  selectedModulePaths: string[],
  selectedForecastChartVariable: string
) => {
  return {
    type: GET_FORECASTRESULTS_CHARTDATA_REQUEST,
    payload: {
      selectedIds,
      selectedModuleNames,
      selectedModulePaths,
      selectedForecastChartVariable,
    },
  };
};

export const getForecastResultsChartDataSuccessAction = () => {
  return {
    type: GET_FORECASTRESULTS_CHARTDATA_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const getForecastResultsChartDataFailureAction = () => {
  return {
    type: GET_FORECASTRESULTS_CHARTDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const getForecastResultsQualityAssuranceRequestAction = (
  isMonthly: boolean,
  aggregationLevel: "scenario" | "station",
  selectedModulePaths: string[],
  forecastQualityAssuranceVariable: string
) => {
  return {
    type: GET_FORECASTRESULTS_QUALITYASSURANCE_REQUEST,
    payload: {
      isMonthly,
      aggregationLevel,
      selectedModulePaths,
      forecastQualityAssuranceVariable,
    },
  };
};

export const getForecastResultsQualityAssuranceSuccessAction = () => {
  return {
    type: GET_FORECASTRESULTS_QUALITYASSURANCE_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const getForecastResultsQualityAssuranceFailureAction = () => {
  return {
    type: GET_FORECASTRESULTS_QUALITYASSURANCE_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveForecastSuccessAction = () => {
  return {
    type: SAVE_FORECAST_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveForecastFailureAction = () => {
  return {
    type: SAVE_FORECAST_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const persistForecastChartIndexAction = (
  selectedForecastChartIndex: number
) => {
  return {
    type: PERSIST_FORECASTCHARTINDEX,
    payload: {
      selectedForecastChartIndex,
    },
  };
};

export const setSelectedChartObjIdAction = (
  selectedForecastChartObjId: React.Key,
  forecastChartObjName: keyof typeof forecastChartObjectsNameTitleMap
) => {
  return {
    type: PERSIST_FORECASTCHARTELEMENTID,
    payload: { selectedForecastChartObjId, forecastChartObjName },
  };
};

export const setSolidColorAction = (forecastChartLayoutColor: string) => {
  return {
    type: SET_FORECASTCHARTCOLOR,
    payload: {
      forecastChartLayoutColor,
    },
  };
};

export const setChartCellColorsAction = (
  forecastChartSeriesSolidColors: string[]
) => {
  return {
    type: SET_FORECASTCHARTCELLCOLORS,
    payload: {
      forecastChartSeriesSolidColors,
    },
  };
};

export const setChartObjectAction = (
  selectedForecastChartObj: IForecastChartObject
) => {
  return {
    type: SET_FORECASTCHARTOBJECT,
    payload: selectedForecastChartObj,
  };
};

export const persistChartObjectAction = (
  selectedForecastChartObj: IForecastChartObject
) => {
  return {
    type: PERSIST_FORECASTCHARTOBJECT,
    payload: selectedForecastChartObj,
  };
};

export const fetchStoredForecastingResultsRequestAction = (
  projectId: string
) => {
  return {
    type: STORED_FORECASTINGRESULTS_REQUEST,
    payload: {
      projectId,
    },
  };
};

export const fetchStoredForecastingResultsSuccessAction = () => {
  return {
    type: STORED_FORECASTINGRESULTS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredForecastingResultsFailureAction = () => {
  return {
    type: STORED_FORECASTINGRESULTS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const getForecastDataByIdRequestAction = (
  workflowProcess: TAllWorkflowProcesses,
  switchToRoute: boolean,
  routeUrl?: string
) => {
  return {
    type: GET_FORECASTDATABYID_REQUEST,
    payload: { workflowProcess, switchToRoute, routeUrl },
  };
};

export const getForecastDataByIdSuccessAction = () => {
  return {
    type: GET_FORECASTDATABYID_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const getForecastDataByIdFailureAction = () => {
  return {
    type: GET_FORECASTDATABYID_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const removeCurrentForecastAction = () => {
  return {
    type: REMOVE_FORECAST,
  };
};

export const runForecastResultsAggregationRequestAction = (
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: RUN_FORECASTRESULTSAGGREGATION_REQUEST,
    payload: { workflowProcess },
  };
};

export const runForecastResultsAggregationSuccessAction = () => {
  return {
    type: RUN_FORECASTRESULTSAGGREGATION_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const runForecastResultsAggregationFailureAction = () => {
  return {
    type: RUN_FORECASTRESULTSAGGREGATION_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const runForecastEconomicsAggregationRequestAction = (
  workflowProcess: IAllWorkflows["wrkflwPrcss"]
) => {
  return {
    type: RUN_FORECASTECONOMICSAGGREGATION_REQUEST,
    payload: { workflowProcess },
    meta: {
      showSpinner: true,
      message: "Running forecast aggregation per scenario...",
    },
  };
};

export const runForecastEconomicsAggregationSuccessAction = () => {
  return {
    type: RUN_FORECASTECONOMICSAGGREGATION_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const runForecastEconomicsAggregationFailureAction = () => {
  return {
    type: RUN_FORECASTECONOMICSAGGREGATION_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchForecastTreeviewKeysRequestAction = (
  reducer: ReducersType,
  perspective: "forecastChart" | "forecastAssurance"
) => {
  return {
    type: FORECAST_TREEVIEWKEYS_REQUEST,
    payload: {
      reducer,
      perspective,
      status: 0,
    },
  };
};

export const fetchForecastTreeviewKeysSuccessAction = () => {
  return {
    type: FORECAST_TREEVIEWKEYS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchForecastTreeviewKeysFailureAction = () => {
  return {
    type: FORECAST_TREEVIEWKEYS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};
