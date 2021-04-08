import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  ADD_NETWORKELEMENT,
  AUTOGENERATENETWORK_FAILURE,
  AUTOGENERATENETWORK_SUCCESS,
  EXISTINGFORECASTPARAMETERS_FAILURE,
  EXISTINGFORECASTPARAMETERS_SUCCESS,
  EXISTINGNETWORKDATA_FAILURE,
  EXISTINGNETWORKDATA_SUCCESS,
  DISPLAYNETWORKBYSELECTION_FAILURE,
  DISPLAYNETWORKBYSELECTION_SUCCESS,
  HIDE_NETWORKELEMENTDETAILS,
  HIDE_WELHEADSUMMARYEDGES,
  HIDE_WELHEADSUMMARYNODES,
  PERSIST_FORECASTPARAMETERS,
  PERSIST_NETWORKELEMENTS,
  PERSIST_POPOVER,
  PERSIST_POPOVERID,
  REMOVE_NETWORK,
  RUN_FORECAST_REQUEST,
  SAVENETWORK_FAILURE,
  SAVENETWORK_ISVALID,
  SAVENETWORK_SUCCESS,
  SET_CURRENTELEMENT,
  SHOW_NETWORKELEMENTDETAILS,
  SHOW_POPOVER,
  UPDATE_NETWORKPARAMETER,
} from "../Actions/NetworkActions";
import NetworkState from "../State/NetworkState";

const networkReducer = (state = NetworkState, action: IAction) => {
  switch (action.type) {
    case UPDATE_NETWORKPARAMETER: {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
    case SET_CURRENTELEMENT:
      return {
        ...state,
        ...action.payload.currentElement,
      };
    case PERSIST_NETWORKELEMENTS:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_NETWORKELEMENT: {
      let updatedElements = [];
      const newElement = action.payload;
      const nodeElements = state.nodeElements ? state.nodeElements : [];
      updatedElements = [...nodeElements, newElement];

      return {
        ...state,
        nodeElements: updatedElements,
      };
    }
    case PERSIST_POPOVERID:
      return {
        ...state,
        ...action.payload,
      };
    case PERSIST_POPOVER:
      return {
        ...state,
        ...action.payload,
      };
    case SHOW_POPOVER:
      return {
        ...state,
        ...action.payload,
      };
    case SHOW_NETWORKELEMENTDETAILS:
      return {
        ...state,
        ...action.payload,
      };
    case HIDE_NETWORKELEMENTDETAILS:
      return {
        ...state,
        ...action.payload,
      };
    case HIDE_WELHEADSUMMARYNODES:
      return {
        ...state,
        ...action.payload,
      };
    case HIDE_WELHEADSUMMARYEDGES:
      return {
        ...state,
        ...action.payload,
      };
    case RUN_FORECAST_REQUEST: //Rare case, where request is in netowrkreducer but success/failure is in forecast reducer
      return {
        ...state,
      };

    case PERSIST_FORECASTPARAMETERS: {
      return {
        ...state,
        parameterEntries: {
          ...state["parameterEntries"],
          ...action.payload,
        },
      };
    }

    case SAVENETWORK_ISVALID:
      return {
        ...state,
        isValids: { ...action.payload },
      };

    case AUTOGENERATENETWORK_SUCCESS: {
      const { success, status, isNode, newFlowElements } = action.payload;

      if (isNode) {
        return {
          ...state,
          success,
          status,
          nodeElements: newFlowElements,
        };
      } else {
        return {
          ...state,
          success,
          status,
          edgeElements: newFlowElements,
        };
      }
    }

    case AUTOGENERATENETWORK_FAILURE: {
      const { errors } = action.payload;
      return {
        ...state,
        errors,
      };
    }

    case DISPLAYNETWORKBYSELECTION_SUCCESS: {
      const {
        success,
        status,
        categoryType,
        newFlowElements,
        selectedNetworkTitle,
      } = action.payload;

      if (categoryType === "nodes") {
        return {
          ...state,
          success,
          status,
          nodeElements: newFlowElements,
        };
      } else if (categoryType === "edges") {
        return {
          ...state,
          success,
          status,
          edgeElements: newFlowElements,
        };
      } else if (categoryType === "properties") {
        return {
          ...state,
          success,
          status,
          selectedNetworkTitle,
        };
      } else return state;
    }

    case DISPLAYNETWORKBYSELECTION_FAILURE: {
      const { errors } = action.payload;
      return {
        ...state,
        errors,
      };
    }

    case SAVENETWORK_SUCCESS: {
      const { status, success, selectedNetworkId } = action.payload;
      return {
        ...state,
        status,
        success,
        selectedNetworkId,
      };
    }

    case SAVENETWORK_FAILURE: {
      const { status, errors } = action.payload;

      return {
        ...state,
        status,
        errors,
      };
    }

    case EXISTINGFORECASTPARAMETERS_SUCCESS: {
      const { status, success, forecastingParametersServer } = action.payload;
      const wc = "existingDataWorkflows";

      return {
        ...state,
        status,
        success,
        [wc]: { ...state[wc], forecastingParametersServer },
      };
    }

    case EXISTINGFORECASTPARAMETERS_FAILURE: {
      const { status, errors } = action.payload;

      return {
        ...state,
        status,
        errors,
      };
    }

    case EXISTINGNETWORKDATA_SUCCESS: {
      const { status, success, networkExisting } = action.payload;
      const wc = "existingDataWorkflows";

      return {
        ...state,
        status,
        success,
        [wc]: { ...state[wc], networkExisting },
      };
    }

    case EXISTINGNETWORKDATA_FAILURE: {
      const { status, errors } = action.payload;

      return {
        ...state,
        status,
        errors,
      };
    }

    case REMOVE_NETWORK: {
      return {
        ...state,
        nodeElements: [],
        edgeElements: [],
        selectedNetworkId: "",
        selectedNetworkTitle: "",
      };
    }

    default:
      return state;
  }
};

export default networkReducer;
