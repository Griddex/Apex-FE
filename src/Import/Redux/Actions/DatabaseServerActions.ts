import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const CONNECTDATABASE_REQUEST = "CONNECTDATABASE_REQUEST";
export const CONNECTDATABASE_SUCCESS = "CONNECTDATABASE_SUCCESS";
export const CONNECTDATABASE_FAILURE = "CONNECTDATABASE_FAILURE";

export const connectDatabaseRequestAction = (
  authenticationType: string,
  userName: string,
  password: string,
  successDialogParameters: DialogStuff,
  failureDialogParameters: DialogStuff
) => {
  return {
    type: CONNECTDATABASE_REQUEST,
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

export const connectDatabaseSuccessAction = () => {
  return {
    type: CONNECTDATABASE_SUCCESS,
    payload: {
      status: 0,
      databases: [],
    },
  };
};

export const connectDatabaseFailureAction = () => {
  return {
    type: CONNECTDATABASE_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};
