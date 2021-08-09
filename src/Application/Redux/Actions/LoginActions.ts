export const PERSIST_STORE = "PERSIST_STORE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const FETCH_USERDETAILS_REQUEST = "FETCH_USERDETAILS_REQUEST";
export const FETCH_USERDETAILS_SUCCESS = "FETCH_USERDETAILS_SUCCESS";
export const FETCH_USERDETAILS_FAILURE = "FETCH_USERDETAILS_FAILURE";
export const RESET_USER = "RESET_USER";

export const persistToStoreAction = (name: string, value: string) => {
  return {
    type: PERSIST_STORE,
    payload: {
      name,
      value,
    },
  };
};

export const loginRequestAction = (userName: string, password: string) => {
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
      status: 0,
      userId: "", //In token or by itself?
      token: "",
    },
  };
};

export const loginFailureAction = () => {
  return {
    type: LOGIN_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const fetchUserDetailsRequestAction = () => {
  return {
    type: FETCH_USERDETAILS_REQUEST,
    payload: {},
    meta: { showSpinner: true, message: "Fetching user details..." },
  };
};

export const fetchUserDetailsSuccessAction = () => {
  return {
    type: FETCH_USERDETAILS_SUCCESS,
    payload: {
      status: 0,
    },
  };
};

export const fetchUserDetailsFailureAction = () => {
  return {
    type: FETCH_USERDETAILS_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};

export const resetUserAction = () => {
  return {
    type: RESET_USER,
  };
};
