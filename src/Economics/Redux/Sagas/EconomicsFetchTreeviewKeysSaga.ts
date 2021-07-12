import jsonpipe from "jsonpipe";
import { END, eventChannel } from "redux-saga";
import {
  actionChannel,
  ActionChannelEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  take,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../../Application/Redux/Actions/UISpinnerActions";
import getBaseEconomicsUrl from "../../../Application/Services/BaseUrlService";
import history from "../../../Application/Services/HistoryService";
import {
  fetchEconomicsTreeviewKeysFailureAction,
  fetchEconomicsTreeviewKeysSuccessAction,
  ECONOMICS_TREEVIEWKEYS_REQUEST,
} from "../Actions/EconomicsActions";

export default function* watchFetchTreeviewKeysSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const treeviewKeysChan = yield actionChannel(ECONOMICS_TREEVIEWKEYS_REQUEST);
  yield takeLeading(treeviewKeysChan, fetchTreeviewKeysSaga);
}

function* fetchTreeviewKeysSaga(action: IAction): Generator<
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{
      payload: any;
      type: string;
    }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { selectedForecastingResultsId: forecastId } = yield select(
    (state) => state.forecastReducer
  );
  const url = `${getBaseEconomicsUrl()}/forecastResults/treeview/${forecastId}`;

  const message = "Loading economics chart data...";

  try {
    yield put(showSpinnerAction(message));

    const successAction = fetchEconomicsTreeviewKeysSuccessAction();
  } catch (errors) {
    const failureAction = fetchEconomicsTreeviewKeysFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    // yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
