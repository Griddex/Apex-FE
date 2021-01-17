import { IAction } from "../Actions/ActionTypes";
import {
  SET_MAINDRAWERMENU,
  SET_SUBNAVBARMENU,
  SET_WORKFLOWMENU,
  SET_SUBNAVBARDATA,
  ADD_TAB,
  SET_CURRENTMAINTABVALUE,
} from "../Actions/ApplicationActions";
import applicationState from "../State/ApplicationState";

const applicationReducer = (state = applicationState, action: IAction) => {
  switch (action.type) {
    case SET_MAINDRAWERMENU:
      return {
        ...state,
        moduleName: action.payload.moduleName,
      };

    case SET_SUBNAVBARMENU:
      return {
        ...state,
        subModuleName: action.payload.subModuleName,
      };

    case SET_WORKFLOWMENU:
      return {
        ...state,
        workflowName: action.payload.workflowName,
      };

    case SET_SUBNAVBARDATA:
      return {
        ...state,
        subNavbarData: action.payload.subNavbarData,
      };

    case ADD_TAB:
      return {
        ...state,
        newMainTabs: [...state.newMainTabs, action.payload.newTab],
        newMainTabPanels: [
          ...state.newMainTabPanels,
          action.payload.newTabPanel,
        ],
      };

    case SET_CURRENTMAINTABVALUE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default applicationReducer;
