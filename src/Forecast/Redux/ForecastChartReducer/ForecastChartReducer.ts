import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { LOGOUT_REQUEST } from "../../../Application/Redux/Actions/LogoutActions";
import {
  PERSIST_FORECASTCHARTPARAMETER,
  PERSIST_FORECASTCHARTINDEX,
  PERSIST_FORECASTCHARTELEMENTID,
  SET_FORECASTCHARTCOLOR,
  SET_FORECASTCHARTCELLCOLORS,
  SET_FORECASTCHARTOBJECT,
  PERSIST_FORECASTCHARTOBJECT,
  RUN_FORECAST_SUCCESS,
  RUN_FORECAST_FAILURE,
} from "../ForecastActions/ForecastActions";
import forecastState from "../ForecastState/ForecastState";
import { ForecastStateType } from "../ForecastState/ForecastStateTypes";

const forecastReducer = (
  state = forecastState,
  action: IAction
): ForecastStateType => {
  switch (action.type) {
    case PERSIST_FORECASTCHARTPARAMETER: {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
    case RUN_FORECAST_SUCCESS: {
      const { isCumulative } = action.payload;

      if (isCumulative) {
        const currentForecastResult = state["forecastResult"];
        const newForecastResult = [...currentForecastResult, ...action.payload];

        return {
          ...state,
          forecastResult: newForecastResult,
        };
      } else {
        return {
          ...state,
          ...action.payload,
        };
      }
    }
    case RUN_FORECAST_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    case PERSIST_FORECASTCHARTINDEX:
      return {
        ...state,
        ...action.payload,
      };

    case PERSIST_FORECASTCHARTELEMENTID:
      return {
        ...state,
        // selectedChartObjId: {
        //   ...state.selectedChartObjId,
        ...action.payload,
        // },
      };

    case SET_FORECASTCHARTCOLOR:
      return {
        ...state,
        ...action.payload,
      };

    case SET_FORECASTCHARTCELLCOLORS:
      return {
        ...state,
        ...action.payload,
      };

    case SET_FORECASTCHARTOBJECT: {
      const filteredObjects =
        state.forecastChartObjects &&
        state.forecastChartObjects.filter(
          (obj) => obj.forecastChartObjId !== action.payload.id
        );

      return {
        ...state,
        forecastChartObjects: [...filteredObjects, action.payload],
      };
    }

    case PERSIST_FORECASTCHARTOBJECT: {
      const selectedChartObj =
        state.forecastChartObjects &&
        state.forecastChartObjects.find(
          (obj) => obj.forecastChartObjId === action.payload.id
        );

      const updatedSelectedChartObj = {
        ...selectedChartObj,
        ...action.payload,
      };

      const otherObjects =
        state.forecastChartObjects &&
        state.forecastChartObjects.filter(
          (obj) => obj.forecastChartObjId !== action.payload.id
        );

      return {
        ...state,
        forecastChartObjects: [...otherObjects, updatedSelectedChartObj],
      };
    }

    default:
      return state;
  }
};

export default forecastReducer;
