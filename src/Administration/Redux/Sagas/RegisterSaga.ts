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
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import history from "../../../Application/Services/HistoryService";
import {
  USER_REGISTRATION_REQUEST,
  registerUserSuccessAction,
  registerUserFailureAction,
} from "../Actions/UserActions";
import { getBaseAuthUrl } from "./../../../Application/Services/BaseUrlService";

export default function* watchRegisterSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const registerChan = yield actionChannel(USER_REGISTRATION_REQUEST);
  yield takeLeading(registerChan, registerSaga);
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* registerSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosPromise>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<IAction>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const {
    userName,
    email,
    password,
    firstName,
    middleName,
    lastName,
    mobileNumber,
    role,
    avatarUrl,
  } = payload;

  const data = {
    username: userName,
    email,
    password,
  };
  const config = { withCredentials: false };
  const registerAPI = (url: string) => authService.post(url, data, config);

  try {
    const result = yield call(registerAPI, `${getBaseAuthUrl()}/signup`);

    const {
      data: { status, data, succcess },
    } = result;
    const successAction = registerUserSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, data },
    });
  } catch (errors) {
    const failureAction = registerUserFailureAction();
    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });
    yield put(hideSpinnerAction());
  }
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
