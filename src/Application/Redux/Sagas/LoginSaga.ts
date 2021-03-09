import {
  actionChannel,
  ActionChannelEffect,
  AllEffect,
  call,
  CallEffect,
  delay,
  ForkEffect,
  put,
  PutEffect,
  SelectEffect,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import * as authService from "../../Services/AuthService";
import history from "../../Services/HistoryService";
import { IAction } from "../Actions/ActionTypes";
import {
  loginFailureAction,
  loginSuccessAction,
  LOGIN_REQUEST,
} from "../Actions/LoginActions";
import { hideSpinnerAction } from "../Actions/UISpinnerActions";
import { getBaseAuthUrl } from "./../../Services/BaseUrlService";
import watchFetchUserDetailsSaga from "./FetchUserDetailsSaga";

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

  try {
    const response = yield call(loginAPI, `${getBaseAuthUrl()}/signin`);
    console.log(
      "Logged output --> ~ file: LoginSaga.ts ~ line 59 ~ response",
      response
    );
    const { status } = response;

    yield call(forwardTo, "/apex");
    if (status === 200) {
      yield put({ type: "FETCH_USERDETAILS_REQUEST", payload: {} });
    }
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
