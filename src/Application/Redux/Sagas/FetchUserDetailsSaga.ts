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
import history from "../../Services/HistoryService";
import { IAction } from "../Actions/ActionTypes";
import {
  fetchUserDetailsFailureAction,
  fetchUserDetailsSuccessAction,
  FETCH_USERDETAILS_REQUEST,
} from "../Actions/LoginActions";
import { hideSpinnerAction } from "../Actions/UISpinnerActions";
import { getBaseAuthUrl } from "../../Services/BaseUrlService";

export default function* watchFetchUserDetailsSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const userChan = yield actionChannel(FETCH_USERDETAILS_REQUEST);
  yield takeLeading(userChan, fetchUserDetailsSaga);
}

function* fetchUserDetailsSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<IAction>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  console.log("payload current user: ", payload)

  const config = {
    withCredentials: false,
  };
  const fetchUserDetailsAPI = (url: string) => authService.get(url, config);

  try {
    console.log("getBaseAuthUrl(): ", getBaseAuthUrl())
    const response = yield call(
      fetchUserDetailsAPI,
      `${getBaseAuthUrl()}/profiles/currentuser`
    );

    const {
      data: { status, id, email, username },
    } = response;

    const successAction = fetchUserDetailsSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, userId: id, email, userName: username },
    });
  } catch (errors) {
    const failureAction = fetchUserDetailsFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });
    yield put(hideSpinnerAction());
  }
}
