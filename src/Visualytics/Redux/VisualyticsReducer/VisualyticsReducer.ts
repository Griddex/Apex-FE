import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  PERSIST_CHARTELEMENTID,
  PERSIST_CHARTINDEX,
  RESET_CHART,
  SET_CHARTCELLCOLORS,
  SET_CHARTCOLOR,
  SET_CHARTOBJECT,
  UPDATE_CHARTOBJECT,
} from "../VisualyticsActions/VisualyticsActions";
import visualyticsState from "../VisualyticsState/VisualyticsState";
import { IVisualyticsState } from "../VisualyticsState/VisualyticsStateTypes";

const visualyticsReducer = (
  state = visualyticsState,
  action: IAction
): IVisualyticsState => {
  switch (action.type) {
    case PERSIST_CHARTINDEX:
      return {
        ...state,
        ...action.payload,
      };

    case PERSIST_CHARTELEMENTID:
      return {
        ...state,
        ...action.payload,
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

    case SET_CHARTOBJECT: {
      const filteredObjects =
        state.chartObjects &&
        state.chartObjects.filter(
          (obj) => obj.chartObjId !== action.payload.id
        );

      return {
        ...state,
        chartObjects: [...filteredObjects, action.payload],
      };
    }

    case UPDATE_CHARTOBJECT: {
      const selectedChartObj =
        state.chartObjects &&
        state.chartObjects.find((obj) => obj.chartObjId === action.payload.id);

      const updatedSelectedChartObj = {
        ...selectedChartObj,
        ...action.payload,
      };

      const otherObjects =
        state.chartObjects &&
        state.chartObjects.filter(
          (obj) => obj.chartObjId !== action.payload.id
        );

      return {
        ...state,
        chartObjects: [...otherObjects, updatedSelectedChartObj],
      };
    }

    case RESET_CHART: {
      return visualyticsState;
    }

    default:
      return state;
  }
};

export default visualyticsReducer;
