import { AxiosResponse } from "axios";
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
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredForecastResultsSuccessFailureDialogParameters";
import {
  fetchTreeviewKeysFailureAction,
  fetchTreeviewKeysSuccessAction,
  TREEVIEWKEYS_REQUEST,
} from "../Actions/ForecastActions";
import history from "../../../Application/Services/HistoryService";

export default function* watchFetchTreeviewKeysSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const treeviewKeysChan = yield actionChannel(TREEVIEWKEYS_REQUEST);
  yield takeLeading(treeviewKeysChan, fetchTreeviewKeysSaga);
}

const config = { withCredentials: false };

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
  const url = `${getBaseForecastUrl()}/forecastResults/treeview/${forecastId}`;

  const message = "Loading forecast chart data...";

  try {
    yield put(showSpinnerAction(message));

    const chan = yield call(updateTreeAndKeys, url);

    while (true) {
      const treeOrKeys = yield take(chan);

      const successAction = fetchTreeviewKeysSuccessAction();
      if (Object.keys(treeOrKeys)[0] === "tree") {
        const forecastTree = treeOrKeys["tree"];
        yield put({
          ...successAction,
          payload: {
            ...payload,
            keyVar: "forecastTree",
            forecastTree,
          },
        });
      } else if (Object.keys(treeOrKeys)[0] === "keys") {
        const forecastKeys = treeOrKeys["keys"];
        yield put({
          ...successAction,
          payload: {
            ...payload,
            keyVar: "forecastKeys",
            forecastKeys,
          },
        });
      }
    }
  } catch (errors) {
    const failureAction = fetchTreeviewKeysFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
    yield put(hideSpinnerAction());
  } finally {
    yield call(forwardTo, "/apex/forecast/forecastvisualytics");
  }
}

function updateTreeAndKeys(url: string) {
  return eventChannel((emitter) => {
    jsonpipe.flow(url, {
      method: "GET",
      // data: JSON.stringify(reqPayload),
      headers: { "Content-Type": "application/json; charset=utf-8" },
      disableContentType: true,
      withCredentials: false,
      success: function (chunk) {
        emitter(chunk);
      },
      error: function (chunk) {
        emitter(END);
      },
      complete: function (chunk) {
        emitter(END);
      },
    });

    return () => {
      emitter(END);
    };
  });
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
