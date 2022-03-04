import { TUserMatchObject } from "../../../Import/Routes/Common/Workflows/MatchHeadersTypes";
import {
  TReducer,
  TAllWorkflowProcesses,
} from "../../Components/Workflows/WorkflowTypes";
import { IAction } from "./ActionTypes";

export const UPDATE_APPLICATION = "UPDATE_APPLICATION";
export const PUT_DATA = "PUT_DATA";
export const PERSIST_TITLES = "PERSIST_TITLES";
export const UPDATE_SELECTEDIDTITLE = "UPDATE_SELECTEDIDTITLE";
export const SET_MAINDRAWERMENU = "SET_MAINDRAWERMENU";
export const SET_SUBNAVBARMENU = "SET_SUBNAVBARMENU";
export const SET_WORKFLOWMENU = "SET_WORKFLOWMENU";
export const SET_SUBNAVBARDATA = "SET_SUBNAVBARDATA";
export const FETCH_MATCHOBJECT_REQUEST = "FETCH_MATCHOBJECT_REQUEST";
export const FETCH_MATCHOBJECT_SUCCESS = "FETCH_MATCHOBJECT_SUCCESS";
export const FETCH_MATCHOBJECT_FAILURE = "FETCH_MATCHOBJECT_FAILURE";
export const SAVE_USERMATCH_ALL = "SAVE_USERMATCH_ALL";
export const GET_TABLEDATABYID_REQUEST = "GET_TABLEDATABYID_REQUEST";
export const GET_TABLEDATABYID_SUCCESS = "GET_TABLEDATABYID_SUCCESS";
export const GET_TABLEDATABYID_FAILURE = "GET_TABLEDATABYID_FAILURE";
export const RESET_STORE = "RESET_STORE";
export const RESET_APPLICATION = "RESET_APPLICATION";
export const DELETE_DATABYID_REQUEST = "DELETE_DATABYID_REQUEST";
export const DELETE_DATABYID_SUCCESS = "DELETE_DATABYID_SUCCESS";
export const DELETE_DATABYID_FAILURE = "DELETE_DATABYID_FAILURE";
export const UPDATE_DATABYID_REQUEST = "UPDATE_DATABYID_REQUEST";
export const UPDATE_DATABYID_SUCCESS = "UPDATE_DATABYID_SUCCESS";
export const UPDATE_DATABYID_FAILURE = "UPDATE_DATABYID_FAILURE";
export const FORECAST_TREEVIEWKEYS_REQUEST = "FORECAST_TREEVIEWKEYS_REQUEST";
export const FORECAST_TREEVIEWKEYS_SUCCESS = "FORECAST_TREEVIEWKEYS_SUCCESS";
export const FORECAST_TREEVIEWKEYS_FAILURE = "FORECAST_TREEVIEWKEYS_FAILURE";
export const RESET_INPUTDATA_WORKFLOW = "RESET_INPUTDATA_WORKFLOW";

export const updateApplicationParameterAction = (
  nameOrPath: string,
  value: any
) => {
  return {
    type: UPDATE_APPLICATION,
    payload: {
      nameOrPath,
      value,
    },
  };
};

export const persistFormTitlesAction = (
  formName: string,
  formTitlesCollection: string[]
) => {
  return {
    type: PERSIST_TITLES,
    payload: {
      formName,
      formTitlesCollection,
    },
  };
};

export const persistSelectedIdTitleAction = (
  reducer: TReducer,
  idTitleObj: Record<string, string>
) => {
  return {
    type: UPDATE_SELECTEDIDTITLE,
    payload: {
      reducer,
      idTitleObj,
    },
  };
};

export const mainDrawerSetMenuAction = (moduleName: string) => {
  return {
    type: SET_MAINDRAWERMENU,
    payload: { moduleName },
  };
};

export const subNavbarSetMenuAction = (subModuleName: string) => {
  return {
    type: SET_SUBNAVBARMENU,
    payload: { subModuleName },
  };
};

export const workflowSetMenuAction = (workflowName: string) => {
  return {
    type: SET_WORKFLOWMENU,
    payload: { workflowName },
  };
};

export const subNavbarSetDataAction = (subNavbarData: string) => {
  return {
    type: SET_SUBNAVBARDATA,
    payload: { subNavbarData },
  };
};

export const fetchMatchObjectRequestAction = () => {
  return {
    type: FETCH_MATCHOBJECT_REQUEST,
    payload: {},
    meta: { showSpinner: true, message: "Loading user matches..." },
  };
};

export const fetchMatchObjectSuccessAction = () => {
  return {
    type: FETCH_MATCHOBJECT_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchMatchObjectFailureAction = () => {
  return {
    type: FETCH_MATCHOBJECT_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const saveUserMatchAction = (savedMatchObjectAll: TUserMatchObject) => {
  return {
    type: SAVE_USERMATCH_ALL,
    payload: { savedMatchObjectAll },
  };
};

export const getTableDataByIdRequestAction = (
  reducer: TReducer,
  tableDataUrl: string,
  tableTitle: string,
  workflowProcess: TAllWorkflowProcesses,
  tableOrSuccessDialog?: "table" | "success",
  collectionName?: string
) => {
  return {
    type: GET_TABLEDATABYID_REQUEST,
    payload: {
      reducer,
      tableDataUrl,
      tableTitle,
      workflowProcess,
      tableOrSuccessDialog,
      collectionName,
    },

    meta: { showSpinner: true, message: "Loading table data..." },
  };
};

export const getTableDataByIdSuccessAction = () => {
  return {
    type: GET_TABLEDATABYID_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const getTableDataByIdFailureAction = () => {
  return {
    type: GET_TABLEDATABYID_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const deleteDataByIdRequestAction = (
  reducer: TReducer,
  deleteDataUrl: string,
  tableTitle: string,
  fetchStoredRequestAction: () => IAction
) => {
  return {
    type: DELETE_DATABYID_REQUEST,
    payload: {
      reducer,
      deleteDataUrl,
      tableTitle,
      fetchStoredRequestAction,
    },
    meta: { showSpinner: true, message: "Deleting data..." },
  };
};

export const deleteDataByIdSuccessAction = () => {
  return {
    type: DELETE_DATABYID_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const deleteDataByIdFailureAction = () => {
  return {
    type: DELETE_DATABYID_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const updateDataByIdRequestAction = (
  reducer: TReducer,
  updateDataUrl: string,
  titleDesc: Record<string, string>,
  fetchStoredRequestAction: () => IAction
) => {
  return {
    type: UPDATE_DATABYID_REQUEST,
    payload: {
      reducer,
      updateDataUrl,
      titleDesc,
      fetchStoredRequestAction,
    },
    meta: { showSpinner: true, message: "Updating data..." },
  };
};

export const updateDataByIdSuccessAction = () => {
  return {
    type: UPDATE_DATABYID_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const updateDataByIdFailureAction = () => {
  return {
    type: UPDATE_DATABYID_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const resetStoreAction = () => {
  return {
    type: RESET_STORE,
  };
};

export const resetApplicationAction = () => {
  return {
    type: RESET_APPLICATION,
  };
};

export const resetInputDataAction = (reducer: TReducer) => {
  return {
    type: RESET_INPUTDATA_WORKFLOW,
    payload: { reducer },
  };
};
