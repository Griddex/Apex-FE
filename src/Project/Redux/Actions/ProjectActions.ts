export const UPDATE_PROJECT_PARAMETER = "UPDATE_PROJECT_PARAMETER";
export const UPDATE_PROJECT_PARAMETERS = "UPDATE_PROJECT_PARAMETERS";
export const CREATE_PROJECT_REQUEST = "CREATE_PROJECT_REQUEST";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";
export const CREATE_PROJECT_FAILURE = "CREATE_PROJECT_FAILURE";
export const FETCH_STORED_PROJECTS_REQUEST = "FETCH_STORED_PROJECTS_REQUEST";
export const FETCH_STORED_PROJECTS_SUCCESS = "FETCH_STORED_PROJECTS_SUCCESS";
export const FETCH_STORED_PROJECTS_FAILURE = "FETCH_STORED_PROJECTS_FAILURE";
export const OPEN_RECENTPROJECT_REQUEST = "OPEN_RECENTPROJECT_REQUEST";
export const OPEN_RECENTPROJECT_SUCCESS = "OPEN_RECENTPROJECT_SUCCESS";
export const OPEN_RECENTPROJECT_FAILURE = "OPEN_RECENTPROJECT_FAILURE";
export const RESET_PROJECT = "RESET_PROJECT";
export const CLOSE_PROJECT = "CLOSE_PROJECT";

export const updateProjectParameterAction = (name: string, value: string) => {
  return {
    type: UPDATE_PROJECT_PARAMETER,
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
    type: UPDATE_PROJECT_PARAMETERS,
    payload: {
      updateObj,
    },
  };
};

export const fetchStoredProjectsRequestAction = () => {
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

export const createProjectAction = (
  titleDesc: Record<string, string>,
  showSpinner: boolean
) => {
  return {
    type: CREATE_PROJECT_REQUEST,
    payload: { titleDesc },
    meta: { showSpinner },
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

export const resetProjectAction = () => {
  return {
    type: RESET_PROJECT,
  };
};

export const closeProjectAction = () => {
  return {
    type: CLOSE_PROJECT,
  };
};
