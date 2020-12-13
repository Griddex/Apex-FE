import { SELECT_FORECASTRUN } from "../Actions/EconomicsActions";
import EconomicsState, { IEconomicsState } from "../State/EconomicsState";

interface IAction {
  type: string;
  payload: IEconomicsState;
}

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
