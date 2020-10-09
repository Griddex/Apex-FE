export const DATA_TO_STORE = "DATA_TO_STORE";
export const SET_MAINDRAWERMENU = "SET_MAINDRAWERMENU";
export const SET_SUBNAVBARMENU = "SET_SUBNAVBARMENU";
export const SET_WORKFLOWMENU = "SET_WORKFLOWMENU";
export const SET_SUBNAVBARDATA = "SET_SUBNAVBARDATA";
export const ADD_TAB = "ADD_TAB";
export const SET_CURRENTMAINTABVALUE = "SET_CURRENTMAINTABVALUE";
export const SET_CURRENTCONTEXTTABVALUE = "SET_CURRENTCONTEXTTABVALUE";
export const SET_CURRENTSUBCONTEXTTABVALUE = "SET_CURRENTSUBCONTEXTTABVALUE";

export const applicationDataToStoreAction = (name, value) => {
  return {
    type: DATA_TO_STORE,
    payload: {
      name,
      value,
    },
  };
};

export const mainDrawerSetMenuAction = (moduleName) => {
  return {
    type: SET_MAINDRAWERMENU,
    payload: { moduleName },
  };
};

export const subNavbarSetMenuAction = (subModuleName) => {
  return {
    type: SET_SUBNAVBARMENU,
    payload: { subModuleName },
  };
};

export const workflowSetMenuAction = (workflowName) => {
  return {
    type: SET_WORKFLOWMENU,
    payload: { workflowName },
  };
};

export const subNavbarSetDataAction = (subNavbarData) => {
  return {
    type: SET_SUBNAVBARDATA,
    payload: { subNavbarData },
  };
};

export const addTabAction = (newTab, newTabPanel) => {
  return {
    type: ADD_TAB,
    payload: { newTab, newTabPanel },
  };
};

export const setCurrentMainTabValueAction = (currentMainTabValue) => {
  return {
    type: SET_CURRENTMAINTABVALUE,
    payload: { currentMainTabValue },
  };
};

export const setCurrentContextTabValueAction = (currentContextTabValue) => {
  return {
    type: SET_CURRENTCONTEXTTABVALUE,
    payload: { currentContextTabValue },
  };
};

export const setCurrentSubContextTabValueAction = (
  currentSubContextTabValue
) => {
  return {
    type: SET_CURRENTSUBCONTEXTTABVALUE,
    payload: { currentSubContextTabValue },
  };
};
