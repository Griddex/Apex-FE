import {
  UILAYOUT_MAINDRAWER_PRESENT,
  UILAYOUT_MAINDRAWER_EXPAND,
  UILAYOUT_MAINDRAWER_ABSENT,
  UILAYOUT_MAINDRAWER_COLLAPSE,
  UILAYOUT_MAINDRAWERMENU_SET,
  UILAYOUT_CONTEXTDRAWER_PRESENT,
  UILAYOUT_CONTEXTDRAWER_ABSENT,
  UILAYOUT_CONTEXTDRAWER_EXPAND,
  UILAYOUT_CONTEXTDRAWER_COLLAPSE,
  UILAYOUT_CONTEXTDRAWERMENU_SET,
  UILAYOUT_SUBNAVBAR_PRESENT,
  UILAYOUT_SUBNAVBAR_ABSENT,
  UILAYOUT_SUBNAVBAR_EXPAND,
  UILAYOUT_SUBNAVBAR_COLLAPSE,
  UILAYOUT_NAVBAR_PRESENT,
  UILAYOUT_NAVBAR_ABSENT,
  UILAYOUT_NAVBAR_EXPAND,
  UILAYOUT_NAVBAR_COLLAPSE,
  UILAYOUT_LOGOUTMODAL_OPEN,
  UILAYOUT_LOGOUTMODAL_CLOSE,
  UILAYOUT_LOGOUT_USER,
  UILAYOUT_DEFAULT,
  UILAYOUT_LOAD_WORKFLOW,
  UILAYOUT_NAVIGATE_RESET_WORKFLOW,
} from "./../Actions/UILayoutActions";
import UILayoutState from "../State/UIState/UILayoutState";

export const UILayoutReducer = (state = UILayoutState, action) => {
  switch (action.type) {
    //MAIN DRAWER
    case UILAYOUT_MAINDRAWER_PRESENT:
      return {
        ...state,
        mainDrawerPresent: action.payload.mainDrawerPresent,
      };
    case UILAYOUT_MAINDRAWER_ABSENT:
      return {
        ...state,
        mainDrawerPresent: action.payload.mainDrawerPresent,
      };
    case UILAYOUT_MAINDRAWER_EXPAND:
      return {
        ...state,
        expandMainDrawer: action.payload.expandMainDrawer,
      };
    case UILAYOUT_MAINDRAWER_COLLAPSE:
      return {
        ...state,
        expandMainDrawer: action.payload.expandMainDrawer,
      };
    case UILAYOUT_MAINDRAWERMENU_SET:
      return {
        ...state,
        mainDrawertext: action.payload.mainDrawertext,
      };

    //CONTEXT DRAWER
    case UILAYOUT_CONTEXTDRAWER_PRESENT:
      return {
        ...state,
        contextDrawerPresent: action.payload.contextDrawerPresent,
      };
    case UILAYOUT_CONTEXTDRAWER_ABSENT:
      return {
        ...state,
        contextDrawerPresent: action.payload.contextDrawerPresent,
      };
    case UILAYOUT_CONTEXTDRAWER_EXPAND:
      return {
        ...state,
        expandContextDrawer: action.payload.expandContextDrawer,
      };
    case UILAYOUT_CONTEXTDRAWER_COLLAPSE:
      return {
        ...state,
        expandContextDrawer: action.payload.expandContextDrawer,
      };
    case UILAYOUT_CONTEXTDRAWERMENU_SET:
      return {
        ...state,
        contextDrawertext: action.payload.contextDrawertext,
      };

    //SUBNAVBAR
    case UILAYOUT_SUBNAVBAR_PRESENT:
      return {
        ...state,
        subNavBarPresent: action.payload.subNavBarPresent,
      };
    case UILAYOUT_SUBNAVBAR_ABSENT:
      return {
        ...state,
        subNavBarPresent: action.payload.subNavBarPresent,
      };
    case UILAYOUT_SUBNAVBAR_EXPAND:
      return {
        ...state,
        expandSubNavBar: action.payload.expandSubNavBar,
      };
    case UILAYOUT_SUBNAVBAR_COLLAPSE:
      return {
        ...state,
        expandSubNavBar: action.payload.expandSubNavBar,
      };

    //NAVBAR
    case UILAYOUT_NAVBAR_PRESENT:
      return {
        ...state,
        navBarPresent: action.payload.navBarPresent,
      };
    case UILAYOUT_NAVBAR_ABSENT:
      return {
        ...state,
        navBarPresent: action.payload.navBarPresent,
      };
    case UILAYOUT_NAVBAR_EXPAND:
      return {
        ...state,
        expandNavBar: action.payload.expandNavBar,
      };
    case UILAYOUT_NAVBAR_COLLAPSE:
      return {
        ...state,
        expandNavBar: action.payload.expandNavBar,
      };

    //LOGOUT
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
    case UILAYOUT_DEFAULT:
      return { ...state };
    case UILAYOUT_LOAD_WORKFLOW:
      return {
        ...state,
        loadWorkflow: action.payload.loadWorkflow,
      };
    case UILAYOUT_NAVIGATE_RESET_WORKFLOW:
      return {
        ...state,
        loadWorkflow: action.payload.loadWorkflow,
      };
    default:
      return {
        ...state,
      };
  }
};
