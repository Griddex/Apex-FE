import { IAction } from "../Actions/ActionTypes";
import {
  SHOW_MAINDRAWER,
  EXPAND_MAINDRAWER,
  HIDE_MAINDRAWER,
  COLLAPSE_MAINDRAWER,
  SHOW_CONTEXTDRAWER,
  HIDE_CONTEXTDRAWER,
  EXPAND_CONTEXTDRAWER,
  COLLAPSE_CONTEXTDRAWER,
  CONTEXTDRAWERMENU_SET,
  SHOW_DIALOGCONTEXTDRAWER,
  HIDE_DIALOGCONTEXTDRAWER,
  EXPAND_DIALOGCONTEXTDRAWER,
  COLLAPSE_DIALOGCONTEXTDRAWER,
  DIALOGCONTEXTDRAWERMENU_SET,
  SHOW_SUBNAVBAR,
  HIDE_SUBNAVBAR,
  EXPAND_SUBNAVBAR,
  COLLAPSE_SUBNAVBAR,
  SHOW_NAVBAR,
  HIDE_NAVBAR,
  EXPAND_NAVBAR,
  COLLAPSE_NAVBAR,
  DEFAULT,
  IMPORTDEFAULT,
  LOAD_WORKFLOW,
  WORKFLOWS_LANDING,
  SIMPLEDIALOG_TOGGLE,
  ACTIVATE_DISABLEDMENUS,
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
    case SHOW_MAINDRAWER:
      return {
        ...state,
        showMainDrawer: action.payload.showMainDrawer,
      };
    case HIDE_MAINDRAWER:
      return {
        ...state,
        showMainDrawer: action.payload.showMainDrawer,
      };
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
    case SHOW_DIALOGCONTEXTDRAWER:
      return {
        ...state,
        showDialogContextDrawer: action.payload.showDialogContextDrawer,
      };
    case HIDE_DIALOGCONTEXTDRAWER:
      return {
        ...state,
        showDialogContextDrawer: action.payload.showDialogContextDrawer,
      };
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
    case DIALOGCONTEXTDRAWERMENU_SET:
      return {
        ...state,
        dialogContextDrawertext: action.payload.dialogContextDrawertext,
      };

    //CONTEXT DRAWER
    case SHOW_CONTEXTDRAWER:
      return {
        ...state,
        showContextDrawer: action.payload.showContextDrawer,
      };
    case HIDE_CONTEXTDRAWER:
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
    case CONTEXTDRAWERMENU_SET:
      return {
        ...state,
        contextDrawertext: action.payload.contextDrawertext,
      };

    //SubNavbar
    case SHOW_SUBNAVBAR:
      return {
        ...state,
        showSubNavbar: action.payload.showSubNavbar,
      };
    case HIDE_SUBNAVBAR:
      return {
        ...state,
        showSubNavbar: action.payload.showSubNavbar,
      };
    case EXPAND_SUBNAVBAR:
      return {
        ...state,
        expandSubNavbar: action.payload.expandSubNavbar,
      };
    case COLLAPSE_SUBNAVBAR:
      return {
        ...state,
        expandSubNavbar: action.payload.expandSubNavbar,
      };

    //Navbar
    case SHOW_NAVBAR:
      return {
        ...state,
        showNavbar: action.payload.showNavbar,
      };
    case HIDE_NAVBAR:
      return {
        ...state,
        showNavbar: action.payload.showNavbar,
      };
    case EXPAND_NAVBAR:
      return {
        ...state,
        expandNavbar: action.payload.expandNavbar,
      };
    case COLLAPSE_NAVBAR:
      return {
        ...state,
        expandNavbar: action.payload.expandNavbar,
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
    case SIMPLEDIALOG_TOGGLE:
      return {
        ...state,
        simpleDialogOpen: action.payload.simpleDialogOpen,
      };
    case ACTIVATE_DISABLEDMENUS:
      return {
        ...state,
        menusDisabled: action.payload.menusDisabled,
      };

    case LOGOUT_REQUEST:
      return { ...state, undefined };

    default:
      return {
        ...state,
      };
  }
};

export default layoutReducer;
