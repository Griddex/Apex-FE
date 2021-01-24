export const UPDATE_NEWPROJECT = "UPDATE_NEWPROJECT";
export const CREATE_NEWPROJECT = "CREATE_NEWPROJECT";
export const NEWPROJECT_SUCCESS = "NEWPROJECT_SUCCESS";
export const NEWPROJECT_FAILURE = "NEWPROJECT_FAILURE";
export const FETCHRECENTPROJECTS_REQUEST = "FETCHRECENTPROJECTS_REQUEST";
export const FETCHRECENTPROJECTS_SUCCESS = "FETCHRECENTPROJECTS_SUCCESS";
export const FETCHRECENTPROJECTS_FAILURE = "FETCHRECENTPROJECTS_FAILURE";
export const OPENRECENTPROJECT_REQUEST = "OPENRECENTPROJECT_REQUEST";
export const OPENRECENTPROJECT_SUCCESS = "OPENRECENTPROJECT_SUCCESS";
export const OPENRECENTPROJECT_FAILURE = "OPENRECENTPROJECT_FAILURE";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const updateProjectAction = (name: string, value: string) => {
  return {
    type: UPDATE_NEWPROJECT,
    payload: {
      name,
      value,
    },
  };
};

export const fetchRecentProjectsAction = (
  failureDialogParameters: DialogStuff
) => {
  return {
    type: FETCHRECENTPROJECTS_REQUEST,
    payload: { failureDialogParameters },
  };
};

export const fetchRecentProjectsSuccessAction = () => {
  return {
    type: FETCHRECENTPROJECTS_SUCCESS,
    payload: {
      statusCode: 0,
      data: [],
    },
  };
};

export const fetchRecentProjectsFailureAction = () => {
  return {
    type: FETCHRECENTPROJECTS_FAILURE,
    payload: {
      statusCode: 0,
      errors: [],
    },
  };
};

export const openRecentProjectAction = (userId: string, projectId: string) => {
  return {
    type: OPENRECENTPROJECT_REQUEST,
    payload: {
      userId,
      projectId,
    },
  };
};

export const openRecentProjectSuccessAction = () => {
  return {
    type: OPENRECENTPROJECT_SUCCESS,
    payload: {
      statusCode: 0,
      data: [],
    },
  };
};

export const openRecentProjectFailureAction = () => {
  return {
    type: OPENRECENTPROJECT_FAILURE,
    payload: {
      statusCode: 0,
      errors: [],
    },
  };
};

export const createNewProjectAction = (
  projectName: string,
  projectDescription: string,
  dayFormat: string,
  monthFormat: string,
  yearFormat: string,
  pressureAddend: number,
  successDialogParameters: DialogStuff,
  failureDialogParameters: DialogStuff
) => {
  return {
    type: CREATE_NEWPROJECT,
    payload: {
      projectName,
      projectDescription,
      dayFormat,
      monthFormat,
      yearFormat,
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
      statusCode: 0,
      data: [],
    },
  };
};

export const createNewProjectFailureAction = () => {
  return {
    type: NEWPROJECT_FAILURE,
    payload: {
      statusCode: 0,
      errors: [],
    },
  };
};
