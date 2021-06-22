import { chartObjectsNameTitleMap } from "../ChartState/ChartState";
import { IChartObject } from "./../ChartState/ChartStateTypes";

export const PERSIST_CHARTINDEX = "PERSIST_CHARTINDEX";
export const PERSIST_CHARTELEMENTID = "PERSIST_CHARTELEMENTID";
export const SET_CHARTCOLOR = "SET_CHARTCOLOR";
export const SET_CHARTCELLCOLORS = "SET_CHARTCELLCOLORS";
export const SET_CHARTOBJECT = "SET_CHARTOBJECT";
export const UPDATE_CHARTOBJECT = "UPDATE_CHARTOBJECT";
export const RESET_CHART = "RESET_CHART";

export const persistChartIndexAction = (selectedChartIndex: number) => {
  return {
    type: PERSIST_CHARTINDEX,
    payload: {
      selectedChartIndex,
    },
  };
};

export const setSelectedChartObjIdAction = (
  selectedChartObjId: React.Key,
  chartObjName: keyof typeof chartObjectsNameTitleMap
) => {
  return {
    type: PERSIST_CHARTELEMENTID,
    payload: { selectedChartObjId, chartObjName },
  };
};

export const setSolidColorAction = (chartLayoutColor: string) => {
  return {
    type: SET_CHARTCOLOR,
    payload: {
      chartLayoutColor,
    },
  };
};

export const setChartCellColorsAction = (chartSeriesSolidColors: string[]) => {
  return {
    type: SET_CHARTCELLCOLORS,
    payload: {
      chartSeriesSolidColors,
    },
  };
};

export const setChartObjectAction = (selectedChartObj: IChartObject) => {
  return {
    type: SET_CHARTOBJECT,
    payload: selectedChartObj,
  };
};

export const persistChartObjectAction = (selectedChartObj: IChartObject) => {
  return {
    type: UPDATE_CHARTOBJECT,
    payload: selectedChartObj,
  };
};

export const resetChartAction = () => {
  return {
    type: RESET_CHART,
  };
};
