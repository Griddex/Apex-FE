import {
  UILAYOUT_MAINDRAWER_OPEN,
  UILAYOUT_MAINDRAWER_CLOSE,
  UILAYOUT_CONTEXTDRAWER_OPEN,
  UILAYOUT_CONTEXTDRAWER_CLOSE,
  UILAYOUT_LOGOUTMODAL_OPEN,
  UILAYOUT_LOGOUTMODAL_CLOSE,
  UILAYOUT_MAINDRAWERMENU_SET,
  UILAYOUT_LOGOUT_USER,
} from "./../Actions/UILayoutActions";
import LayoutUIState from "../State/UIState/LayoutUIState";

export const UILayoutReducer = (state = LayoutUIState, action) => {
  switch (action.type) {
    case UILAYOUT_MAINDRAWER_OPEN:
      return {
        ...state,
        openMainDrawer: action.payload.openMainDrawer,
      };
    case UILAYOUT_MAINDRAWER_CLOSE:
      return {
        ...state,
        openMainDrawer: action.payload.openMainDrawer,
      };
    case UILAYOUT_CONTEXTDRAWER_OPEN:
      return {
        ...state,
        openContextDrawer: action.payload.openContextDrawer,
      };
    case UILAYOUT_CONTEXTDRAWER_CLOSE:
      return {
        ...state,
        openContextDrawer: action.payload.openContextDrawer,
      };
    case UILAYOUT_LOGOUTMODAL_OPEN:
      return {
        ...state,
        logoutModalOpen: action.payload.logoutModalOpen,
      };
    case UILAYOUT_LOGOUTMODAL_CLOSE:
      return {
        ...state,
        logoutModalOpen: action.payload.logoutModalOpen,
      };
    case UILAYOUT_MAINDRAWERMENU_SET:
      return {
        ...state,
        mainDrawerMenuSelected: action.payload.mainDrawertext,
      };
    case UILAYOUT_LOGOUT_USER:
      return {
        ...state,
        logoutModalOpen: action.payload.logoutModalOpen,
      };
    default:
      return {
        ...state,
      };
  }
};
