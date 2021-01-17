export const LAYOUT_LOGOUTMODAL_OPEN = "LAYOUT_LOGOUTMODAL_OPEN";
export const LAYOUT_LOGOUTMODAL_CLOSE = "LAYOUT_LOGOUTMODAL_CLOSE";
export const LAYOUT_LOGOUT_USER = "LAYOUT_LOGOUT_USER";
//LOGOUT
export const logoutOpenModalAction = () => {
  return {
    type: LAYOUT_LOGOUTMODAL_OPEN,
    payload: { logoutModalOpen: true },
  };
};
export const logoutCloseModalAction = () => {
  return {
    type: LAYOUT_LOGOUTMODAL_CLOSE,
    payload: { logoutModalOpen: false },
  };
};
export const logoutAction = () => {
  return {
    type: LAYOUT_LOGOUT_USER,
    payload: { logoutModalOpen: false },
  };
};
