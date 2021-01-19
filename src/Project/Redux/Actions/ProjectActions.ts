export const CREATE_NEWPROJECT = "CREATE_NEWPROJECT";
export const NEWPROJECT_SUCCESS = "NEWPROJECT_SUCCESS";
export const NEWPROJECT_FAILURE = "NEWPROJECT_FAILURE";
export const RECENTPROJECTS_REQUEST = "RECENTPROJECTS_REQUEST";
export const LOAD_RECENTPROJECT_REQUEST = "LOAD_RECENTPROJECT_REQUEST";
export const LOAD_RECENTPROJECT_SUCCESS = "LOAD_RECENTPROJECT_SUCCESS";
export const LOAD_RECENTPROJECT_FAILURE = "LOAD_RECENTPROJECT_FAILURE";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const loadRecentProjectAction = (projectId: string) => {
  return {
    type: LOAD_RECENTPROJECT_REQUEST,
    payload: {
      projectId,
    },
  };
};
export const loadRecentProjectSuccessAction = () => {
  return {
    type: LOAD_RECENTPROJECT_SUCCESS,
    payload: {
      statusCode: "",
      data: "",
    },
  };
};

export const loadRecentProjectFailureAction = () => {
  return {
    type: LOAD_RECENTPROJECT_FAILURE,
    payload: {
      statusCode: "",
      errors: [],
    },
  };
};
export const fetchRecentProjectsAction = () => {
  return {
    type: RECENTPROJECTS_REQUEST,
    payload: {
      statusCode: "",
      data: "",
    },
  };
};

export const createNewProjectAction = (
  projectName: string,
  projectDescription: string,
  dateFormat: string,
  pressureAddend: number,
  successDialogParameters: DialogStuff,
  failureDialogParameters: DialogStuff
) => {
  return {
    type: CREATE_NEWPROJECT,
    payload: {
      projectName,
      projectDescription,
      dateFormat,
      pressureAddend,
      successDialogParameters,
      failureDialogParameters,
    },
  };
};

export const createNewProjectSuccessAction = () => {
  return {
    type: NEWPROJECT_SUCCESS,
    payload: {
      statusCode: "",
      data: "",
    },
  };
};

export const createNewProjectFailureAction = () => {
  return {
    type: NEWPROJECT_FAILURE,
    payload: {
      statusCode: "",
      errors: [],
    },
  };
};
