import { IIdNameTitlePathOption } from "../../../Application/Components/Selects/SelectItemsType";
import {
  ReducersType,
  TAllWorkflowCategories,
  TAllWorkflowProcesses,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { TChartStory } from "../../Components/Charts/ChartTypes";
import { chartObjectsNameTitleMap } from "../State/VisualyticsState";
import { IChartObject } from "../State/VisualyticsStateTypes";

export const UPDATE_VISUALYTICSPARAMETER = "UPDATE_VISUALYTICSPARAMETER";
export const UPDATE_VISUALYTICSPARAMETERS = "UPDATE_VISUALYTICSPARAMETERS";
export const PERSIST_CHARTINDEX = "PERSIST_CHARTINDEX";
export const LOAD_VISUALYTICS_WORKFLOW = "LOAD_VISUALYTICS_WORKFLOW";

export const SAVE_VISUALYTICS_REQUEST = "SAVE_VISUALYTICS_REQUEST";
export const SAVE_VISUALYTICS_SUCCESS = "SAVE_VISUALYTICS_SUCCESS";
export const SAVE_VISUALYTICS_FAILURE = "SAVE_VISUALYTICS_FAILURE";

export const STORED_VISUALYTICSDATA_REQUEST = "STORED_VISUALYTICSDATA_REQUEST";
export const STORED_VISUALYTICSDATA_SUCCESS = "STORED_VISUALYTICSDATA_SUCCESS";
export const STORED_VISUALYTICSDATA_FAILURE = "STORED_VISUALYTICSDATA_FAILURE";

export const GET_VISUALYTICS_CHARTDATA_REQUEST =
  "GET_VISUALYTICS_CHARTDATA_REQUEST";
export const GET_VISUALYTICS_CHARTDATA_SUCCESS =
  "GET_VISUALYTICS_CHARTDATA_SUCCESS";
export const GET_VISUALYTICS_CHARTDATA_FAILURE =
  "GET_VISUALYTICS_CHARTDATA_FAILURE";

export const PERSIST_CHARTELEMENTID = "PERSIST_CHARTELEMENTID";
export const SET_CHARTCOLOR = "SET_CHARTCOLOR";
export const SET_CHARTCELLCOLORS = "SET_CHARTCELLCOLORS";
export const SET_CHARTOBJECT = "SET_CHARTOBJECT";
export const UPDATE_CHARTOBJECT = "UPDATE_CHARTOBJECT";
export const RESET_VISUALYTICS = "RESET_VISUALYTICS";

export const PUT_SELECTCHART = "PUT_SELECTCHART";
export const PUT_SELECTCHART_SUCCESS = "PUT_SELECTCHART_SUCCESS";
export const PUT_SELECTCHART_FAILURE = "PUT_SELECTCHART_FAILURE";

export const VISUALYTICS_UPDATE_CHARTCATEGORY =
  "VISUALYTICS_UPDATE_CHARTCATEGORY";
export const VISUALYTICS_REMOVE_CHARTCATEGORY =
  "VISUALYTICS_REMOVE_CHARTCATEGORY";

export const VISUALYTICS_UPDATE_DRAGITEMS = "VISUALYTICS_UPDATE_DRAGITEMS";
export const VISUALYTICS_UPDATE_HASDROPPED = "VISUALYTICS_UPDATE_HASDROPPED";

export const VISUALYTICS_TREEVIEWKEYS_REQUEST =
  "VISUALYTICS_TREEVIEWKEYS_REQUEST";
export const VISUALYTICS_TREEVIEWKEYS_SUCCESS =
  "VISUALYTICS_TREEVIEWKEYS_SUCCESS";
export const VISUALYTICS_TREEVIEWKEYS_FAILURE =
  "VISUALYTICS_TREEVIEWKEYS_FAILURE";

export const RESET_CHART_DATA = "RESET_CHART_DATA";

export const TRANSFORM_VISUALYTICS_CHARTDATA =
  "TRANSFORM_VISUALYTICS_CHARTDATA";
export const TRANSFORM_VISUALYTICS_CHARTDATA_SUCCESS =
  "TRANSFORM_VISUALYTICS_CHARTDATA_SUCCESS";
export const TRANSFORM_VISUALYTICS_CHARTDATA_FAILURE =
  "TRANSFORM_VISUALYTICS_CHARTDATA_FAILURE";

export const RESET_VISUALYTICS_CHARTWORKFLOWS =
  "RESET_VISUALYTICS_CHARTWORKFLOWS";

export const updateVisualyticsParameterAction = (path: string, value: any) => {
  return {
    type: UPDATE_VISUALYTICSPARAMETER,
    payload: {
      path,
      value,
    },
  };
};

export const updateVisualyticsParametersAction = (
  updateObj: Record<string, any>
) => {
  return {
    type: UPDATE_VISUALYTICSPARAMETERS,
    payload: {
      updateObj,
    },
  };
};

export const loadVisualyticsWorkflowAction = (
  name: string,
  trueOrFalse: boolean
) => {
  return {
    type: LOAD_VISUALYTICS_WORKFLOW,
    payload: {
      name,
      trueOrFalse,
    },
  };
};

export const transformVisualyticsChartDataAction = (
  reducer: ReducersType,
  chartStory: TChartStory,
  pipeline: "put" | "request"
) => {
  return {
    type: TRANSFORM_VISUALYTICS_CHARTDATA,
    payload: {
      reducer,
      chartStory,
      pipeline,
    },
  };
};

export const transformVisualyticsChartDataSuccessAction = () => {
  return {
    type: TRANSFORM_VISUALYTICS_CHARTDATA_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const transformVisualyticsChartDataFailureAction = () => {
  return {
    type: TRANSFORM_VISUALYTICS_CHARTDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const persistChartIndexAction = (selectedChartIndex: number) => {
  return {
    type: PERSIST_CHARTINDEX,
    payload: {
      selectedChartIndex,
    },
  };
};

export const fetchStoredVisualyticsDataRequestAction = (projectId: string) => {
  return {
    type: STORED_VISUALYTICSDATA_REQUEST,
    payload: {
      projectId,
    },
  };
};

export const fetchStoredVisualyticsDataSuccessAction = () => {
  return {
    type: STORED_VISUALYTICSDATA_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchStoredVisualyticsDataFailureAction = () => {
  return {
    type: STORED_VISUALYTICSDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveVisualyticsRequestAction = (
  workflowProcess: TAllWorkflowProcesses,
  titleDesc: Record<string, string>
) => {
  const { title } = titleDesc;
  const reducer = "visualyticsReducer";

  return {
    type: SAVE_VISUALYTICS_REQUEST,
    payload: { workflowProcess, reducer, titleDesc },
    meta: { message: `Saving ${title}...` },
  };
};

export const saveVisualyticsSuccessAction = () => {
  return {
    type: SAVE_VISUALYTICS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const saveVisualyticsFailureAction = () => {
  return {
    type: SAVE_VISUALYTICS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const getVisualyticsChartDataRequestAction = (
  reducer: ReducersType,
  workflowCategory: TAllWorkflowCategories
) => {
  return {
    type: GET_VISUALYTICS_CHARTDATA_REQUEST,
    payload: { reducer, workflowCategory },
  };
};

export const getVisualyticsChartDataSuccessAction = () => {
  return {
    type: GET_VISUALYTICS_CHARTDATA_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const getVisualyticsChartDataFailureAction = () => {
  return {
    type: GET_VISUALYTICS_CHARTDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const putSelectChartOptionAction = (payload: any) => {
  return {
    type: PUT_SELECTCHART,
    payload,
  };
};

export const putSelectChartOptionSuccessAction = () => {
  return {
    type: PUT_SELECTCHART_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const putSelectChartOptionFailureAction = () => {
  return {
    type: PUT_SELECTCHART_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const setSelectedChartObjIdAction = (
  selectedChartObjId: React.Key,
  chartObjName: keyof typeof chartObjectsNameTitleMap
) => {
  return {
    type: PERSIST_CHARTELEMENTID,
    payload: { selectedChartObjId, chartObjName },
  };
};

export const setSolidColorAction = (chartLayoutColor: string) => {
  return {
    type: SET_CHARTCOLOR,
    payload: {
      chartLayoutColor,
    },
  };
};

export const setChartCellColorsAction = (chartSeriesSolidColors: string[]) => {
  return {
    type: SET_CHARTCELLCOLORS,
    payload: {
      chartSeriesSolidColors,
    },
  };
};

export const setChartObjectAction = (selectedChartObj: IChartObject) => {
  return {
    type: SET_CHARTOBJECT,
    payload: selectedChartObj,
  };
};

export const persistChartObjectAction = (selectedChartObj: IChartObject) => {
  return {
    type: UPDATE_CHARTOBJECT,
    payload: selectedChartObj,
  };
};

export const fetchVisualyticsTreeviewKeysRequestAction = (
  reducer: ReducersType,
  idTitleDescIsSaved?: Record<string, any>
) => {
  return {
    type: VISUALYTICS_TREEVIEWKEYS_REQUEST,
    payload: {
      reducer,
      idTitleDescIsSaved,
      status: 0,
    },
  };
};

export const fetchVisualyticsTreeviewKeysSuccessAction = () => {
  return {
    type: VISUALYTICS_TREEVIEWKEYS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchVisualyticsTreeviewKeysFailureAction = () => {
  return {
    type: VISUALYTICS_TREEVIEWKEYS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const updateVisualyticsChartCategoryAction = (
  categoryOptionTitle: string,
  item: any
) => {
  return {
    type: VISUALYTICS_UPDATE_CHARTCATEGORY,
    payload: { categoryOptionTitle, item },
  };
};

export const updateVisualyticsDragItemsAction = (
  reducer: ReducersType,
  categoryTitle: string,
  categoryDragItemsTitle: string,
  item: IIdNameTitlePathOption
) => {
  return {
    type: VISUALYTICS_UPDATE_DRAGITEMS,
    payload: { reducer, categoryTitle, categoryDragItemsTitle, item },
  };
};

export const updateVisualyticsHasDroppedAction = (
  reducer: ReducersType,
  categoryTitle: string,
  categoryHasDroppedTitle: string,
  id: string,
  hasDropped: boolean
) => {
  return {
    type: VISUALYTICS_UPDATE_HASDROPPED,
    payload: {
      reducer,
      categoryTitle,
      categoryHasDroppedTitle,
      id,
      hasDropped,
    },
  };
};

export const removeVisualyticsChartCategoryAction = (
  categoryOptionTitle: string,
  id: string
) => {
  return {
    type: VISUALYTICS_REMOVE_CHARTCATEGORY,
    payload: { categoryOptionTitle, id },
  };
};

export const resetChartDataAction = (
  reducer: ReducersType,
  workflowCategory: TAllWorkflowCategories
) => {
  return {
    type: RESET_CHART_DATA,
    payload: { reducer, workflowCategory },
  };
};

export const resetVisualyticsChartsWorkflowsAction = () => {
  return {
    type: RESET_VISUALYTICS_CHARTWORKFLOWS,
  };
};

export const resetVisualyticsAction = () => {
  return {
    type: RESET_VISUALYTICS,
  };
};

//resetVisualyticsChartsWorkflowsAction
