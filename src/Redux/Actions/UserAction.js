import history from "../../General/Services/HistoryService";
import authService from "../services/authService";

export const LOGIN_USER_COMMENCE = "LOGIN_USER_COMMENCE";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const REGISTER_USER_COMMENCE = "REGISTER_USER_COMMENCE";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

export const loginUserAction = (email, password, rememberMe) => (
  dispatch,
  getState,
  http
) => {
  dispatch({
    type: LOGIN_USER_COMMENCE,
    payload: { Submitting: true, formErrors: [] },
  });

  const { httpLogin } = http;

  httpLogin("post", "/Account/Login", {
    email: email,
    password: password,
    rememberMe: rememberMe,
  })
    .then((response) => {
      const { token } = response.data;
      sessionStorage.clear();
      sessionStorage.setItem("token", token);

      return dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { token: token, Submitting: false, isAuthenticated: true },
      });
    })
    .then((response) => {
      const role = authService("Identity").Role;

      if (role === "Admin") history.replace("/Auth/register");
      else history.replace("/Auth/verification");
    })
    .catch((errors) => {
      if (errors.response) {
        const responseErrors = errors.response.data;
        alert(responseErrors["Errors"]);

        dispatch({
          type: LOGIN_USER_FAILURE,
          payload: {
            formErrors: responseErrors,
            Submitting: false,
            isAuthenticated: false,
          },
        });
      }
    });

  dispatch({
    type: LOAD_ROLES_COMMENCE,
    payload: { roles: [], Loading: true, formErrors: false },
  });
};

export const registerUserAction = (
  firstname,
  middlename,
  lastname,
  nickname,
  role,
  mobilenumber,
  email,
  password,
  confirmpassword
) => (dispatch, getState, http) => {
  const { httpRegister } = http;

  dispatch({
    type: REGISTER_USER_COMMENCE,
    payload: { Submitting: true, formErrors: [] },
  });

  httpRegister("post", "Admin/Register", null, {
    firstname: firstname,
    middlename: middlename,
    lastname: lastname,
    nickname: nickname,
    role: role,
    mobilenumber: mobilenumber,
    email: email,
    password: password,
    confirmpassword: confirmpassword,
  })
    .then((response) => {
      if (
        response.data.message === "Registration Succeeded!" &&
        response.status === 200
      ) {
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: {
            Submitting: false,
            formErrors: [],
            registrationSucceeded: true,
          },
        });
      }
      history.replace(`/Auth/registration_success`);
    })
    .catch((errors) => {
      if (errors.response) {
        const responseErrors = errors.response.data;
        alert(responseErrors["Errors"]);

        dispatch({
          type: REGISTER_USER_FAILURE,
          payload: { Submitting: false, responseErrors: responseErrors },
        });
      }
    });
};
