export const UPDATE_NEWPROJECT = "UPDATE_NEWPROJECT";
export const UPDATES_NEWPROJECT = "UPDATES_NEWPROJECT";
export const CREATE_NEWPROJECT = "CREATE_NEWPROJECT";
export const NEWPROJECT_SUCCESS = "NEWPROJECT_SUCCESS";
export const NEWPROJECT_FAILURE = "NEWPROJECT_FAILURE";
export const FETCHRECENTPROJECTS_REQUEST = "FETCHRECENTPROJECTS_REQUEST";
export const FETCHRECENTPROJECTS_SUCCESS = "FETCHRECENTPROJECTS_SUCCESS";
export const FETCHRECENTPROJECTS_FAILURE = "FETCHRECENTPROJECTS_FAILURE";
export const FETCHSTOREDPROJECTS_REQUEST = "FETCHSTOREDPROJECTS_REQUEST";
export const FETCHSTOREDPROJECTS_SUCCESS = "FETCHSTOREDPROJECTS_SUCCESS";
export const FETCHSTOREDPROJECTS_FAILURE = "FETCHSTOREDPROJECTS_FAILURE";
export const OPENRECENTPROJECT_REQUEST = "OPENRECENTPROJECT_REQUEST";
export const OPENRECENTPROJECT_SUCCESS = "OPENRECENTPROJECT_SUCCESS";
export const OPENRECENTPROJECT_FAILURE = "OPENRECENTPROJECT_FAILURE";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const updateProjectParameterAction = (name: string, value: string) => {
  return {
    type: UPDATE_NEWPROJECT,
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
    type: UPDATES_NEWPROJECT,
    payload: {
      updateObj,
    },
  };
};

export const fetchRecentProjectsAction = () => {
  return {
    type: FETCHRECENTPROJECTS_REQUEST,
    payload: {},
  };
};

export const fetchRecentProjectsSuccessAction = () => {
  return {
    type: FETCHRECENTPROJECTS_SUCCESS,
    payload: {
      status: 0,
      data: [],
    },
  };
};

export const fetchRecentProjectsFailureAction = () => {
  return {
    type: FETCHRECENTPROJECTS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchStoredProjectsAction = () => {
  return {
    type: FETCHSTOREDPROJECTS_REQUEST,
  };
};

export const fetchStoredProjectsSuccessAction = () => {
  return {
    type: FETCHSTOREDPROJECTS_SUCCESS,
    payload: {
      status: 0,
      data: [],
    },
  };
};

export const fetchStoredProjectsFailureAction = () => {
  return {
    type: FETCHSTOREDPROJECTS_FAILURE,
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
    type: OPENRECENTPROJECT_REQUEST,
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
    type: OPENRECENTPROJECT_SUCCESS,
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
    type: OPENRECENTPROJECT_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const createNewProjectAction = () => {
  return {
    type: CREATE_NEWPROJECT,
    payload: {},
  };
};

export const createNewProjectSuccessAction = () => {
  return {
    type: NEWPROJECT_SUCCESS,
    payload: {
      status: 0,
      data: [],
    },
  };
};

export const createNewProjectFailureAction = () => {
  return {
    type: NEWPROJECT_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};
