import omit from "lodash.omit";
import set from "lodash.set";
import { TAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  GET_TABLEDATABYID_FAILURE,
  GET_TABLEDATABYID_SUCCESS,
} from "../../../Application/Redux/Actions/ApplicationActions";
import {
  IMPORTFILE_INITIALIZATION,
  PERSIST_CHOSENAPPLICATIONHEADERS,
  PERSIST_CHOSENAPPLICATIONHEADERSINDICES,
  PERSIST_CHOSENAPPLICATIONUNITINDICES,
  PERSIST_CHOSENAPPLICATIONUNITS,
  PERSIST_COLUMNNAMETABLEDATA,
  PERSIST_FILE,
  PERSIST_FILEHEADERS,
  PERSIST_FILEHEADERSMATCH,
  PERSIST_FILEUNITSANDUNIQUEUNITS,
  PERSIST_FILEUNITSMATCH,
  PERSIST_TABLEDATA,
  PERSIST_TABLEROLENAMES,
  PERSIST_VARIABLEUNITS,
  PERSIST_WORKSHEET,
  PERSIST_WORKSHEETNAMES,
} from "../../../Import/Redux/Actions/InputActions";
import { TChartTypes } from "../../Components/Charts/ChartTypes";
import {
  GET_VISUALYTICS_CHARTDATA_SUCCESS,
  LOAD_VISUALYTICS_WORKFLOW,
  PERSIST_CHARTELEMENTID,
  PERSIST_CHARTINDEX,
  PUT_SELECTCHART,
  PUT_SELECTCHART_SUCCESS,
  RESET_VISUALYTICS,
  RESET_CHART_DATA,
  RESET_VISUALYTICS_CHARTWORKFLOWS,
  SET_CHARTCELLCOLORS,
  SET_CHARTCOLOR,
  SET_CHARTOBJECT,
  STORED_VISUALYTICSDATA_FAILURE,
  STORED_VISUALYTICSDATA_SUCCESS,
  TRANSFORM_VISUALYTICS_CHARTDATA_SUCCESS,
  UPDATE_CHARTOBJECT,
  UPDATE_VISUALYTICSPARAMETER,
  UPDATE_VISUALYTICSPARAMETERS,
  VISUALYTICS_REMOVE_CHARTCATEGORY,
  VISUALYTICS_TREEVIEWKEYS_FAILURE,
  VISUALYTICS_TREEVIEWKEYS_SUCCESS,
  VISUALYTICS_UPDATE_DRAGITEMS,
  VISUALYTICS_UPDATE_HASDROPPED,
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
      const { reducer, selectedOptionTitle, selectedVisualyticsChartOption } =
        action.payload;

      if (reducer === "visualyticsReducer")
        return {
          ...state,
          [selectedOptionTitle]: selectedVisualyticsChartOption,
        };
      else return state;
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

    case GET_VISUALYTICS_CHARTDATA_SUCCESS: {
      const { chartData: visualyticsResults } = action.payload;

      return { ...state, visualyticsResults };
    }

    case TRANSFORM_VISUALYTICS_CHARTDATA_SUCCESS: {
      const {
        reducer,
        workflowCategory,
        chartType,
        chartStory,
        chartData,
        xValueCategories,
      } = action.payload;
      console.log(
        "🚀 ~ file: VisualyticsReducer.ts ~ line 217 ~ xValueCategories",
        xValueCategories
      );

      if (reducer === "visualyticsReducer") {
        return {
          ...state,
          xValueCategories,
          currentChartStory: chartStory,
          [workflowCategory]: {
            ...(state as any)[workflowCategory],
            [chartStory]: {
              ...(state as any)[workflowCategory][chartStory],
              [chartType]: {
                ...(state as any)[workflowCategory][chartStory][
                  chartType as TChartTypes
                ],
                chartData,
              },
            },
          },
        };
      } else {
        return state;
      }
    }

    case RESET_CHART_DATA: {
      const { reducer, workflowCategory } = action.payload;

      const initialWCObj = visualyticsState["visualyticsChartsWorkflows"];

      if (reducer === "visualyticsReducer") {
        return {
          ...state,
          [workflowCategory]: initialWCObj,
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

    case VISUALYTICS_REMOVE_CHARTCATEGORY: {
      const { categoryTitle, id } = action.payload;

      const categoryObj = state["visualyticsCategoryDragItems"][categoryTitle];
      const newCategoryObj = omit(categoryObj, [id]);

      const hasDroppedObj =
        state["visualyticsCategoryHasDropped"][categoryTitle];
      const newHasDroppedObj = omit(hasDroppedObj, [id]);

      return {
        ...state,
        visualyticsCategoryDragItems: {
          ...state["visualyticsCategoryDragItems"],
          [categoryTitle]: newCategoryObj,
        },
        visualyticsCategoryHasDropped: {
          ...state["visualyticsCategoryHasDropped"],
          [categoryTitle]: newHasDroppedObj,
        },
      };
    }

    case VISUALYTICS_UPDATE_DRAGITEMS: {
      const { reducer, categoryTitle, item } = action.payload;

      if (reducer === "visualyticsReducer") {
        return {
          ...state,
          visualyticsCategoryDragItems: {
            ...state["visualyticsCategoryDragItems"],
            [categoryTitle]: {
              ...state["visualyticsCategoryDragItems"][categoryTitle],
              [item.id]: item,
            },
          },
        };
      } else return state;
    }

    case VISUALYTICS_UPDATE_HASDROPPED: {
      const { reducer, categoryTitle, id, hasDropped } = action.payload;

      if (reducer === "visualyticsReducer") {
        return {
          ...state,
          visualyticsCategoryHasDropped: {
            ...state["visualyticsCategoryHasDropped"],
            [categoryTitle]: {
              ...state["visualyticsCategoryHasDropped"][categoryTitle],
              [id]: hasDropped,
            },
          },
        };
      } else return state;
    }

    case RESET_VISUALYTICS_CHARTWORKFLOWS: {
      const {
        selectedVisualyticsChartOption,
        visualyticsChartsWorkflows,
        visualyticsVariableXOptions,
        visualyticsVariableYOptions,
        visualyticsSecondaryVariableYOptions,
        visualyticsVariableZOptions,
        visualyticsVariableROptions,
        showVisualyticsCategoryMembersObj,
        visualyticsCategoryDragItems,
        visualyticsCategoryHasDropped,
      } = visualyticsState;

      return {
        ...state,
        selectedVisualyticsChartOption,
        visualyticsChartsWorkflows,
        visualyticsVariableXOptions,
        visualyticsVariableYOptions,
        visualyticsSecondaryVariableYOptions,
        visualyticsVariableZOptions,
        visualyticsVariableROptions,
        showVisualyticsCategoryMembersObj,
        visualyticsCategoryDragItems,
        visualyticsCategoryHasDropped,
      };
    }

    case RESET_VISUALYTICS: {
      return visualyticsState;
    }

    default:
      return state;
  }
};

export default visualyticsReducer;
