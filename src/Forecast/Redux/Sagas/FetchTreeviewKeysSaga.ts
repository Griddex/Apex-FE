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
import {
  TREEVIEWKEYS_REQUEST,
  fetchTreeviewKeysSuccessAction,
  fetchTreeviewKeysFailureAction,
} from "../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../../Application/Redux/Actions/UISpinnerActions";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredForecastResultsSuccessFailureDialogParameters";

export default function* watchFetchTreeviewKeysSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const treeviewKeysChan = yield actionChannel(TREEVIEWKEYS_REQUEST);
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
  } finally {
    yield put(hideSpinnerAction());
  }
}

function updateTreeAndKeys(url: string) {
  return eventChannel((emitter) => {
    jsonpipe.flow(url, {
      method: "GET",
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
