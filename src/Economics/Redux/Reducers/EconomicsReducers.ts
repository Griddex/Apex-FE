import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { LOAD_ECONOMICS_WORKFLOW } from "../Actions/EconomicsActions";
import EconomicsState from "../State/EconomicsState";

const economicsReducer = (state = EconomicsState, action: IAction) => {
  switch (action.type) {
    case LOAD_ECONOMICS_WORKFLOW:
      return {
        ...state,
        [action.payload.name]: true,
      };

    default:
      return state;
  }
};

export default economicsReducer;
