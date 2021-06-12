import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { UPDATE_SELECTEDIDTITLE } from "../../../Application/Redux/Actions/ApplicationActions";
import {
  ADD_NETWORKELEMENT,
  AUTOGENERATENETWORK_FAILURE,
  AUTOGENERATENETWORK_SUCCESS,
  STOREDFORECASTPARAMETERS_FAILURE,
  STOREDFORECASTPARAMETERS_SUCCESS,
  STOREDNETWORKDATA_FAILURE,
  STOREDNETWORKDATA_SUCCESS,
  DISPLAY_NETWORKBYID_FAILURE,
  DISPLAY_NETWORKBYID_SUCCESS,
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
  STORED_DECLINEPARAMETERS_FAILURE,
  STORED_DECLINEPARAMETERS_SUCCESS,
  STORED_PRODUCTIONPRIORITIZATION_FAILURE,
  STORED_PRODUCTIONPRIORITIZATION_SUCCESS,
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
    case UPDATE_SELECTEDIDTITLE: {
      const { reducer, idTitleObj } = action.payload;

      if (reducer === "networkReducer") {
        return {
          ...state,
          ...idTitleObj,
        };
      } else {
        return state;
      }
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

    case DISPLAY_NETWORKBYID_SUCCESS: {
      const {
        success,
        status,
        categoryType,
        newFlowElements,
        selectedNetworkTitle,
        selectedNetworkId,
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
          selectedNetworkId,
        };
      } else return state;
    }

    case DISPLAY_NETWORKBYID_FAILURE: {
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

    case STOREDFORECASTPARAMETERS_SUCCESS: {
      const { status, success, forecastingParametersStored } = action.payload;
      const wc = "storedDataWorkflows";

      return {
        ...state,
        status,
        success,
        [wc]: { ...state[wc], forecastingParametersStored },
      };
    }

    case STOREDFORECASTPARAMETERS_FAILURE: {
      const { status, errors } = action.payload;

      return {
        ...state,
        status,
        errors,
      };
    }

    case STOREDNETWORKDATA_SUCCESS: {
      const { status, success, networkStored } = action.payload;
      const wc = "storedDataWorkflows";

      return {
        ...state,
        status,
        success,
        [wc]: { ...state[wc], networkStored },
      };
    }

    case STOREDNETWORKDATA_FAILURE: {
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

    case STORED_DECLINEPARAMETERS_SUCCESS: {
      const { status, success, declineParametersStored } = action.payload;
      const wc = "storedDataWorkflows";

      return {
        ...state,
        status,
        success,
        [wc]: { ...state[wc], declineParametersStored },
      };
    }

    case STORED_DECLINEPARAMETERS_FAILURE: {
      const { status, errors } = action.payload;

      return {
        ...state,
        status,
        errors,
      };
    }

    case STORED_PRODUCTIONPRIORITIZATION_SUCCESS: {
      const { status, success, productionPrioritizationStored } =
        action.payload;
      const wc = "storedDataWorkflows";

      return {
        ...state,
        status,
        success,
        [wc]: { ...state[wc], productionPrioritizationStored },
      };
    }

    case STORED_PRODUCTIONPRIORITIZATION_FAILURE: {
      const { status, errors } = action.payload;

      return {
        ...state,
        status,
        errors,
      };
    }

    default:
      return state;
  }
};

export default networkReducer;
