import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { UPDATE_SELECTEDIDTITLE } from "../../../Application/Redux/Actions/ApplicationActions";
import {
  CREATE_PROJECT_REQUEST,
  FETCH_RECENTPROJECTS_FAILURE,
  FETCH_RECENTPROJECTS_SUCCESS,
  FETCH_STORED_PROJECTS_FAILURE,
  FETCH_STORED_PROJECTS_SUCCESS,
  CREATE_PROJECT_FAILURE,
  CREATE_PROJECT_SUCCESS,
  OPEN_RECENTPROJECT_SUCCESS,
  UPDATE_CREATE_PROJECT,
  UPDATES_CREATE_PROJECT,
} from "../Actions/ProjectActions";
import projectState from "../State/ProjectState";

const projectReducer = (state = projectState, action: IAction) => {
  switch (action.type) {
    case UPDATE_CREATE_PROJECT: {
      const { name, value } = action.payload;

      return {
        ...state,
        [name]: value,
      };
    }

    case UPDATES_CREATE_PROJECT: {
      const { updateObj } = action.payload;

      return {
        ...state,
        ...updateObj,
      };
    }

    case FETCH_RECENTPROJECTS_SUCCESS: {
      const { status, recentProjects } = action.payload;

      return {
        ...state,
        status,
        recentProjects,
      };
    }

    case FETCH_RECENTPROJECTS_FAILURE: {
      const { status, errors } = action.payload;

      return {
        ...state,
        status,
        errors,
      };
    }

    case FETCH_STORED_PROJECTS_SUCCESS: {
      const { status, storedProjects } = action.payload;

      return {
        ...state,
        status,
        storedProjects,
      };
    }

    case FETCH_STORED_PROJECTS_FAILURE: {
      const { status, errors } = action.payload;

      return {
        ...state,
        status,
        errors,
      };
    }

    case OPEN_RECENTPROJECT_SUCCESS: {
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

    case CREATE_PROJECT_SUCCESS: {
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

    case CREATE_PROJECT_FAILURE: {
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
