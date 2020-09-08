export const PERSIST_STORE = "PERSIST_STORE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const persistToStoreAction = (name, value) => {
  return {
    type: PERSIST_STORE,
    payload: {
      name,
      value,
    },
  };
};

export const loginAction = (userName, password) => {
  return {
    type: LOGIN_REQUEST,
    payload: {
      userName,
      password,
    },
    meta: { showSpinner: true, message: "Logging in..." },
  };
};

export const loginSuccessAction = () => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      statusCode: "",
      token: "",
    },
  };
};

export const loginFailureAction = () => {
  return {
    type: LOGIN_FAILURE,
    payload: {
      statusCode: "",
      errors: [],
    },
  };
};
