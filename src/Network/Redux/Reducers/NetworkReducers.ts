import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  PERSIST_FORECASTPARAMETERS,
  RUN_FORECAST_FAILURE,
  RUN_FORECAST_REQUEST,
  RUN_FORECAST_SUCCESS,
} from "../Actions/ForecastingActions";
import {
  UPDATE_NETWORKPARAMETER,
  ADD_NETWORKELEMENT,
  HIDE_NETWORKELEMENTDETAILS,
  HIDE_WELHEADSUMMARYEDGES,
  HIDE_WELHEADSUMMARYNODES,
  PERSIST_NETWORKELEMENTS,
  PERSIST_POPOVER,
  PERSIST_POPOVERID,
  SAVENETWORK_ISVALID,
  AUTOGENERATENETWORK_REQUEST,
  AUTOGENERATENETWORK_SUCCESS,
  AUTOGENERATENETWORK_FAILURE,
  SET_CURRENTELEMENT,
  SHOW_NETWORKELEMENTDETAILS,
  SHOW_POPOVER,
  SAVENETWORK_SUCCESS,
  SAVENETWORK_FAILURE,
  EXISTINGFORECASTPARAMETERS_SUCCESS,
  EXISTINGFORECASTPARAMETERS_FAILURE,
  EXISTINGNETWORKDATA_FAILURE,
  EXISTINGNETWORKDATA_SUCCESS,
  GENERATENETWORKBYSELECTION_FAILURE,
  GENERATENETWORKBYSELECTION_SUCCESS,
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
    case RUN_FORECAST_REQUEST:
      return {
        ...state,
      };
    case RUN_FORECAST_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case RUN_FORECAST_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case PERSIST_FORECASTPARAMETERS:
      return {
        ...state,
        ...action.payload,
      };

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
      const { statusCode, success } = action.payload;
      return {
        ...state,
        statusCode,
        success,
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
        forecastingParametersExisting,
      } = action.payload;
      const wc = "existingDataWorkflows";

      return {
        ...state,
        statusCode,
        success,
        [wc]: { ...state[wc], forecastingParametersExisting },
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

    default:
      return state;
  }
};

export default networkReducer;
