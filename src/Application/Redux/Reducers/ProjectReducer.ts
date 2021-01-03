import {
  CREATE_NEWPROJECT,
  NEWPROJECT_SUCCESS,
  NEWPROJECT_FAILURE,
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
    case CREATE_NEWPROJECT: {
      const { projectName, projectDescription } = action.payload;

      return {
        ...state,
        projectName: projectName,
        projectDescription: projectDescription,
      };
    }

    case NEWPROJECT_SUCCESS: {
      const { statusCode, result } = action.payload;

      return {
        ...state,
        statusCode,
        result,
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

    default:
      return state;
  }
};

export default projectReducer;
