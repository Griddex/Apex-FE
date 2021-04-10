import { forecastChartObjectsNameTitleMap } from "../ForecastState/ForecastState";
import { IForecastChartObject } from "../ForecastState/ForecastStateTypes";

export const PERSIST_FIRSTLEVELFORECASTPROPERTY =
  "PERSIST_FIRSTLEVELFORECASTPROPERTY";
export const RUN_FORECAST_SUCCESS = "RUN_FORECAST_SUCCESS";
export const RUN_FORECAST_FAILURE = "RUN_FORECAST_FAILURE";
export const GET_FORECASTRESULTS_REQUEST = "GET_FORECASTRESULTS_REQUEST";
export const GET_FORECASTRESULTS_SUCCESS = "GET_FORECASTRESULTS_SUCCESS";
export const GET_FORECASTRESULTS_FAILURE = "GET_FORECASTRESULTS_FAILURE";
export const SAVE_FORECAST_SUCCESS = "SAVE_FORECAST_SUCCESS";
export const SAVE_FORECAST_FAILURE = "SAVE_FORECAST_FAILURE";
export const PERSIST_FORECASTCHARTINDEX = "PERSIST_FORECASTCHARTINDEX";
export const PERSIST_FORECASTCHARTELEMENTID = "PERSIST_FORECASTCHARTELEMENTID";
export const SET_FORECASTCHARTCOLOR = "SET_FORECASTCHARTCOLOR";
export const SET_FORECASTCHARTCELLCOLORS = "SET_FORECASTCHARTCELLCOLORS";
export const SET_FORECASTCHARTOBJECT = "SET_FORECASTCHARTOBJECT";
export const PERSIST_FORECASTCHARTOBJECT = "PERSIST_FORECASTCHARTOBJECT";
export const EXISTINGFORECASTINGRESULTS_REQUEST =
  "EXISTINGFORECASTINGRESULTS_REQUEST";
export const EXISTINGFORECASTINGRESULTS_SUCCESS =
  "EXISTINGFORECASTINGRESULTS_SUCCESS";
export const EXISTINGFORECASTINGRESULTS_FAILURE =
  "EXISTINGFORECASTINGRESULTS_FAILURE";
export const TREEVIEWKEYS_REQUEST = "TREEVIEWKEYS_REQUEST";
export const TREEVIEWKEYS_SUCCESS = "TREEVIEWKEYS_SUCCESS";
export const TREEVIEWKEYS_FAILURE = "TREEVIEWKEYS_FAILURE";

export const updateForecastResultsParameterAction = (
  name: string,
  value: any
) => {
  return {
    type: PERSIST_FIRSTLEVELFORECASTPROPERTY,
    payload: { name, value },
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

export const getForecastResultsRequestAction = (
  selectedIds: string[],
  selectedModuleNames: string[],
  selectedModulePaths: string[],
  selectedForecastChartVariable: string
) => {
  return {
    type: GET_FORECASTRESULTS_REQUEST,
    payload: {
      selectedIds,
      selectedModuleNames,
      selectedModulePaths,
      selectedForecastChartVariable,
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

export const getForecastResultsSuccessAction = () => {
  return {
    type: GET_FORECASTRESULTS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const getForecastResultsFailureAction = () => {
  return {
    type: GET_FORECASTRESULTS_FAILURE,
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

export const fetchExistingForecastingResultsRequestAction = (
  projectId: string
) => {
  return {
    type: EXISTINGFORECASTINGRESULTS_REQUEST,
    payload: {
      projectId,
    },
  };
};

export const fetchExistingForecastingResultsSuccessAction = () => {
  return {
    type: EXISTINGFORECASTINGRESULTS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchExistingForecastingResultsFailureAction = () => {
  return {
    type: EXISTINGFORECASTINGRESULTS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchTreeviewKeysRequestAction = () => {
  return {
    type: TREEVIEWKEYS_REQUEST,
    payload: {
      status: 0,
    },
  };
};

export const fetchTreeviewKeysSuccessAction = () => {
  return {
    type: TREEVIEWKEYS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchTreeviewKeysFailureAction = () => {
  return {
    type: TREEVIEWKEYS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};
