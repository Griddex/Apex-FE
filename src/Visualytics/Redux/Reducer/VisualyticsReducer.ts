import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { TChartTypes } from "../../Components/Charts/ChartTypes";
import {
  LOAD_VISUALYTICS_WORKFLOW,
  PERSIST_CHARTELEMENTID,
  PERSIST_CHARTINDEX,
  PUT_SELECTCHART,
  PUT_SELECTCHART_SUCCESS,
  RESET_CHART,
  SET_CHARTCELLCOLORS,
  SET_CHARTCOLOR,
  SET_CHARTOBJECT,
  TRANSFORM_CHARTDATA,
  TRANSFORM_CHARTDATA_FAILURE,
  TRANSFORM_CHARTDATA_SUCCESS,
  UPDATE_CHARTOBJECT,
  RESET_CHART_DATA,
} from "../Actions/VisualyticsActions";
import visualyticsState from "../State/VisualyticsState";
import { IVisualyticsState } from "../State/VisualyticsStateTypes";

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

    case LOAD_VISUALYTICS_WORKFLOW: {
      const { name, trueOrFalse } = action.payload;
      return {
        ...state,
        [name]: trueOrFalse,
      };
    }

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

    case PUT_SELECTCHART: {
      const { selectedOptionTitle, selectedForecastChartOption } =
        action.payload;

      return {
        ...state,
        [selectedOptionTitle]: selectedForecastChartOption,
      };
    }

    case PUT_SELECTCHART_SUCCESS: {
      const { reducer, selectedChartOptionTitle, chartOption } = action.payload;

      if (reducer === "visualyticsReducer") {
        return {
          ...state,
          [selectedChartOptionTitle]: chartOption,
        };
      } else {
        return state;
      }
    }

    case TRANSFORM_CHARTDATA_SUCCESS: {
      const {
        reducer,
        chartType,
        chartData,
        xValueCategories,
        lineOrScatter,
        isYear,
        workflowCategory,
      } = action.payload;

      if (reducer === "visualyticsReducer") {
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

      if (reducer === "visualyticsReducer") {
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

    case RESET_CHART: {
      return visualyticsState;
    }

    default:
      return state;
  }
};

export default visualyticsReducer;
