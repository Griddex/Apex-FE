import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  PERSIST_FORECASTPARAMETERS,
  RUN_FORECAST_FAILURE,
  RUN_FORECAST_REQUEST,
  RUN_FORECAST_SUCCESS,
} from "../Actions/ForecastingActions";
import {
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
} from "../Actions/NetworkActions";
import NetworkState from "../State/NetworkState";

const networkReducer = (state = NetworkState, action: IAction) => {
  switch (action.type) {
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
      const { statusCode, nodeElements, edeElements } = action.payload.data;
      return {
        ...state,
        statusCode,
        nodeElements,
        edeElements,
      };
    }

    case AUTOGENERATENETWORK_FAILURE: {
      const { errors } = action.payload.data;
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
    default:
      return state;
  }
};

export default networkReducer;
