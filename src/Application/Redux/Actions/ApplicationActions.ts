import { ITabData } from "../../Components/Tabs/TabsWrapperTypes";

export const SET_MAINDRAWERMENU = "SET_MAINDRAWERMENU";
export const SET_SUBNAVBARMENU = "SET_SUBNAVBARMENU";
export const SET_WORKFLOWMENU = "SET_WORKFLOWMENU";
export const SET_SUBNAVBARDATA = "SET_SUBNAVBARDATA";
export const ADD_TAB = "ADD_TAB";
export const SET_CURRENTMAINTABVALUE = "SET_CURRENTMAINTABVALUE";

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
