import { actionChannel, call, put, takeLeading } from "redux-saga/effects";
import * as authService from "../../Services/AuthService";
import history from "../../Services/HistoryService";
import { IAction } from "../Actions/ActionTypes";
import {
  loginFailureAction,
  loginSuccessAction,
  LOGIN_REQUEST,
} from "../Actions/LoginActions";
import { hideSpinnerAction } from "../Actions/UISpinnerActions";

export default function* watchLoginSaga() {
  const loginChan = yield actionChannel(LOGIN_REQUEST);
  yield takeLeading(loginChan, loginSaga);
}

function* loginSaga(action: IAction) {
  const { payload } = action;
  const { userName, password } = payload;

  const data = {
    title: userName,
    body: password,
  };
  const config = { headers: null };
  const loginAPI = (url: string) => authService.post(url, data, config);

  try {
    const response = yield call(
      loginAPI,
      "https://jsonplaceholder.typicode.com/posts"
    );

    const { statusCode, userId, token } = response;
    const successAction = loginSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, userId, token },
    });

    yield call(forwardTo, "/apex");
  } catch (errors) {
    const failureAction = loginFailureAction();
    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });
  } finally {
    yield put(hideSpinnerAction());
  }
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
