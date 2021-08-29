export const LOAD_USER_WORKFLOW = "LOAD_USER_WORKFLOW";
export const UPDATE_REGISTRATION = "UPDATE_REGISTRATION";
export const PERSIST_USER_AVATAR = "PERSIST_USER_AVATAR";
export const USER_REGISTRATION_REQUEST = "USER_REGISTRATION_REQUEST";
export const USER_REGISTRATION_SUCCESS = "USER_REGISTRATION_SUCCESS";
export const USER_REGISTRATION_FAILURE = "USER_REGISTRATION_FAILURE";
export const RESET_USER = "RESET_USER";

export const loadUserWorkflowAction = (name?: string) => {
  return {
    type: LOAD_USER_WORKFLOW,
    payload: {
      name,
    },
  };
};

export const updateRegistrationFormAction = (
  name: string,
  value: React.Key
) => {
  return {
    type: UPDATE_REGISTRATION,
    payload: {
      name,
      value,
    },
  };
};

export const persistUserAvatarAction = (avatarUrl: string) => {
  return {
    type: PERSIST_USER_AVATAR,
    payload: {
      avatarUrl,
    },
  };
};

export const registerUserRequestAction = (
  userName: string,
  email: string,
  password: string
  // middleName: string,
  // lastName: string,
  // mobileNumber: string,
  // role: string,
  // avatarUrl: string
) => {
  return {
    type: USER_REGISTRATION_REQUEST,
    payload: {
      userName,
      email,
      password,
      // firstName,
      // middleName,
      // lastName,
      // mobileNumber,
      // role,
      // avatarUrl,
    },
    meta: { addAuth: true, message: `Registering ${userName}` },
  };
};

export const registerUserSuccessAction = () => {
  return {
    type: USER_REGISTRATION_SUCCESS,
    payload: {
      status: 0,
      data: [],
    },
  };
};

export const registerUserFailureAction = () => {
  return {
    type: USER_REGISTRATION_FAILURE,
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
