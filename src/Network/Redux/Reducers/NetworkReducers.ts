import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  ADD_NETWORKELEMENT,
  AUTOGENERATENETWORK_FAILURE,
  AUTOGENERATENETWORK_SUCCESS,
  EXISTINGFORECASTPARAMETERS_FAILURE,
  EXISTINGFORECASTPARAMETERS_SUCCESS,
  EXISTINGNETWORKDATA_FAILURE,
  EXISTINGNETWORKDATA_SUCCESS,
  GENERATENETWORKBYSELECTION_FAILURE,
  GENERATENETWORKBYSELECTION_SUCCESS,
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
import { INetworkState } from "../State/NetworkStateTypes";

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
      const {
        success,
        statusCode,
        nodeElements,
        edgeElements,
        networkId,
      } = action.payload;

      return {
        ...state,
        success,
        statusCode,
        nodeElements,
        edgeElements,
        networkId,
      };
    }

    case AUTOGENERATENETWORK_FAILURE: {
      const { errors } = action.payload;
      return {
        ...state,
        errors,
      };
    }

    case GENERATENETWORKBYSELECTION_SUCCESS: {
      const {
        success,
        statusCode,
        nodeElements,
        edgeElements,
      } = action.payload;

      return {
        ...state,
        success,
        statusCode,
        nodeElements,
        edgeElements,
      };
    }

    case GENERATENETWORKBYSELECTION_FAILURE: {
      const { errors } = action.payload;
      return {
        ...state,
        errors,
      };
    }

    case SAVENETWORK_SUCCESS: {
      const { statusCode, success, selectedNetworkId } = action.payload;
      return {
        ...state,
        statusCode,
        success,
        selectedNetworkId,
      };
    }

    case SAVENETWORK_FAILURE: {
      const { statusCode, errors } = action.payload;

      return {
        ...state,
        statusCode,
        errors,
      };
    }

    case EXISTINGFORECASTPARAMETERS_SUCCESS: {
      const {
        statusCode,
        success,
        forecastingParametersServer,
      } = action.payload;
      const wc = "existingDataWorkflows";

      return {
        ...state,
        statusCode,
        success,
        [wc]: { ...state[wc], forecastingParametersServer },
      };
    }

    case EXISTINGFORECASTPARAMETERS_FAILURE: {
      const { statusCode, errors } = action.payload;

      return {
        ...state,
        statusCode,
        errors,
      };
    }

    case EXISTINGNETWORKDATA_SUCCESS: {
      const { statusCode, success, networkExisting } = action.payload;
      const wc = "existingDataWorkflows";

      return {
        ...state,
        statusCode,
        success,
        [wc]: { ...state[wc], networkExisting },
      };
    }

    case EXISTINGNETWORKDATA_FAILURE: {
      const { statusCode, errors } = action.payload;

      return {
        ...state,
        statusCode,
        errors,
      };
    }

    case REMOVE_NETWORK: {
      return {
        ...state,
        nodeElements: [],
        edgeElements: [],
        selectedNetworkId: "",
      };
    }

    default:
      return state;
  }
};

export default networkReducer;
