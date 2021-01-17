import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const SERVERLOGIN_REQUEST = "SERVERLOGIN_REQUEST";
export const SERVERLOGIN_SUCCESS = "SERVERLOGIN_SUCCESS";
export const SERVERLOGIN_FAILURE = "SERVERLOGIN_FAILURE";

export const serverLoginRequestAction = (
  authenticationType: string,
  userName: string,
  password: string,
  successDialogParameters: DialogStuff,
  failureDialogParameters: DialogStuff
) => {
  return {
    type: SERVERLOGIN_REQUEST,
    payload: {
      authenticationType,
      userName,
      password,
      successDialogParameters,
      failureDialogParameters,
    },
    meta: { showSpinner: true, message: "Connecting to database..." },
  };
};

export const serverLoginSuccessAction = () => {
  return {
    type: SERVERLOGIN_SUCCESS,
    payload: {
      statusCode: "",
      databases: [],
    },
  };
};

export const serverLoginFailureAction = () => {
  return {
    type: SERVERLOGIN_FAILURE,
    payload: {
      statusCode: "",
      errors: [],
    },
  };
};
