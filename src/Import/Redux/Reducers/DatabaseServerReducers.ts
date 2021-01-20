import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { LOGOUT_REQUEST } from "../../../Application/Redux/Actions/LogoutActions";
import {
  SERVERLOGIN_REQUEST,
  SERVERLOGIN_SUCCESS,
  SERVERLOGIN_FAILURE,
} from "../Actions/DatabaseServerActions";
import databaseServerState from "../State/DatabaseServerState";

const loginReducer = (state = databaseServerState, action: IAction) => {
  switch (action.type) {
    case SERVERLOGIN_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case SERVERLOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case SERVERLOGIN_FAILURE:
      return {
        ...state,
        statusCode: action.payload.statusCode,
        errors: new Array(action.payload.errors),
      };

    default:
      return state;
  }
};

export default loginReducer;
