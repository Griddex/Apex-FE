export const SHOW_MAINDRAWER = "SHOW_MAINDRAWER";
export const HIDE_MAINDRAWER = "HIDE_MAINDRAWER";
export const EXPAND_MAINDRAWER = "EXPAND_MAINDRAWER";
export const COLLAPSE_MAINDRAWER = "COLLAPSE_MAINDRAWER";
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
export const LAYOUT_DEFAULT = "LAYOUT_DEFAULT";
export const IMPORTLAYOUT_DEFAULT = "IMPORTLAYOUT_DEFAULT";
export const LAYOUT_LOAD_WORKFLOW = "LAYOUT_LOAD_WORKFLOW";
export const LAYOUT_WORKFLOWS_LANDING = "LAYOUT_WORKFLOWS_LANDING";
export const LAYOUT_SIMPLEDIALOG_TOGGLE = "LAYOUT_SIMPLEDIALOG_TOGGLE";

//MAIN DRAWER
export const mainDrawerShowAction = () => {
  return {
    type: SHOW_MAINDRAWER,
    payload: { showMainDrawer: true },
  };
};
export const mainDrawerHideAction = () => {
  return {
    type: HIDE_MAINDRAWER,
    payload: { showMainDrawer: false },
  };
};
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

//CONTEXT DRAWER
export const contextDrawerShowAction = () => {
  return {
    type: SHOW_CONTEXTDRAWER,
    payload: { showContextDrawer: true },
  };
};
export const contextDrawerHideAction = () => {
  return {
    type: HIDE_CONTEXTDRAWER,
    payload: { showContextDrawer: false },
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
export const contextDrawerSetMenuAction = (text) => {
  return {
    type: CONTEXTDRAWERMENU_SET,
    payload: { contextDrawertext: text },
  };
};

//SubNavbar
export const subNavBarShowAction = () => {
  return {
    type: SHOW_SUBNAVBAR,
    payload: { showSubNavbar: true },
  };
};
export const subNavbarHideAction = () => {
  return {
    type: HIDE_SUBNAVBAR,
    payload: { showSubNavbar: false },
  };
};
export const subNavbarExpandAction = () => {
  return {
    type: EXPAND_SUBNAVBAR,
    payload: { expandSubNavbar: true },
  };
};
export const subNavbarCollapseAction = () => {
  return {
    type: COLLAPSE_SUBNAVBAR,
    payload: { expandSubNavbar: false },
  };
};

//Navbar
export const navbarShowAction = () => {
  return {
    type: SHOW_NAVBAR,
    payload: { showNavbar: true },
  };
};
export const navBarAbsentAction = () => {
  return {
    type: HIDE_NAVBAR,
    payload: { showNavbar: false },
  };
};
export const navbarExpandAction = () => {
  return {
    type: EXPAND_NAVBAR,
    payload: { expandNavbar: true },
  };
};
export const navbarCollapseAction = () => {
  return {
    type: COLLAPSE_NAVBAR,
    payload: { expandNavbar: false },
  };
};

export const UILayoutDefaultAction = () => {
  return {
    type: LAYOUT_DEFAULT,
    payload: {
      showMainDrawer: true,
      expandMainDrawer: false,
      showNavbar: true,
      expandNavbar: false,
    },
  };
};
export const ImportLayoutDefaultAction = () => {
  return {
    type: IMPORTLAYOUT_DEFAULT,
    payload: {
      showSubNavbar: true,
      expandSubNavbar: false,
      showContextDrawer: true,
      expandContextDrawer: false,
    },
  };
};

export const loadWorkflowAction = () => {
  return {
    type: LAYOUT_LOAD_WORKFLOW,
    payload: { loadWorkflow: true },
  };
};
export const navigateResetWorkflowAction = () => {
  return {
    type: LAYOUT_WORKFLOWS_LANDING,
    payload: { loadWorkflow: false },
  };
};

export const simpleDialogOpenAction = (trueOrFalse) => {
  return {
    type: LAYOUT_SIMPLEDIALOG_TOGGLE,
    payload: { simpleDialogOpen: trueOrFalse },
  };
};
