export const UILAYOUT_MAINDRAWER_OPEN = "UILAYOUT_MAINDRAWER_OPEN";
export const UILAYOUT_MAINDRAWER_CLOSE = "UILAYOUT_MAINDRAWER_CLOSE";
export const UILAYOUT_CONTEXTDRAWER_OPEN = "UILAYOUT_CONTEXTDRAWER_OPEN";
export const UILAYOUT_CONTEXTDRAWER_CLOSE = "UILAYOUT_CONTEXTDRAWER_CLOSE";
export const UILAYOUT_LOGOUTMODAL_CLOSE = "UILAYOUT_LOGOUTMODAL_CLOSE";
export const UILAYOUT_LOGOUTMODAL_OPEN = "UILAYOUT_LOGOUTMODAL_OPEN";
export const UILAYOUT_MAINDRAWERMENU_SET = "UILAYOUT_MAINDRAWERMENU_SET";
export const UILAYOUT_LOGOUT_USER = "UILAYOUT_LOGOUT_USER";

export const openMainDrawerAction = () => {
  return {
    type: UILAYOUT_MAINDRAWER_OPEN,
    payload: { openMainDrawer: true },
  };
};

export const closeMainDrawerAction = () => {
  return {
    type: UILAYOUT_MAINDRAWER_CLOSE,
    payload: { openMainDrawer: false },
  };
};

export const openContextDrawerAction = () => {
  return {
    type: UILAYOUT_CONTEXTDRAWER_OPEN,
    payload: { openContextDrawer: true },
  };
};

export const closeContextDrawerAction = () => {
  return {
    type: UILAYOUT_CONTEXTDRAWER_CLOSE,
    payload: { openContextDrawer: false },
  };
};

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

export const setMainDrawerMenuAction = (text) => {
  return {
    type: UILAYOUT_MAINDRAWERMENU_SET,
    payload: { mainDrawertext: text },
  };
};

export const logoutUserAction = () => {
  return {
    type: UILAYOUT_LOGOUT_USER,
    payload: { logoutModalOpen: false },
  };
};
