export const PERSIST_CHARTINDEX = "PERSIST_CHARTINDEX";
export const PERSIST_CHARTELEMENTID = "PERSIST_CHARTELEMENTID";
export const SET_CHARTCOLOR = "SET_CHARTCOLOR";
export const SET_CHARTCELLCOLORS = "SET_CHARTCELLCOLORS";
export const SET_CHARTELEMENTOBJECT = "SET_CHARTELEMENTOBJECT";
export const UPDATE_CHARTELEMENTOBJECT = "UPDATE_CHARTELEMENTOBJECT";

export const persistChartIndexAction = (currentChartIndex) => {
  return {
    type: PERSIST_CHARTINDEX,
    payload: {
      currentChartIndex,
    },
  };
};

export const setSelectedChartElementIdAction = (selectedChartElementId) => {
  return {
    type: PERSIST_CHARTELEMENTID,
    payload: selectedChartElementId,
  };
};

export const setSolidColorAction = (chartLayoutColor) => {
  return {
    type: SET_CHARTCOLOR,
    payload: {
      chartLayoutColor,
    },
  };
};

export const setChartCellColorsAction = (chartSeriesSolidColors) => {
  return {
    type: SET_CHARTCELLCOLORS,
    payload: {
      chartSeriesSolidColors,
    },
  };
};

export const setChartElementObjectAction = (selectedChartElementObject) => {
  return {
    type: SET_CHARTELEMENTOBJECT,
    payload: selectedChartElementObject,
  };
};

export const updateChartElementObjectAction = (selectedChartElementObject) => {
  return {
    type: UPDATE_CHARTELEMENTOBJECT,
    payload: selectedChartElementObject,
  };
};
