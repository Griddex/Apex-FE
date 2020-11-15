import { PERSIST_NETWORKELEMENTS } from "../Actions/AutomaticNetworkActions";
import networkElementsState from "../State/NetworkElementsState";

const automaticNetworkReducer = (state = networkElementsState, action) => {
  switch (action.type) {
    case PERSIST_NETWORKELEMENTS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return { ...state };
  }
};

export default automaticNetworkReducer;
