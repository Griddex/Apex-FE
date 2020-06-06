export const UILAYOUT_MAINDRAWER_PRESENT = "UILAYOUT_MAINDRAWER_PRESENT";
export const UILAYOUT_MAINDRAWER_ABSENT = "UILAYOUT_MAINDRAWER_ABSENT";
export const UILAYOUT_MAINDRAWER_EXPAND = "UILAYOUT_MAINDRAWER_EXPAND";
export const UILAYOUT_MAINDRAWER_COLLAPSE = "UILAYOUT_MAINDRAWER_COLLAPSE";
export const UILAYOUT_MAINDRAWERMENU_SET = "UILAYOUT_MAINDRAWERMENU_SET";
export const UILAYOUT_CONTEXTDRAWER_PRESENT = "UILAYOUT_CONTEXTDRAWER_PRESENT";
export const UILAYOUT_CONTEXTDRAWER_ABSENT = "UILAYOUT_CONTEXTDRAWER_ABSENT";
export const UILAYOUT_CONTEXTDRAWER_EXPAND = "UILAYOUT_CONTEXTDRAWER_EXPAND";
export const UILAYOUT_CONTEXTDRAWER_COLLAPSE =
  "UILAYOUT_CONTEXTDRAWER_COLLAPSE";
export const UILAYOUT_CONTEXTDRAWERMENU_SET = "UILAYOUT_CONTEXTDRAWERMENU_SET";
export const UILAYOUT_SUBNAVBAR_PRESENT = "UILAYOUT_SUBNAVBAR_PRESENT";
export const UILAYOUT_SUBNAVBAR_ABSENT = "UILAYOUT_SUBNAVBAR_ABSENT";
export const UILAYOUT_SUBNAVBAR_EXPAND = "UILAYOUT_SUBNAVBAR_EXPAND";
export const UILAYOUT_SUBNAVBAR_COLLAPSE = "UILAYOUT_SUBNAVBAR_COLLAPSE";
export const UILAYOUT_NAVBAR_PRESENT = "UILAYOUT_NAVBAR_PRESENT";
export const UILAYOUT_NAVBAR_ABSENT = "UILAYOUT_NAVBAR_ABSENT";
export const UILAYOUT_NAVBAR_EXPAND = "UILAYOUT_NAVBAR_EXPAND";
export const UILAYOUT_NAVBAR_COLLAPSE = "UILAYOUT_NAVBAR_COLLAPSE";
export const UILAYOUT_LOGOUTMODAL_OPEN = "UILAYOUT_LOGOUTMODAL_OPEN";
export const UILAYOUT_LOGOUTMODAL_CLOSE = "UILAYOUT_LOGOUTMODAL_CLOSE";
export const UILAYOUT_LOGOUT_USER = "UILAYOUT_LOGOUT_USER";
export const UILAYOUT_DEFAULT = "UILAYOUT_DEFAULT";
export const IMPORTLAYOUT_DEFAULT = "IMPORTLAYOUT_DEFAULT";
export const UILAYOUT_LOAD_WORKFLOW = "UILAYOUT_LOAD_WORKFLOW";
export const UILAYOUT_WORKFLOWS_LANDING = "UILAYOUT_WORKFLOWS_LANDING";
export const UILAYOUT_SIMPLEDIALOG_TOGGLE = "UILAYOUT_SIMPLEDIALOG_TOGGLE";

//MAIN DRAWER
export const mainDrawerPresentAction = () => {
  return {
    type: UILAYOUT_MAINDRAWER_PRESENT,
    payload: { mainDrawerPresent: true },
  };
};
export const mainDrawerAbsentAction = () => {
  return {
    type: UILAYOUT_MAINDRAWER_ABSENT,
    payload: { mainDrawerPresent: false },
  };
};
export const expandMainDrawerAction = () => {
  return {
    type: UILAYOUT_MAINDRAWER_EXPAND,
    payload: { expandMainDrawer: true },
  };
};
export const collapseMainDrawerAction = () => {
  return {
    type: UILAYOUT_MAINDRAWER_COLLAPSE,
    payload: { expandMainDrawer: false },
  };
};
export const setMainDrawerMenuAction = (text) => {
  return {
    type: UILAYOUT_MAINDRAWERMENU_SET,
    payload: { mainDrawertext: text },
  };
};

//CONTEXT DRAWER
export const contextDrawerPresentAction = () => {
  return {
    type: UILAYOUT_CONTEXTDRAWER_PRESENT,
    payload: { contextDrawerPresent: true },
  };
};
export const contextDrawerAbsentAction = () => {
  return {
    type: UILAYOUT_CONTEXTDRAWER_ABSENT,
    payload: { contextDrawerPresent: false },
  };
};
export const expandContextDrawerAction = () => {
  return {
    type: UILAYOUT_CONTEXTDRAWER_EXPAND,
    payload: { expandContextDrawer: true },
  };
};
export const collapseContextDrawerAction = () => {
  return {
    type: UILAYOUT_CONTEXTDRAWER_COLLAPSE,
    payload: { expandContextDrawer: false },
  };
};
export const setContextDrawerMenuAction = (text) => {
  return {
    type: UILAYOUT_CONTEXTDRAWERMENU_SET,
    payload: { contextDrawertext: text },
  };
};

//SUBNAVBAR
export const subNavBarPresentAction = () => {
  return {
    type: UILAYOUT_SUBNAVBAR_PRESENT,
    payload: { subNavBarPresent: true },
  };
};
export const subNavBarAbsentAction = () => {
  return {
    type: UILAYOUT_SUBNAVBAR_ABSENT,
    payload: { subNavBarPresent: false },
  };
};
export const expandSubNavBarAction = () => {
  return {
    type: UILAYOUT_SUBNAVBAR_EXPAND,
    payload: { expandSubNavBar: true },
  };
};
export const collapseSubNavBarAction = () => {
  return {
    type: UILAYOUT_SUBNAVBAR_COLLAPSE,
    payload: { expandSubNavBar: false },
  };
};

//NAVBAR
export const navBarPresentAction = () => {
  return {
    type: UILAYOUT_NAVBAR_PRESENT,
    payload: { navBarPresent: true },
  };
};
export const navBarAbsentAction = () => {
  return {
    type: UILAYOUT_NAVBAR_ABSENT,
    payload: { navBarPresent: false },
  };
};
export const expandNavBarAction = () => {
  return {
    type: UILAYOUT_NAVBAR_EXPAND,
    payload: { expandNavBar: true },
  };
};
export const collapseNavBarAction = () => {
  return {
    type: UILAYOUT_NAVBAR_COLLAPSE,
    payload: { expandNavBar: false },
  };
};

//LOGOUT
export const logoutOpenModalAction = () => {
  return {
    type: UILAYOUT_LOGOUTMODAL_OPEN,
    payload: { logoutModalOpen: true },
  };
};
export const logoutCloseModalAction = () => {
  return {
    type: UILAYOUT_LOGOUTMODAL_CLOSE,
    payload: { logoutModalOpen: false },
  };
};
export const logoutUserAction = () => {
  return {
    type: UILAYOUT_LOGOUT_USER,
    payload: { logoutModalOpen: false },
  };
};

export const UILayoutDefaultAction = () => {
  return {
    type: UILAYOUT_DEFAULT,
    payload: {
      mainDrawerPresent: true,
      expandMainDrawer: false,
      navBarPresent: true,
      expandNavBar: false,
    },
  };
};
export const ImportLayoutDefaultAction = () => {
  return {
    type: IMPORTLAYOUT_DEFAULT,
    payload: {
      subNavBarPresent: true,
      expandSubNavBar: false,
      contextDrawerPresent: true,
      expandContextDrawer: false,
    },
  };
};

export const loadWorkflowAction = () => {
  return {
    type: UILAYOUT_LOAD_WORKFLOW,
    payload: { loadWorkflow: true },
  };
};
export const navigateResetWorkflowAction = () => {
  return {
    type: UILAYOUT_WORKFLOWS_LANDING,
    payload: { loadWorkflow: false },
  };
};

export const simpleDialogOpenAction = (trueOrFalse) => {
  return {
    type: UILAYOUT_SIMPLEDIALOG_TOGGLE,
    payload: { simpleDialogOpen: trueOrFalse },
  };
};
