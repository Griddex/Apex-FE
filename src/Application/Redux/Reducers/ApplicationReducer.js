import {
  DATA_TO_STORE,
  SET_MAINDRAWERMENU,
  SET_SUBNAVBARMENU,
  SET_WORKFLOWMENU,
  SET_SUBNAVBARDATA,
} from "../Actions/ApplicationActions";
import applicationState from "../State/ApplicationState";

const applicationReducer = (state = applicationState, action) => {
  switch (action.type) {
    case DATA_TO_STORE:
      return {
        ...state,
        [action.name]: action.value,
      };

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

    default:
      return { ...state };
  }
};

export default applicationReducer;
