export const PERSIST_STORE = "PERSIST_STORE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const persistToStoreAction = (name: string, value: string) => {
  return {
    type: PERSIST_STORE,
    payload: {
      name,
      value,
    },
  };
};

export const loginAction = (userName: string, password: string) => {
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
      statusCode: 0,
      userId: "", //In token or by itself?
      token: "",
    },
  };
};

export const loginFailureAction = () => {
  return {
    type: LOGIN_FAILURE,
    payload: {
      statusCode: 0,
      errors: { message: "" },
    },
  };
};
