import { IAction } from "../Actions/ActionTypes";
import {
  ACTIVATE_DISABLEDMENUS,
  COLLAPSE_CONTEXTDRAWER,
  COLLAPSE_DIALOGCONTEXTDRAWER,
  COLLAPSE_MAINDRAWER,
  DEFAULT,
  EXPAND_CONTEXTDRAWER,
  EXPAND_DIALOGCONTEXTDRAWER,
  EXPAND_MAINDRAWER,
  IMPORTDEFAULT,
  LOAD_WORKFLOW,
  RESET_LAYOUT,
  SHOW_CONTEXTDRAWER,
  WORKFLOWS_LANDING,
} from "../Actions/LayoutActions";
import { LOGOUT_REQUEST } from "../Actions/LogoutActions";
import UILayoutState from "../State/LayoutState";

const layoutReducer = (state = UILayoutState, action: IAction) => {
  switch (action.type) {
    //UI LAYOUT DEFAULT
    case DEFAULT:
      return {
        ...state,
        showMainDrawer: action.payload.showMainDrawer,
        expandMainDrawer: action.payload.expandMainDrawer,
        showNavbar: action.payload.showNavbar,
        expandNavbar: action.payload.expandNavbar,
      };

    //IMPORT LAYOUT DEFAULT
    case IMPORTDEFAULT:
      return {
        ...state,
        showSubNavbar: action.payload.showSubNavbar,
        expandSubNavbar: action.payload.expandSubNavbar,
        showContextDrawer: action.payload.showContextDrawer,
        expandContextDrawer: action.payload.expandContextDrawer,
      };

    //MAIN DRAWER
    case EXPAND_MAINDRAWER:
      return {
        ...state,
        expandMainDrawer: action.payload.expandMainDrawer,
      };
    case COLLAPSE_MAINDRAWER:
      return {
        ...state,
        expandMainDrawer: action.payload.expandMainDrawer,
      };

    //DIALOG CONTEXT DRAWER
    case EXPAND_DIALOGCONTEXTDRAWER:
      return {
        ...state,
        expandDialogContextDrawer: action.payload.expandDialogContextDrawer,
      };
    case COLLAPSE_DIALOGCONTEXTDRAWER:
      return {
        ...state,
        expandDialogContextDrawer: action.payload.expandDialogContextDrawer,
      };

    //CONTEXT DRAWER
    case SHOW_CONTEXTDRAWER:
      return {
        ...state,
        showContextDrawer: action.payload.showContextDrawer,
      };

    case EXPAND_CONTEXTDRAWER:
      return {
        ...state,
        expandContextDrawer: action.payload.expandContextDrawer,
      };
    case COLLAPSE_CONTEXTDRAWER:
      return {
        ...state,
        expandContextDrawer: action.payload.expandContextDrawer,
      };

    case LOAD_WORKFLOW:
      return {
        ...state,
        loadWorkflow: action.payload.loadWorkflow,
      };

    case WORKFLOWS_LANDING:
      return {
        ...state,
        loadWorkflow: action.payload.loadWorkflow,
      };

    case ACTIVATE_DISABLEDMENUS:
      return {
        ...state,
        menusDisabled: action.payload.menusDisabled,
      };

    case LOGOUT_REQUEST:
      return { ...state, undefined };

    case RESET_LAYOUT: {
      return UILayoutState;
    }

    default:
      return {
        ...state,
      };
  }
};

export default layoutReducer;
