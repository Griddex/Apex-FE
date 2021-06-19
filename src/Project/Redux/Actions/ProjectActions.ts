export const UPDATE_CREATE_PROJECT = "UPDATE_CREATE_PROJECT";
export const UPDATES_CREATE_PROJECT = "UPDATES_CREATE_PROJECT";
export const CREATE_PROJECT_REQUEST = "CREATE_PROJECT_REQUEST";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";
export const CREATE_PROJECT_FAILURE = "CREATE_PROJECT_FAILURE";
export const FETCH_RECENTPROJECTS_REQUEST = "FETCH_RECENTPROJECTS_REQUEST";
export const FETCH_RECENTPROJECTS_SUCCESS = "FETCH_RECENTPROJECTS_SUCCESS";
export const FETCH_RECENTPROJECTS_FAILURE = "FETCH_RECENTPROJECTS_FAILURE";
export const FETCH_STORED_PROJECTS_REQUEST = "FETCH_STORED_PROJECTS_REQUEST";
export const FETCH_STORED_PROJECTS_SUCCESS = "FETCH_STORED_PROJECTS_SUCCESS";
export const FETCH_STORED_PROJECTS_FAILURE = "FETCH_STORED_PROJECTS_FAILURE";
export const OPEN_RECENTPROJECT_REQUEST = "OPEN_RECENTPROJECT_REQUEST";
export const OPEN_RECENTPROJECT_SUCCESS = "OPEN_RECENTPROJECT_SUCCESS";
export const OPEN_RECENTPROJECT_FAILURE = "OPEN_RECENTPROJECT_FAILURE";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const updateProjectParameterAction = (name: string, value: string) => {
  return {
    type: UPDATE_CREATE_PROJECT,
    payload: {
      name,
      value,
    },
  };
};
export const updateProjectParametersAction = (
  updateObj: Record<string, any>
) => {
  return {
    type: UPDATES_CREATE_PROJECT,
    payload: {
      updateObj,
    },
  };
};

export const fetchRecentProjectsAction = () => {
  return {
    type: FETCH_RECENTPROJECTS_REQUEST,
    payload: {},
  };
};

export const fetchRecentProjectsSuccessAction = () => {
  return {
    type: FETCH_RECENTPROJECTS_SUCCESS,
    payload: {
      status: 0,
      data: [],
    },
  };
};

export const fetchRecentProjectsFailureAction = () => {
  return {
    type: FETCH_RECENTPROJECTS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredProjectsAction = () => {
  return {
    type: FETCH_STORED_PROJECTS_REQUEST,
  };
};

export const fetchStoredProjectsSuccessAction = () => {
  return {
    type: FETCH_STORED_PROJECTS_SUCCESS,
    payload: {
      status: 0,
      data: [],
    },
  };
};

export const fetchStoredProjectsFailureAction = () => {
  return {
    type: FETCH_STORED_PROJECTS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const openRecentProjectAction = (
  userId: string,
  projectId: string,
  projectTitle: string,
  projectDescription: string
) => {
  return {
    type: OPEN_RECENTPROJECT_REQUEST,
    payload: {
      userId,
      projectId,
      projectTitle,
      projectDescription,
    },
  };
};

export const openRecentProjectSuccessAction = () => {
  return {
    type: OPEN_RECENTPROJECT_SUCCESS,
    payload: {
      status: 0,
      projectId: "",
      projectTitle: "",
      projectDescription: "",
    },
  };
};

export const openRecentProjectFailureAction = () => {
  return {
    type: OPEN_RECENTPROJECT_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const createProjectAction = (titleDesc: Record<string, string>) => {
  return {
    type: CREATE_PROJECT_REQUEST,
    payload: { titleDesc },
  };
};

export const createProjectSuccessAction = () => {
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: {
      status: 0,
      data: [],
    },
  };
};

export const createProjectFailureAction = () => {
  return {
    type: CREATE_PROJECT_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};
