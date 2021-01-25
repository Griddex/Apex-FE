export const UPDATE_REGISTRATION = "UPDATE_REGISTRATION";
export const PERSIST_AVATAR = "PERSIST_AVATAR";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

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

export const persistAvatarToReduxAction = (avatarUrl: string) => {
  return {
    type: PERSIST_AVATAR,
    payload: {
      avatarUrl,
    },
  };
};

export const registerAction = (
  userName: string,
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  mobileNumber: string,
  role: string,
  avatarUrl: string
) => {
  return {
    type: REGISTER_REQUEST,
    payload: {
      userName,
      firstName,
      middleName,
      lastName,
      email,
      mobileNumber,
      role,
      avatarUrl,
    },
    meta: { addAuth: true, message: `Registering ${userName}` },
  };
};

export const registerSuccessAction = () => {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      statusCode: 0,
      data: [],
    },
  };
};

export const registerFailureAction = () => {
  return {
    type: REGISTER_FAILURE,
    payload: {
      statusCode: 0,
      errors: { message: "" },
    },
  };
};
