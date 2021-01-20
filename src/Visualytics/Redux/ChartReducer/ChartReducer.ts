import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { LOGOUT_REQUEST } from "../../../Application/Redux/Actions/LogoutActions";
import {
  PERSIST_CHARTINDEX,
  PERSIST_CHARTELEMENTID,
  SET_CHARTCOLOR,
  SET_CHARTCELLCOLORS,
  SET_CHARTELEMENTOBJECT,
  UPDATE_CHARTELEMENTOBJECT,
} from "../ChartActions/ChartActions";
import chartState from "../ChartState/ChartState";

const chartReducer = (state = chartState, action: IAction) => {
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

    case SET_CHARTELEMENTOBJECT: {
      const filteredObjects =
        state.chartObjects &&
        state.chartObjects.filter((obj) => obj.id !== action.payload.id);

      return {
        ...state,
        chartObjects: [...filteredObjects, action.payload],
      };
    }
    case UPDATE_CHARTELEMENTOBJECT: {
      const selectedChartElement =
        state.chartObjects &&
        state.chartObjects.find((obj) => obj.id === action.payload.id);

      const updatedSelectedChartElement = {
        ...selectedChartElement,
        ...action.payload,
      };

      const otherObjects =
        state.chartObjects &&
        state.chartObjects.filter((obj) => obj.id !== action.payload.id);

      return {
        ...state,
        chartObjects: [...otherObjects, updatedSelectedChartElement],
      };
    }

    default:
      return state;
  }
};

export default chartReducer;
