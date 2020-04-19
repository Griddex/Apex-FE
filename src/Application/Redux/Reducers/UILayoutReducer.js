import {
  UILAYOUT_LOGOUTMODAL_OPEN,
  UILAYOUT_LOGOUTMODAL_CLOSE,
  UILAYOUT_LOGOUT_USER,
} from "./../Actions/UILayoutActions";
import LayoutUIState from "../State/UIState/LayoutUIState";

export const UILayoutReducer = (state = LayoutUIState, action) => {
  switch (action.type) {
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
