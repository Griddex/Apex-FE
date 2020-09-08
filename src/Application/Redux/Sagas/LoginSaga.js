import { call, put, takeLatest } from "redux-saga/effects";
import * as authService from "../../Services/AuthService";
import history from "./../../Services/HistoryService";
import {
  loginFailureAction,
  loginSuccessAction,
  LOGIN_REQUEST,
} from "./../Actions/LoginActions";
import { hideSpinnerAction } from "./../Actions/UISpinnerActions";

export default function* watchLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

function* loginSaga(action) {
  const { payload } = action;
  const { userName, password } = payload;

  const data = {
    title: userName,
    body: password,
  };
  const config = { headers: null };
  const loginAPI = (url) => authService.post(url, data, config);
  const statusCode = "";

  try {
    const userToken = yield call(
      loginAPI,
      "https://jsonplaceholder.typicode.com/posts"
    );

    const successAction = loginSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode: statusCode, token: userToken },
    });

    yield call(forwardTo, "/apex");
  } catch (errors) {
    const failureAction = loginFailureAction();
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
