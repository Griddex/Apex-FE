export const DATA_TO_STORE = "DATA_TO_STORE";
export const SET_MAINDRAWERMENU = "SET_MAINDRAWERMENU";
export const SET_SUBNAVBARMENU = "SET_SUBNAVBARMENU";
export const SET_WORKFLOWMENU = "SET_WORKFLOWMENU";
export const SET_SUBNAVBARDATA = "SET_SUBNAVBARDATA";

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
