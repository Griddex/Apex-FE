import {
  SET_CURRENTELEMENT,
  PERSIST_NETWORKELEMENTS,
  PERSIST_POPOVER,
  SHOW_POPOVER,
  PERSIST_POPOVERID,
  SHOW_CONTEXTMENU,
  HIDE_CONTEXTMENU,
} from "../Actions/NetworkActions";
import NetworkState from "../State/NetworkState";

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
    case SHOW_CONTEXTMENU:
      return {
        ...state,
        ...action.payload,
      };
    case HIDE_CONTEXTMENU:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return { ...state };
  }
};

export default networkReducer;
