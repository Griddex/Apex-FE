import set from "lodash.set";
import { IAction } from "../Actions/ActionTypes";
import {
  ADD_TAB,
  FETCH_MATCHOBJECT_FAILURE,
  FETCH_MATCHOBJECT_SUCCESS,
  SAVE_USERMATCH_ALL,
  SET_CURRENTMAINTABVALUE,
  SET_MAINDRAWERMENU,
  SET_SUBNAVBARDATA,
  SET_SUBNAVBARMENU,
  SET_WORKFLOWMENU,
  UPDATE_APPLICATION,
} from "../Actions/ApplicationActions";
import applicationState from "../State/ApplicationState";

const applicationReducer = (state = applicationState, action: IAction) => {
  switch (action.type) {
    case UPDATE_APPLICATION: {
      const { nameOrPath, value } = action.payload;

      const updatedState = set(state, nameOrPath, value);
      return updatedState;
    }

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

    case FETCH_MATCHOBJECT_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_MATCHOBJECT_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    case SAVE_USERMATCH_ALL: {
      const { savedMatchObjectAll } = action.payload;

      return {
        ...state,
        savedMatchObjectAll,
      };
    }

    default:
      return state;
  }
};

export default applicationReducer;
