import {
  PERSIST_CHARTINDEX,
  PERSIST_CHARTELEMENTID,
  SET_CHARTCOLOR,
  SET_CHARTCELLCOLORS,
  SET_CHARTELEMENTOBJECT,
  UPDATE_CHARTELEMENTOBJECT,
} from "../ChartActions/ChartActions";
import chartState from "../ChartState/ChartState";

const chartReducer = (state = chartState, action) => {
  switch (action.type) {
    case PERSIST_CHARTINDEX:
      return {
        ...state,
        ...action.payload,
      };

    case PERSIST_CHARTELEMENTID:
      return {
        ...state,
        selectedChartElementId: {
          ...state.selectedChartElementId,
          ...action.payload,
        },
      };

    case SET_CHARTCOLOR:
      return {
        ...state,
        ...action.payload,
      };

    case SET_CHARTCELLCOLORS:
      return {
        ...state,
        ...action.payload,
      };

    case SET_CHARTELEMENTOBJECT:
      const filteredObjects =
        state.chartElementObjects &&
        state.chartElementObjects.filter((obj) => obj.id !== action.payload.id);

      return {
        ...state,
        chartElementObjects: [...filteredObjects, action.payload],
      };

    case UPDATE_CHARTELEMENTOBJECT:
      const selectedChartElement =
        state.chartElementObjects &&
        state.chartElementObjects.find((obj) => obj.id === action.payload.id);

      const updatedSelectedChartElement = {
        ...selectedChartElement,
        ...action.payload,
      };

      const otherObjects =
        state.chartElementObjects &&
        state.chartElementObjects.filter((obj) => obj.id !== action.payload.id);

      return {
        ...state,
        chartElementObjects: [...otherObjects, updatedSelectedChartElement],
      };

    default:
      return { ...state };
  }
};

export default chartReducer;
