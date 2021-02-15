import { forecastChartObjectsNameTitleMap } from "../ForecastState/ForecastState";
import { IForecastChartObject } from "../ForecastState/ForecastStateTypes";

export const UPDATE_FORECASTCHARTPARAMETER = "UPDATE_FORECASTCHARTPARAMETER";
export const RUN_FORECAST_SUCCESS = "RUN_FORECAST_SUCCESS";
export const RUN_FORECAST_FAILURE = "RUN_FORECAST_FAILURE";
export const SAVE_FORECAST_SUCCESS = "SAVE_FORECAST_SUCCESS";
export const SAVE_FORECAST_FAILURE = "SAVE_FORECAST_FAILURE";
export const PERSIST_FORECASTCHARTINDEX = "PERSIST_FORECASTCHARTINDEX";
export const PERSIST_FORECASTCHARTELEMENTID = "PERSIST_FORECASTCHARTELEMENTID";
export const SET_FORECASTCHARTCOLOR = "SET_FORECASTCHARTCOLOR";
export const SET_FORECASTCHARTCELLCOLORS = "SET_FORECASTCHARTCELLCOLORS";
export const SET_FORECASTCHARTOBJECT = "SET_FORECASTCHARTOBJECT";
export const UPDATE_FORECASTCHARTOBJECT = "UPDATE_FORECASTCHARTOBJECT";

export const updateForecastChartParameterAction = (
  name: string,
  value: any
) => {
  return {
    type: UPDATE_FORECASTCHARTPARAMETER,
    payload: { name, value },
  };
};

export const runForecastSuccessAction = () => {
  return {
    type: RUN_FORECAST_SUCCESS,
    payload: {
      statusCode: 0,
      data: [],
    },
  };
};

export const runForecastFailureAction = () => {
  return {
    type: RUN_FORECAST_FAILURE,
    payload: {
      statusCode: 0,
      errors: { message: "" },
    },
  };
};

export const saveForecastSuccessAction = () => {
  return {
    type: SAVE_FORECAST_SUCCESS,
    payload: {
      statusCode: 0,
      data: [],
    },
  };
};

export const saveForecastFailureAction = () => {
  return {
    type: SAVE_FORECAST_FAILURE,
    payload: {
      statusCode: 0,
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

export const updateChartObjectAction = (
  selectedForecastChartObj: IForecastChartObject
) => {
  return {
    type: UPDATE_FORECASTCHARTOBJECT,
    payload: selectedForecastChartObj,
  };
};
