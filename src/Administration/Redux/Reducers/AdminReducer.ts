import set from "lodash.set";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  LOAD_ADMIN_WORKFLOW,
  RESET_ADMIN,
  UPDATE_ADMIN,
  UPDATE_ADMINS,
} from "../Actions/AdminActions";
import adminState from "../State/AdminState";

const adminReducer = (state = adminState, action: IAction) => {
  switch (action.type) {
    case UPDATE_ADMIN: {
      const { path, value } = action.payload;
      const updatedState = set(state, path, value);

      return updatedState;
    }

    case UPDATE_ADMINS: {
      const { updateObj } = action.payload;

      return {
        ...state,
        ...updateObj,
      };
    }

    case LOAD_ADMIN_WORKFLOW: {
      return {
        ...state,
        loadAdminWorkflow: action.payload.name,
      };
    }

    case RESET_ADMIN: {
      return adminState;
    }

    default:
      return state;
  }
};

export default adminReducer;
