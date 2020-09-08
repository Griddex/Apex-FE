import {
  LAYOUT_LOGOUTMODAL_OPEN,
  LAYOUT_LOGOUTMODAL_CLOSE,
  LAYOUT_LOGOUT_USER,
} from "../Actions/LogoutActions";
import userState from "../State/UserState";

export const logoutReducer = (state = userState, action) => {
  switch (action.type) {
    //LOGOUT
    case LAYOUT_LOGOUTMODAL_OPEN:
      return {
        ...state,
        logoutModalOpen: action.payload.logoutModalOpen,
      };
    case LAYOUT_LOGOUTMODAL_CLOSE:
      return {
        ...state,
        logoutModalOpen: action.payload.logoutModalOpen,
      };
    case LAYOUT_LOGOUT_USER:
      return {
        ...state,
        logoutModalOpen: action.payload.logoutModalOpen,
      };

    default:
      return { ...state };
  }
};
