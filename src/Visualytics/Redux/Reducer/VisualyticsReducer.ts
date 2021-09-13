import set from "lodash.set";
import { TAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  GET_TABLEDATABYID_SUCCESS,
  GET_TABLEDATABYID_FAILURE,
} from "../../../Application/Redux/Actions/ApplicationActions";
import {
  IMPORTFILE_INITIALIZATION,
  PERSIST_VARIABLEUNITS,
  PERSIST_FILE,
  PERSIST_WORKSHEETNAMES,
  PERSIST_WORKSHEET,
  PERSIST_FILEHEADERS,
  PERSIST_CHOSENAPPLICATIONHEADERSINDICES,
  PERSIST_CHOSENAPPLICATIONUNITS,
  PERSIST_CHOSENAPPLICATIONUNITINDICES,
  PERSIST_CHOSENAPPLICATIONHEADERS,
  PERSIST_FILEHEADERSMATCH,
  PERSIST_FILEUNITSANDUNIQUEUNITS,
  PERSIST_FILEUNITSMATCH,
  PERSIST_TABLEROLENAMES,
  PERSIST_TABLEDATA,
  PERSIST_COLUMNNAMETABLEDATA,
} from "../../../Import/Redux/Actions/InputActions";
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
  STORED_VISUALYTICSDATA_FAILURE,
  STORED_VISUALYTICSDATA_SUCCESS,
  VISUALYTICS_TREEVIEWKEYS_SUCCESS,
  VISUALYTICS_TREEVIEWKEYS_FAILURE,
  UPDATE_VISUALYTICSPARAMETER,
  UPDATE_VISUALYTICSPARAMETERS,
} from "../Actions/VisualyticsActions";
import visualyticsState from "../State/VisualyticsState";
import { IVisualyticsState } from "../State/VisualyticsStateTypes";

const visualyticsReducer = (
  state = visualyticsState,
  action: IAction
): IVisualyticsState => {
  switch (action.type) {
    case UPDATE_VISUALYTICSPARAMETER: {
      const { path, value } = action.payload;

      const updatedState = set(state, path, value);
      return updatedState;
    }

    case UPDATE_VISUALYTICSPARAMETERS: {
      const { updateObj } = action.payload;

      return {
        ...state,
        ...updateObj,
      };
    }
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

    case IMPORTFILE_INITIALIZATION:
    case PERSIST_VARIABLEUNITS:
    case PERSIST_FILE:
    case PERSIST_WORKSHEETNAMES:
    case PERSIST_WORKSHEET:
    case PERSIST_FILEHEADERS:
    case PERSIST_CHOSENAPPLICATIONHEADERSINDICES:
    case PERSIST_CHOSENAPPLICATIONUNITS:
    case PERSIST_CHOSENAPPLICATIONUNITINDICES:
    case PERSIST_CHOSENAPPLICATIONHEADERS:
    case PERSIST_FILEHEADERSMATCH:
    case PERSIST_FILEUNITSANDUNIQUEUNITS:
    case PERSIST_FILEUNITSMATCH:
    case PERSIST_TABLEROLENAMES:
    case PERSIST_TABLEDATA:
    case PERSIST_COLUMNNAMETABLEDATA: {
      const { reducer, workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as TAllWorkflowProcesses;

      if (reducer === "visualyticsReducer") {
        return {
          ...state,
          visualyticsDataWorkflows: {
            ...state.visualyticsDataWorkflows,
            [workflowProcessDefined]: {
              ...state.visualyticsDataWorkflows[workflowProcessDefined],
              ...action.payload,
            },
          },
        };
      } else {
        return state;
      }
    }

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

    case STORED_VISUALYTICSDATA_SUCCESS: {
      const { visualyticsDeckStored } = action.payload;
      const wc = "storedDataWorkflows";

      return {
        ...state,
        [wc]: { ...state[wc], visualyticsDeckStored },
      };
    }

    case STORED_VISUALYTICSDATA_FAILURE: {
      const { errors } = action.payload;

      return state;
    }

    case GET_TABLEDATABYID_SUCCESS: {
      const { reducer, selectedTableData } = action.payload;

      console.log("In visualytics");

      if (reducer === "visualyticsReducer") {
        return { ...state, selectedTableData };
      } else {
        return state;
      }
    }

    case GET_TABLEDATABYID_FAILURE: {
      const { errors } = action.payload;
      return { ...state };
    }

    case VISUALYTICS_TREEVIEWKEYS_SUCCESS: {
      const { keyVar } = action.payload;

      if (keyVar === "visualyticsTree") {
        const { visualyticsTree } = action.payload;
        return {
          ...state,
          visualyticsTree,
        };
      } else {
        return state;
      }
    }

    case VISUALYTICS_TREEVIEWKEYS_FAILURE: {
      const { errors } = action.payload;

      return {
        ...state,
        errors,
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
