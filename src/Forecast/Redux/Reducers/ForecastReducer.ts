import set from "lodash.set";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  FORECAST_TREEVIEWKEYS_FAILURE,
  FORECAST_TREEVIEWKEYS_SUCCESS,
  GET_TABLEDATABYID_FAILURE,
  GET_TABLEDATABYID_SUCCESS,
} from "../../../Application/Redux/Actions/ApplicationActions";
import { TChartTypes } from "../../../Visualytics/Components/Charts/ChartTypes";
import {
  PUT_SELECTCHART,
  PUT_SELECTCHART_SUCCESS,
  RESET_CHART_DATA,
} from "../../../Visualytics/Redux/Actions/VisualyticsActions";
import {
  GET_FORECASTDATABYID_FAILURE,
  GET_FORECASTDATABYID_SUCCESS,
  GET_FORECASTRESULTS_CHARTDATA_FAILURE,
  GET_FORECASTRESULTS_CHARTDATA_SUCCESS,
  LOAD_FORECASTRESULTS_WORKFLOW,
  PERSIST_FORECASTCHARTELEMENTID,
  PERSIST_FORECASTCHARTINDEX,
  PERSIST_FORECASTCHARTOBJECT,
  PUT_FORECASTRESULTS_CHARTDATA_FAILURE,
  PUT_FORECASTRESULTS_CHARTDATA_SUCCESS,
  REMOVE_FORECAST,
  RESET_FORECAST,
  RUN_FORECASTECONOMICSAGGREGATION_SUCCESS,
  RUN_FORECASTRESULTSAGGREGATION_SUCCESS,
  RUN_FORECAST_FAILURE,
  RUN_FORECAST_SUCCESS,
  SAVE_FORECAST_FAILURE,
  SAVE_FORECAST_SUCCESS,
  SET_FORECASTCHARTCELLCOLORS,
  SET_FORECASTCHARTCOLOR,
  SET_FORECASTCHARTOBJECT,
  STORED_FORECASTINGRESULTS_FAILURE,
  STORED_FORECASTINGRESULTS_SUCCESS,
  TRANSFORM_FORECAST_CHARTDATA_SUCCESS,
  UPDATE_FORECASTPARAMETER,
  UPDATE_FORECASTPARAMETERS,
  UPDATE_FORECASTRESULT_PARAMETERS,
  UPDATE_SELECTEDIDTITLE,
} from "../Actions/ForecastActions";
import forecastState from "../ForecastState/ForecastState";
import { ForecastStateType } from "../ForecastState/ForecastStateTypes";

const forecastReducer = (
  state = forecastState,
  action: IAction
): ForecastStateType => {
  switch (action.type) {
    case UPDATE_FORECASTRESULT_PARAMETERS: {
      const { timeData, forecastResults } = action.payload;
      return {
        ...state,
        timeData,
        forecastResults,
      };
    }

    case UPDATE_FORECASTPARAMETER: {
      const { path, value } = action.payload;

      const updatedState = set(state, path, value);
      return updatedState;
    }

    case UPDATE_FORECASTPARAMETERS: {
      const { updateObj } = action.payload;

      return {
        ...state,
        ...updateObj,
      };
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

      if (keyVar === "xValueCategories") {
        const { xValueCategories } = action.payload;
        return {
          ...state,
          xValueCategories,
        };
      } else {
        const { forecastTree } = action.payload;

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
      const { chartData, xValueCategories } = action.payload;

      return {
        ...state,
        xValueCategories,
        forecastChartsWorkflows: {
          ...state["forecastChartsWorkflows"],
          stackedAreaChart: {
            ...state["forecastChartsWorkflows"]["stackedAreaChart"],
            chartData,
          },
        },
      };
    }

    case GET_FORECASTRESULTS_CHARTDATA_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case PUT_FORECASTRESULTS_CHARTDATA_SUCCESS: {
      const { chartType, forecastResults } = action.payload;
      const data = forecastResults;

      return {
        ...state,
        forecastChartsWorkflows: {
          ...state["forecastChartsWorkflows"],
          [chartType]: { data },
        },
      };
    }

    case PUT_FORECASTRESULTS_CHARTDATA_FAILURE: {
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
        ...action.payload,
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

    case FORECAST_TREEVIEWKEYS_SUCCESS: {
      const { keyVar } = action.payload;

      if (keyVar === "xValueCategories") {
        const { xValueCategories } = action.payload;
        return {
          ...state,
          xValueCategories,
        };
      } else {
        const { forecastTree } = action.payload;
        return {
          ...state,
          forecastTree,
        };
      }
    }

    case FORECAST_TREEVIEWKEYS_FAILURE: {
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
        xValueCategories: [],
        transForecastResult: [],
        selectedForecastingResultsId: "",
        selectedForecastingResultsTitle: "",
      };
    }

    case GET_TABLEDATABYID_SUCCESS: {
      const { reducer, selectedTableData } = action.payload;

      if (reducer === "forecastReducer") {
        const updatedState = set(state, "selectedTableData", selectedTableData);
        console.log("updatedState: ", updatedState);
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

    case PUT_SELECTCHART_SUCCESS: {
      const { reducer, selectedChartOptionTitle, chartOption } = action.payload;

      if (reducer === "forecastReducer") {
        return {
          ...state,
          [selectedChartOptionTitle]: chartOption,
        };
      } else {
        return state;
      }
    }

    case TRANSFORM_FORECAST_CHARTDATA_SUCCESS: {
      const {
        reducer,
        chartType,
        chartData,
        xValueCategories,
        lineOrScatter,
        isYear,
        workflowCategory,
      } = action.payload;

      if (reducer === "forecastReducer") {
        return {
          ...state,
          xValueCategories,
          lineOrScatter,
          isYear,
          [workflowCategory]: {
            ...(state as any)[workflowCategory],
            [chartType]: {
              ...(state as any)[workflowCategory][chartType as TChartTypes],
              chartData,
            },
          },
        };
      } else {
        return state;
      }
    }

    case RESET_CHART_DATA: {
      const { reducer, workflowCategory } = action.payload;

      if (reducer === "forecastReducer") {
        return {
          ...state,
          [workflowCategory]: {
            ...(state as any)[workflowCategory],
            stackedAreaChart: { chartData: [] },
            lineChart: { chartData: [] },
            scatterChart: { chartData: [] },
            doughnutChart: { chartData: [] },
            radarChart: { chartData: [] },
            heatMapChart: { chartData: [] },
          },
        };
      } else {
        return state;
      }
    }

    case PUT_SELECTCHART: {
      const { reducer, selectedOptionTitle, selectedForecastChartOption } =
        action.payload;

      if (reducer === "forecastReducer")
        return {
          ...state,
          [selectedOptionTitle]: selectedForecastChartOption,
        };
      else return state;
    }

    case RESET_FORECAST: {
      return forecastState;
    }

    default:
      return state;
  }
};

export default forecastReducer;
