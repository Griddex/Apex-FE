export const CREATE_NEWPROJECT = "CREATE_NEWPROJECT";
export const NEWPROJECT_SUCCESS = "NEWPROJECT_SUCCESS";
export const NEWPROJECT_FAILURE = "NEWPROJECT_FAILURE";
import { DialogStuff } from "./../../Components/Dialogs/DialogTypes";

export const createNewProjectAction = (
  projectName: string,
  projectDescription: string,
  successDialogParameters: DialogStuff,
  failureDialogParameters: DialogStuff
) => {
  return {
    type: CREATE_NEWPROJECT,
    payload: {
      projectName,
      projectDescription,
      successDialogParameters,
      failureDialogParameters,
    },
  };
};

export const newProjectSuccessAction = () => {
  return {
    type: NEWPROJECT_SUCCESS,
    payload: {
      statusCode: "",
      result: "",
    },
  };
};

export const newProjectFailureAction = () => {
  return {
    type: NEWPROJECT_FAILURE,
    payload: {
      statusCode: "",
      errors: [],
    },
  };
};
