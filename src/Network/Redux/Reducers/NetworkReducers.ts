import {
  RUN_FORECAST_REQUEST,
  RUN_FORECAST_SUCCESS,
  RUN_FORECAST_FAILURE,
  PERSIST_FORECASTPARAMETERS,
} from "../Actions/ForecastingActions";
import {
  SET_CURRENTELEMENT,
  PERSIST_NETWORKELEMENTS,
  ADD_NETWORKELEMENT,
  PERSIST_POPOVER,
  SHOW_POPOVER,
  PERSIST_POPOVERID,
  SHOW_NETWORKELEMENTDETAILS,
  HIDE_NETWORKELEMENTDETAILS,
  HIDE_WELHEADSUMMARYNODES,
  HIDE_WELHEADSUMMARYEDGES,
  SAVENETWORK_ISVALID,
} from "../Actions/NetworkActions";
import NetworkState from "../State/NetworkState";
// import { Node, Edge } from "react-flow-renderer";
interface IAction {
  type: string;
  payload: { currentElement: Record<string, unknown> };
}
//currentPopoverData
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
    default:
      return state;
  }
};

export default networkReducer;
