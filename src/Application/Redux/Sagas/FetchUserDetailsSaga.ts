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
  | PutEffect<{ payload: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;

  const config = {
    withCredentials: true,
  };
  const fetchUserDetailsAPI = (url: string) => authService.get(url, config);

  try {
    const response = yield call(
      fetchUserDetailsAPI,
      `${getBaseAuthUrl()}/currentuser`
    );

    const {
      data: { status, id, email, username },
    } = response;
    console.log(
      "Logged output --> ~ file: FetchUserDetailsSaga.ts ~ line 59 ~ response",
      response
    );

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
  } finally {
    yield put(hideSpinnerAction());
  }
}
