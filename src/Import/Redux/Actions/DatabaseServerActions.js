export const SERVERLOGIN_REQUEST = "SERVERLOGIN_REQUEST";
export const SERVERLOGIN_SUCCESS = "SERVERLOGIN_SUCCESS";
export const SERVERLOGIN_FAILURE = "SERVERLOGIN_FAILURE";

export const serverLoginRequestAction = (
  authenticationType,
  userName,
  password
) => {
  return {
    type: SERVERLOGIN_REQUEST,
    payload: {
      authenticationType,
      userName,
      password,
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
