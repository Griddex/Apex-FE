import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { LOGOUT_REQUEST } from "../../../Application/Redux/Actions/LogoutActions";
import {
  CONNECTDATABASE_REQUEST,
  CONNECTDATABASE_SUCCESS,
  CONNECTDATABASE_FAILURE,
} from "../Actions/DatabaseServerActions";
import databaseServerState from "../State/DatabaseServerState";

const loginReducer = (state = databaseServerState, action: IAction) => {
  switch (action.type) {
    case CONNECTDATABASE_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case CONNECTDATABASE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case CONNECTDATABASE_FAILURE:
      return {
        ...state,
        status: action.payload.status,
        errors: new Array(action.payload.errors),
      };

    default:
      return state;
  }
};

export default loginReducer;
