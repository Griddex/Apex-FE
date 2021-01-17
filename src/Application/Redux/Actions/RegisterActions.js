export const PERSIST_AVATAR = "PERSIST_AVATAR";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const persistAvatarToReduxAction = (avatarUrl) => {
  return {
    type: PERSIST_AVATAR,
    payload: {
      avatarUrl,
    },
  };
};

export const registerAction = (
  userName,
  firstName,
  middleName,
  lastName,
  email,
  mobileNumber,
  role,
  avatarUrl
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
      result: "",
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
