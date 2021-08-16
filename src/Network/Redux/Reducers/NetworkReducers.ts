import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  GET_TABLEDATABYID_SUCCESS,
  UPDATE_SELECTEDIDTITLE,
} from "../../../Application/Redux/Actions/ApplicationActions";
import {
  ADD_NETWORKELEMENT,
  AUTOGENERATENETWORK_FAILURE,
  AUTOGENERATENETWORK_SUCCESS,
  STORED_FORECASTPARAMETERS_FAILURE,
  STORED_FORECASTPARAMETERS_SUCCESS,
  STORED_NETWORKDATA_FAILURE,
  STORED_NETWORKDATA_SUCCESS,
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
  SAVE_NETWORK_FAILURE,
  SAVE_NETWORK_ISVALID,
  SAVE_NETWORK_SUCCESS,
  SET_CURRENTELEMENT,
  SHOW_NETWORKELEMENTDETAILS,
  SHOW_POPOVER,
  UPDATE_NETWORKPARAMETER,
  STORED_DECLINEPARAMETERS_FAILURE,
  STORED_DECLINEPARAMETERS_SUCCESS,
  STORED_PRODUCTIONPRIORITIZATION_FAILURE,
  STORED_PRODUCTIONPRIORITIZATION_SUCCESS,
  RESET_NETWORK,
  UPDATE_NETWORK_PARAMETERS,
  GET_DECLINEPARAMETERSBYID_REQUEST,
  GET_CURRENT_NETWORK_STORE
} from "../Actions/NetworkActions";
import NetworkState from "../State/NetworkState";
import set from "lodash.set";
<<<<<<< HEAD
import get from "lodash.get";
=======
import { Node, Edge } from "react-flow-renderer";
>>>>>>> 87413a9718b8f1b7e4a7e051d3e8db15dbd83ad5

const networkReducer = (state = NetworkState, action: IAction) => {
  switch (action.type) {
    case GET_CURRENT_NETWORK_STORE: {
      const { path } = action.payload;
      const value = get(state, path);
      return value;
    }
    case GET_DECLINEPARAMETERSBYID_REQUEST: {
      const { path, value } = action.payload;
      const updatedState = set(state, path, value);
      return updatedState;
    }
    case UPDATE_NETWORKPARAMETER: {
      const { path, value } = action.payload;

      console.log("payload: ",  action.payload);

      const updatedState = set(state, path, value);
      return updatedState;
    }

    case UPDATE_NETWORK_PARAMETERS: {
      const { updateObj } = action.payload;

      return {
        ...state,
        ...updateObj,
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
      const { type, element } = action.payload;

      if (type === "Node") {
        return {
          ...state,
          nodeElementsManual: [
            ...(state.nodeElementsManual as Node[]),
            element,
          ],
        };
      } else {
        return {
          ...state,
          edgeElementsManual: [
            ...(state.edgeElementsManual as Edge[]),
            element,
          ],
        };
      }
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

    case SAVE_NETWORK_ISVALID:
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

    case SAVE_NETWORK_SUCCESS: {
      const { status, success, selectedNetworkId } = action.payload;
      return {
        ...state,
        status,
        success,
        selectedNetworkId,
      };
    }

    case SAVE_NETWORK_FAILURE: {
      const { status, errors } = action.payload;

      return {
        ...state,
        status,
        errors,
      };
    }

    case STORED_FORECASTPARAMETERS_SUCCESS: {
      const { status, success, forecastingParametersStored } = action.payload;
      const wc = "storedDataWorkflows";

      return {
        ...state,
        status,
        success,
        [wc]: { ...state[wc], forecastingParametersStored },
      };
    }

    case STORED_FORECASTPARAMETERS_FAILURE: {
      const { status, errors } = action.payload;

      return {
        ...state,
        status,
        errors,
      };
    }

    case STORED_NETWORKDATA_SUCCESS: {
      const { status, success, networkStored } = action.payload;
      const wc = "storedDataWorkflows";

      return {
        ...state,
        status,
        success,
        [wc]: { ...state[wc], networkStored },
      };
    }

    case STORED_NETWORKDATA_FAILURE: {
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

    case GET_TABLEDATABYID_SUCCESS: {
      const { reducer, selectedTableData } = action.payload;

      if (reducer === "networkReducer") {
        const updatedState = set(state, "selectedTableData", selectedTableData);
        console.log("updatedState: ", updatedState);
        return updatedState;
      } else {
        return state;
      }
    }

    case RESET_NETWORK: {
      return NetworkState;
    }

    default:
      return state;
  }
};

export default networkReducer;
