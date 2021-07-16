import set from "lodash.set";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  GET_TABLEDATABYID_SUCCESS,
  GET_TABLEDATABYID_FAILURE,
} from "../../../Application/Redux/Actions/ApplicationActions";
import {
  LOAD_FORECASTRESULTS_WORKFLOW,
  UPDATE_SELECTEDIDTITLE,
  GET_FORECASTRESULTS_CHARTDATA_FAILURE,
  GET_FORECASTRESULTS_CHARTDATA_SUCCESS,
  UPDATE_FORECASTPARAMETER,
  PERSIST_FORECASTCHARTELEMENTID,
  PERSIST_FORECASTCHARTINDEX,
  PERSIST_FORECASTCHARTOBJECT,
  RUN_FORECAST_FAILURE,
  RUN_FORECAST_SUCCESS,
  SAVE_FORECAST_FAILURE,
  SAVE_FORECAST_SUCCESS,
  SET_FORECASTCHARTCELLCOLORS,
  SET_FORECASTCHARTCOLOR,
  SET_FORECASTCHARTOBJECT,
  STORED_FORECASTINGRESULTS_SUCCESS,
  STORED_FORECASTINGRESULTS_FAILURE,
  TREEVIEWKEYS_SUCCESS,
  TREEVIEWKEYS_FAILURE,
  GET_FORECASTDATABYID_FAILURE,
  GET_FORECASTDATABYID_SUCCESS,
  REMOVE_FORECAST,
  RESET_FORECAST,
  RUN_FORECASTECONOMICSAGGREGATION_SUCCESS,
  RUN_FORECASTRESULTSAGGREGATION_SUCCESS,
} from "../Actions/ForecastActions";
import forecastState from "../ForecastState/ForecastState";
import { ForecastStateType } from "../ForecastState/ForecastStateTypes";

const forecastReducer = (
  state = forecastState,
  action: IAction
): ForecastStateType => {
  switch (action.type) {
    case UPDATE_FORECASTPARAMETER: {
      const { path, value } = action.payload;

      const updatedState = set(state, path, value);
      return updatedState;
    }

    case UPDATE_SELECTEDIDTITLE: {
      const { reducer, idTitleObj } = action.payload;

      if (reducer === "forecastReducer") {
        return {
          ...state,
          ...idTitleObj,
        };
      } else {
        return state;
      }
    }

    case LOAD_FORECASTRESULTS_WORKFLOW: {
      const { name, trueOrFalse } = action.payload;
      return {
        ...state,
        [name]: trueOrFalse,
      };
    }

    case RUN_FORECAST_SUCCESS: {
      const { keyVar } = action.payload;

      if (keyVar === "forecastKeys") {
        const { forecastKeys } = action.payload;
        return {
          ...state,
          forecastKeys,
        };
      } else {
        const { forecastTree } = action.payload;
        // const currentForecastResults = state["forecastResults"];
        // const newForecastResults = [...currentForecastResults, forecastTree];

        return {
          ...state,
          forecastTree,
        };
      }
    }

    case RUN_FORECAST_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    case SAVE_FORECAST_SUCCESS: {
      const { selectedForecastingResultsId } = action.payload;

      return {
        ...state,
        selectedForecastingResultsId,
        isForecastResultsSaved: true,
      };
    }

    case SAVE_FORECAST_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    case GET_FORECASTRESULTS_CHARTDATA_SUCCESS: {
      const { forecastResults } = action.payload;

      return {
        ...state,
        forecastResults,
      };
    }

    case GET_FORECASTRESULTS_CHARTDATA_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

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

    case STORED_FORECASTINGRESULTS_SUCCESS: {
      const { forecastResultsStored } = action.payload;
      const wc = "storedDataWorkflows";

      return {
        ...state,
        [wc]: { ...state[wc], forecastResultsStored },
      };
    }

    case STORED_FORECASTINGRESULTS_FAILURE: {
      const { errors } = action.payload;

      return {
        ...state,
        errors,
      };
    }

    case TREEVIEWKEYS_SUCCESS: {
      const { keyVar } = action.payload;

      if (keyVar === "forecastKeys") {
        const { forecastKeys } = action.payload;
        return {
          ...state,
          forecastKeys,
        };
      } else {
        const { forecastTree } = action.payload;

        return {
          ...state,
          forecastTree,
        };
      }
    }

    case TREEVIEWKEYS_FAILURE: {
      const { errors } = action.payload;

      return {
        ...state,
        errors,
      };
    }

    case GET_FORECASTDATABYID_SUCCESS: {
      const { selectedForecastData } = action.payload;

      return {
        ...state,
        selectedForecastData,
      };
    }

    case GET_FORECASTDATABYID_FAILURE: {
      const { errors } = action.payload;

      return {
        ...state,
        errors,
      };
    }

    case REMOVE_FORECAST: {
      return {
        ...state,
        forecastResults: [],
        forecastTree: [],
        forecastKeys: [],
        transForecastResult: [],
        selectedForecastingResultsId: "",
        selectedForecastingResultsTitle: "",
      };
    }

    case GET_TABLEDATABYID_SUCCESS: {
      const { reducer, selectedTableData } = action.payload;

      if (reducer === "forecastReducer") {
        const updatedState = set(state, "selectedTableData", selectedTableData);
        return updatedState;
      } else {
        return state;
      }
    }

    case GET_TABLEDATABYID_FAILURE: {
      const { errors } = action.payload;
      return { ...state, errors };
    }

    case RUN_FORECASTRESULTSAGGREGATION_SUCCESS: {
      const { forecastResultsAggregated } = action.payload;
      return { ...state, forecastResultsAggregated };
    }

    case RUN_FORECASTECONOMICSAGGREGATION_SUCCESS: {
      const { forecastEconomicsAggregated } = action.payload;
      return { ...state, forecastEconomicsAggregated };
    }

    case RESET_FORECAST: {
      return forecastState;
    }

    default:
      return state;
  }
};

export default forecastReducer;
