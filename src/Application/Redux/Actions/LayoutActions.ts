export const SHOW_MAINDRAWER = "SHOW_MAINDRAWER";
export const HIDE_MAINDRAWER = "HIDE_MAINDRAWER";
export const EXPAND_MAINDRAWER = "EXPAND_MAINDRAWER";
export const COLLAPSE_MAINDRAWER = "COLLAPSE_MAINDRAWER";
export const SHOW_DIALOGCONTEXTDRAWER = "SHOW_DIALOGCONTEXTDRAWER";
export const HIDE_DIALOGCONTEXTDRAWER = "HIDE_DIALOGCONTEXTDRAWER";
export const EXPAND_DIALOGCONTEXTDRAWER = "EXPAND_DIALOGCONTEXTDRAWER";
export const COLLAPSE_DIALOGCONTEXTDRAWER = "COLLAPSE_DIALOGCONTEXTDRAWER";
export const DIALOGCONTEXTDRAWERMENU_SET = "DIALOGCONTEXTDRAWERMENU_SET";

export const SHOW_CONTEXTDRAWER = "SHOW_CONTEXTDRAWER";
export const HIDE_CONTEXTDRAWER = "HIDE_CONTEXTDRAWER";
export const EXPAND_CONTEXTDRAWER = "EXPAND_CONTEXTDRAWER";
export const COLLAPSE_CONTEXTDRAWER = "COLLAPSE_CONTEXTDRAWER";
export const CONTEXTDRAWERMENU_SET = "CONTEXTDRAWERMENU_SET";
export const SHOW_SUBNAVBAR = "SHOW_SUBNAVBAR";
export const HIDE_SUBNAVBAR = "HIDE_SUBNAVBAR";
export const EXPAND_SUBNAVBAR = "EXPAND_SUBNAVBAR";
export const COLLAPSE_SUBNAVBAR = "COLLAPSE_SUBNAVBAR";
export const SHOW_NAVBAR = "SHOW_NAVBAR";
export const HIDE_NAVBAR = "HIDE_NAVBAR";
export const EXPAND_NAVBAR = "EXPAND_NAVBAR";
export const COLLAPSE_NAVBAR = "COLLAPSE_NAVBAR";
export const DEFAULT = "DEFAULT";
export const IMPORTDEFAULT = "IMPORTDEFAULT";
export const LOAD_WORKFLOW = "LOAD_WORKFLOW";
export const WORKFLOWS_LANDING = "WORKFLOWS_LANDING";
export const SIMPLEDIALOG_TOGGLE = "SIMPLEDIALOG_TOGGLE";
export const ACTIVATE_DISABLEDMENUS = "ACTIVATE_DISABLEDMENUS";
export const RESET_LAYOUT = "RESET_LAYOUT";

//MAIN DRAWER
export const mainDrawerExpandAction = () => {
  return {
    type: EXPAND_MAINDRAWER,
    payload: { expandMainDrawer: true },
  };
};
export const mainDrawerCollapseAction = () => {
  return {
    type: COLLAPSE_MAINDRAWER,
    payload: { expandMainDrawer: false },
  };
};

//DIALOG CONTEXT DRAWER

export const dialogContextDrawerExpandAction = () => {
  return {
    type: EXPAND_DIALOGCONTEXTDRAWER,
    payload: { expandDialogContextDrawer: true },
  };
};
export const dialogContextDrawerCollapseAction = () => {
  return {
    type: COLLAPSE_DIALOGCONTEXTDRAWER,
    payload: { expandDialogContextDrawer: false },
  };
};

//CONTEXT DRAWER
export const showContextDrawerAction = () => {
  return {
    type: SHOW_CONTEXTDRAWER,
    payload: { showContextDrawer: true },
  };
};

export const contextDrawerExpandAction = () => {
  return {
    type: EXPAND_CONTEXTDRAWER,
    payload: { expandContextDrawer: true },
  };
};
export const contextDrawerCollapseAction = () => {
  return {
    type: COLLAPSE_CONTEXTDRAWER,
    payload: { expandContextDrawer: false },
  };
};

export const loadWorkflowAction = () => {
  return {
    type: LOAD_WORKFLOW,
    payload: { loadWorkflow: true },
  };
};

export const navigateResetWorkflowAction = () => {
  return {
    type: WORKFLOWS_LANDING,
    payload: { loadWorkflow: false },
  };
};

export const activateDisabledMenusAction = () => {
  return {
    type: ACTIVATE_DISABLEDMENUS,
    payload: { menusDisabled: false },
  };
};

export const resetLayoutAction = () => {
  return {
    type: RESET_LAYOUT,
  };
};
