import { call, put, takeLatest } from "redux-saga/effects";
import * as authService from "../../Services/AuthService";
import history from "../../Services/HistoryService";
import { IAction } from "../Actions/ActionTypes";
import {
  registerFailureAction,
  registerSuccessAction,
  REGISTER_REQUEST,
} from "../Actions/RegisterActions";
import { hideSpinnerAction } from "../Actions/UISpinnerActions";

export default function* watchRegisterSaga() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
}

function* registerSaga(action: IAction) {
  const { payload } = action;
  const {
    userName,
    firstName,
    // middleName,
    // lastName,
    // email,
    // mobileNumber,
    // role,
    // avatarUrl,
  } = payload;

  const data = {
    title: userName,
    body: firstName,
  };
  const config = { headers: null };
  const registerAPI = (url: string) => authService.post(url, data, config);
  const statusCode = ""; //Get from success response

  try {
    const data = yield call(
      registerAPI,
      "https://jsonplaceholder.typicode.com/posts"
    );

    const successAction = registerSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, data },
    });

    yield call(forwardTo, "/apex"); //put --> show snackbar, reset registration form
  } catch (errors) {
    const failureAction = registerFailureAction();
    yield put({
      ...failureAction,
      payload: { ...payload, statusCode, errors },
    });
  }

  yield put(hideSpinnerAction());
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
