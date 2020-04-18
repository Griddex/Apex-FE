export const UILAYOUT_LOGOUTMODAL_CLOSE = "UILAYOUT_LOGOUTMODAL_CLOSE";
export const UILAYOUT_LOGOUTMODAL_OPEN = "UILAYOUT_LOGOUTMODAL_OPEN";
export const UILAYOUT_LOGOUT_USER = "UILAYOUT_LOGOUT_USER";

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
