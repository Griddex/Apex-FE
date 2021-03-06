import set from "lodash.set";
import { IAction } from "../Actions/ActionTypes";
import {
  FETCH_MATCHOBJECT_FAILURE,
  FETCH_MATCHOBJECT_SUCCESS,
  PERSIST_TITLES,
  RESET_APPLICATION,
  SAVE_USERMATCH_ALL,
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

    case PERSIST_TITLES: {
      const { formName, formTitlesCollection } = action.payload;

      return {
        ...state,
        ["allFormTitles"]: {
          ...state.allFormTitles,
          [formName]: formTitlesCollection,
        },
      };
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

    case RESET_APPLICATION: {
      return applicationState;
    }

    default:
      return state;
  }
};

export default applicationReducer;
