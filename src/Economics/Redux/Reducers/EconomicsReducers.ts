import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  LOAD_ECONOMICS_WORKFLOW,
  UPDATE_ECONOMICS,
} from "../Actions/EconomicsActions";
import EconomicsState from "../State/EconomicsState";
import set from "lodash.set";
import { UPDATE_SELECTEDIDTITLE } from "../../../Application/Redux/Actions/ApplicationActions";

const economicsReducer = (state = EconomicsState, action: IAction) => {
  switch (action.type) {
    case UPDATE_ECONOMICS: {
      const { path, value } = action.payload;

      const updatedState = set(state, path, value);
      return updatedState;
    }

    case UPDATE_SELECTEDIDTITLE: {
      const { reducer, idTitleObj } = action.payload;

      if (reducer === "economicsReducer") {
        return {
          ...state,
          ...idTitleObj,
        };
      } else {
        return state;
      }
    }

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
