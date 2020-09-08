import { call, put, takeLatest } from "redux-saga/effects";
import * as authService from "../../Services/AuthService";
import history from "./../../Services/HistoryService";
import {
  registerFailureAction,
  registerSuccessAction,
  REGISTER_REQUEST,
} from "./../Actions/RegisterActions";
import { hideSpinnerAction } from "./../Actions/UISpinnerActions";

export default function* watchRegisterSaga() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
}

function* registerSaga(action) {
  const { payload } = action;
  const {
    userName,
    firstName,
    middleName,
    lastName,
    email,
    mobileNumber,
    role,
    avatarURL,
  } = payload;

  const data = {
    title: userName,
    body: firstName,
  };
  const config = { headers: null };
  const registerAPI = (url) => authService.post(url, data, config);
  const statusCode = ""; //Get from success response

  try {
    const result = yield call(
      registerAPI,
      "https://jsonplaceholder.typicode.com/posts"
    );

    const successAction = registerSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode: statusCode, result },
    });

    yield call(forwardTo, "/apex"); //put --> show snackbar, reset registration form
  } catch (errors) {
    const failureAction = registerFailureAction();
    yield put({
      ...failureAction,
      payload: { ...payload, statusCode: statusCode, errors: errors },
    });
  }

  yield put(hideSpinnerAction());
}

function forwardTo(routeUrl) {
  history.push(routeUrl);
}
