import { forecastChartObjectsNameTitleMap } from "../ForecastState/ForecastState";
import { IForecastChartObject } from "../ForecastState/ForecastStateTypes";

export const PERSIST_FORECASTCHARTINDEX = "PERSIST_FORECASTCHARTINDEX";
export const PERSIST_FORECASTCHARTELEMENTID = "PERSIST_FORECASTCHARTELEMENTID";
export const SET_FORECASTCHARTCOLOR = "SET_FORECASTCHARTCOLOR";
export const SET_FORECASTCHARTCELLCOLORS = "SET_FORECASTCHARTCELLCOLORS";
export const SET_FORECASTCHARTOBJECT = "SET_FORECASTCHARTOBJECT";
export const UPDATE_FORECASTCHARTOBJECT = "UPDATE_FORECASTCHARTOBJECT";

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
