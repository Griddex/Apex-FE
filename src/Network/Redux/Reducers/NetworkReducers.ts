import {
  SET_CURRENTELEMENT,
  PERSIST_NETWORKELEMENTS,
} from "../Actions/NetworkActions";
import NetworkState from "../State/NetworkState";

interface IAction {
  type: string;
  payload: { currentElement: Record<string, unknown> };
}

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

    default:
      return { ...state };
  }
};

export default networkReducer;
