import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { UPDATE_SELECTEDIDTITLE } from "../../../Application/Redux/Actions/ApplicationActions";
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
  UPDATES_NEWPROJECT,
} from "../Actions/ProjectActions";
import projectState from "../State/ProjectState";

const projectReducer = (state = projectState, action: IAction) => {
  switch (action.type) {
    case UPDATE_NEWPROJECT: {
      const { name, value } = action.payload;

      return {
        ...state,
        [name]: value,
      };
    }

    case UPDATES_NEWPROJECT: {
      const { updateObj } = action.payload;

      return {
        ...state,
        ...updateObj,
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
        currentProjectId: projectId,
        currentProjectTitle: projectTitle,
        currentProjectDescription: projectDescription,
      };
    }

    case NEWPROJECT_SUCCESS: {
      const {
        status,
        currentProjectId,
        currentProjectTitle,
        currentProjectDescription,
      } = action.payload;

      return {
        ...state,
        status,
        currentProjectId,
        currentProjectTitle,
        currentProjectDescription,
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

    case UPDATE_SELECTEDIDTITLE: {
      const { reducer, idTitleObj } = action.payload;

      if (reducer === "projectReducer") {
        return {
          ...state,
          ...idTitleObj,
        };
      } else {
        return state;
      }
    }

    default:
      return state;
  }
};

export default projectReducer;
