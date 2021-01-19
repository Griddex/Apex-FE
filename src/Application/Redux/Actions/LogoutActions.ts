export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const logoutAction = () => {
  return {
    type: LOGOUT_REQUEST,
    payload: { isLoggedOut: true },
    meta: { showSpinner: true, message: "Logging out..." },
  };
};

export const logoutSuccessAction = () => {
  return {
    type: LOGOUT_SUCCESS,
    payload: {
      statusCode: "",
    },
  };
};

export const logoutFailureAction = () => {
  return {
    type: LOGOUT_FAILURE,
    payload: {
      statusCode: "",
      errors: [],
    },
  };
};
