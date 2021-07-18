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
import getBaseForecastUrl from "../../Services/BaseUrlService";
import { IAction } from "../Actions/ActionTypes";
import {
  fetchMatchObjectFailureAction,
  fetchMatchObjectSuccessAction,
  FETCH_MATCHOBJECT_REQUEST,
} from "../Actions/ApplicationActions";
import { hideSpinnerAction } from "../Actions/UISpinnerActions";

export default function* watchFetchMatchObjectSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const userChan = yield actionChannel(FETCH_MATCHOBJECT_REQUEST);
  yield takeLeading(userChan, fetchMatchObjectSaga);
}

function* fetchMatchObjectSaga(
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

  const config = {
    withCredentials: true,
  };
  const fetchMatchObjectAPI = (url: string) => authService.get(url, config);

  try {
    const result = yield call(
      fetchMatchObjectAPI,
      `${getBaseForecastUrl()}/header-matching`
    );

    const { data: savedMatchObjectAll } = result;

    const successAction = fetchMatchObjectSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, savedMatchObjectAll },
    });
  } catch (errors) {
    const failureAction = fetchMatchObjectFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });
  } finally {
    yield put(hideSpinnerAction());
  }
}
