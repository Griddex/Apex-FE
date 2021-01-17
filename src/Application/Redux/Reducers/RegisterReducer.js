import UserState from "../State/UserState";
import {
  PERSIST_AVATAR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./../Actions/RegisterActions";

const registerReducer = (state = UserState, action) => {
  switch (action.type) {
    case PERSIST_AVATAR:
      return {
        ...state,
        avatarUrl: action.payload.avatarUrl,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        statusCode: action.payload.statusCode,
        errors: new Array(action.payload.errors),
      };
    default:
      return { ...state };
  }
};

export default registerReducer;
