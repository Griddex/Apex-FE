import {
  actionChannel,
  ActionChannelEffect,
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  SelectEffect,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import * as authService from "../../Services/AuthService";
import { getBaseAuthUrl } from "../../Services/BaseUrlService";
import history from "../../Services/HistoryService";
import { IAction } from "../Actions/ActionTypes";
import { loginFailureAction, LOGIN_REQUEST } from "../Actions/LoginActions";
import { showSpinnerAction } from "./../Actions/UISpinnerActions";

export default function* watchLoginSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const loginChan = yield actionChannel(LOGIN_REQUEST);
  yield takeLeading(loginChan, loginSaga);
}

function* loginSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { userName, password } = payload;

  const data = {
    email: userName,
    password: password,
  };
  const config = { withCredentials: false };
  const loginAPI = (url: string) => authService.post(url, data, config);

  yield put(showSpinnerAction("Logging in..."));

  try {
    const response = yield call(loginAPI, `${getBaseAuthUrl()}/signin`);
    const { status, data } = response;
    const token = data["access-token"];
    sessionStorage.setItem("token", token);

    if (status === 200) {
      yield put({ type: "FETCH_USERDETAILS_REQUEST", payload: {} });
    }
    yield call(forwardTo, "/apex");
  } catch (errors) {
    const failureAction = loginFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });
  }
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
