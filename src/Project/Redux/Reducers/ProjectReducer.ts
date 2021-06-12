import {
  CREATE_NEWPROJECT,
  FETCHRECENTPROJECTS_FAILURE,
  FETCHRECENTPROJECTS_SUCCESS,
  FETCHSTOREDPROJECTS_FAILURE,
  FETCHSTOREDPROJECTS_SUCCESS,
  NEWPROJECT_FAILURE,
  NEWPROJECT_SUCCESS,
  OPENRECENTPROJECT_SUCCESS,
  UPDATE_NEWPROJECT,
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
      const { status, recentProjects } = action.payload;

      return {
        ...state,
        status,
        recentProjects,
      };
    }

    case FETCHRECENTPROJECTS_FAILURE: {
      const { status, errors } = action.payload;

      return {
        ...state,
        status,
        errors,
      };
    }

    case FETCHSTOREDPROJECTS_SUCCESS: {
      const { status, storedProjects } = action.payload;

      return {
        ...state,
        status,
        storedProjects,
      };
    }

    case FETCHSTOREDPROJECTS_FAILURE: {
      const { status, errors } = action.payload;

      return {
        ...state,
        status,
        errors,
      };
    }

    case OPENRECENTPROJECT_SUCCESS: {
      const { status, projectId, projectTitle, projectDescription } =
        action.payload;

      return {
        ...state,
        status,
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
      const { status, id } = action.payload;

      return {
        ...state,
        status,
        projectId: id,
      };
    }

    case NEWPROJECT_FAILURE: {
      const { status, error } = action.payload;

      return {
        ...state,
        status,
        error,
      };
    }

    default:
      return state;
  }
};

export default projectReducer;
