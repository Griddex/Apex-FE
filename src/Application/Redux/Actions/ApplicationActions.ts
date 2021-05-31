import { TUserMatchObject } from "../../../Import/Routes/Common/Workflows/MatchHeadersTypes";
import { ITabData } from "../../Components/Tabs/TabsWrapperTypes";
import { ReducersType } from "../../Components/Workflows/WorkflowTypes";

export const UPDATE_SELECTEDIDTITLE = "UPDATE_SELECTEDIDTITLE";
export const SET_MAINDRAWERMENU = "SET_MAINDRAWERMENU";
export const SET_SUBNAVBARMENU = "SET_SUBNAVBARMENU";
export const SET_WORKFLOWMENU = "SET_WORKFLOWMENU";
export const SET_SUBNAVBARDATA = "SET_SUBNAVBARDATA";
export const ADD_TAB = "ADD_TAB";
export const SET_CURRENTMAINTABVALUE = "SET_CURRENTMAINTABVALUE";
export const FETCH_MATCHOBJECT_REQUEST = "FETCH_MATCHOBJECT_REQUEST";
export const FETCH_MATCHOBJECT_SUCCESS = "FETCH_MATCHOBJECT_SUCCESS";
export const FETCH_MATCHOBJECT_FAILURE = "FETCH_MATCHOBJECT_FAILURE";
export const SAVE_USERMATCH_ALL = "SAVE_USERMATCH_ALL";
export const GET_TABLEDATABYID_REQUEST = "GET_TABLEDATABYID_REQUEST";
export const GET_TABLEDATABYID_SUCCESS = "GET_TABLEDATABYID_SUCCESS";
export const GET_TABLEDATABYID_FAILURE = "GET_TABLEDATABYID_FAILURE";

export const persistSelectedIdTitleAction = (
  reducer: ReducersType,
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

export const addTabAction = (newTab: ITabData, newTabPanel: string[]) => {
  return {
    type: ADD_TAB,
    payload: { newTab, newTabPanel },
  };
};

export const setCurrentMainTabValueAction = (currentMainTabValue: number) => {
  return {
    type: SET_CURRENTMAINTABVALUE,
    payload: { currentMainTabValue },
  };
};

export const fetchMatchObjectRequestAction = () => {
  return {
    type: FETCH_MATCHOBJECT_REQUEST,
    payload: {},
    meta: { showSpinner: true, message: "Fetching user matches..." },
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

export const getTableDataByIdRequestAction = () => {
  return {
    type: GET_TABLEDATABYID_REQUEST,
    payload: {},
    meta: { showSpinner: true, message: "Fetching table data..." },
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
