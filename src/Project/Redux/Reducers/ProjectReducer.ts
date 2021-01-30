import { LOGOUT_REQUEST } from "../../../Application/Redux/Actions/LogoutActions";
import {
  CREATE_NEWPROJECT,
  NEWPROJECT_SUCCESS,
  NEWPROJECT_FAILURE,
  UPDATE_NEWPROJECT,
  FETCHRECENTPROJECTS_SUCCESS,
  FETCHRECENTPROJECTS_FAILURE,
  OPENRECENTPROJECT_SUCCESS,
} from "../Actions/ProjectActions";
import projectState from "../State/ProjectState";

const projectReducer = (
  state = projectState,
  action: {
    type: string;
    name: string;
    value: unknown;
    meta: { exclusive: boolean };
    payload: Record<string, string>;
  }
) => {
  switch (action.type) {
    case UPDATE_NEWPROJECT: {
      const { name, value } = action.payload;

      return {
        ...state,
        [name]: value,
      };
    }

    case FETCHRECENTPROJECTS_SUCCESS: {
      const { statusCode, recentProjects } = action.payload;

      return {
        ...state,
        statusCode,
        recentProjects,
      };
    }

    case FETCHRECENTPROJECTS_FAILURE: {
      const { statusCode, errors } = action.payload;

      return {
        ...state,
        statusCode,
        errors,
      };
    }

    case OPENRECENTPROJECT_SUCCESS: {
      const {
        statusCode,
        projectId,
        projectTitle,
        projectDescription,
      } = action.payload;

      return {
        ...state,
        statusCode,
        projectId,
        projectTitle,
        projectDescription,
      };
    }

    case CREATE_NEWPROJECT: {
      const { id } = action.payload;

      return {
        ...state,
        projectId: id,
      };
    }

    case NEWPROJECT_SUCCESS: {
      const { statusCode, id } = action.payload;

      return {
        ...state,
        statusCode,
        projectId: id,
      };
    }

    case NEWPROJECT_FAILURE: {
      const { statusCode, error } = action.payload;

      return {
        ...state,
        statusCode,
        error,
      };
    }

    case LOGOUT_REQUEST:
      return { ...state, undefined };

    default:
      return state;
  }
};

export default projectReducer;
