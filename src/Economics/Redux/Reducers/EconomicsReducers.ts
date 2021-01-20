import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { LOGOUT_REQUEST } from "../../../Application/Redux/Actions/LogoutActions";
import { SELECT_FORECASTRUN } from "../Actions/EconomicsActions";
import EconomicsState from "../State/EconomicsState";

const economicsReducer = (state = EconomicsState, action: IAction) => {
  switch (action.type) {
    case SELECT_FORECASTRUN:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default economicsReducer;
