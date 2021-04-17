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
  fetchMatchObjectFailureAction,
  fetchMatchObjectSuccessAction,
  FETCH_MATCHOBJECT_REQUEST,
} from "../Actions/ApplicationActions";
import { hideSpinnerAction } from "../Actions/UISpinnerActions";
import getBaseUrl, { getBaseAuthUrl } from "../../Services/BaseUrlService";

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
  | PutEffect<{ payload: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;

  const config = {
    withCredentials: false,
  };
  const fetchMatchObjectAPI = (url: string) => authService.get(url, config);

  try {
    const result = yield call(
      fetchMatchObjectAPI,
      `${getBaseUrl()}/header-matching`
    );

    const { data: savedMatchObjectAll } = result;
    console.log(
      "Logged output --> ~ file: FetchMatchObjectSaga.ts ~ line 61 ~ savedMatchObjectAll",
      savedMatchObjectAll
    );

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
