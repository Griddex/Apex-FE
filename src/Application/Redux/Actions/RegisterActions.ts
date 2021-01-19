export const PERSIST_AVATAR = "PERSIST_AVATAR";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

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
      statusCode: "",
      data: "",
    },
  };
};

export const registerFailureAction = () => {
  return {
    type: REGISTER_FAILURE,
    payload: {
      statusCode: "",
      errors: [],
    },
  };
};
