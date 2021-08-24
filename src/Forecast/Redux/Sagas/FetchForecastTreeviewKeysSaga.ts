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
  SelectEffect,
  take,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { FORECAST_TREEVIEWKEYS_REQUEST } from "../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../../Application/Redux/Actions/UISpinnerActions";
import authHeaders from "../../../Application/Services/AuthHeaders";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredForecastResultsSuccessFailureDialogParameters";
import {
  fetchForecastTreeviewKeysFailureAction,
  fetchForecastTreeviewKeysSuccessAction,
  updateForecastResultsParametersAction,
} from "../Actions/ForecastActions";

export default function* watchFetchForecastTreeviewKeysSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const treeviewKeysChan = yield actionChannel(FORECAST_TREEVIEWKEYS_REQUEST);
  yield takeLeading(treeviewKeysChan, fetchForecastTreeviewKeysSaga);
}

function* fetchForecastTreeviewKeysSaga(action: IAction): Generator<
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
  const { idTitleDescIsSaved } = payload;
  const forecastId = idTitleDescIsSaved.selectedForecastingResultsId;

  const url = `${getBaseForecastUrl()}/forecastResults/treeview/${forecastId}`;

  const message = "Loading forecast chart data...";

  try {
    yield put(showSpinnerAction(message));

    const chan = yield call(updateTreeAndKeys, url);

    let i = 0;
    while (true) {
      const data = yield take(chan);
      
      const successAction = fetchForecastTreeviewKeysSuccessAction();
      const key = Object.keys(data)[0];

      console.log("key: ", key);

      if (key === "tree") {
        const forecastTree = data["tree"];

        yield put({
          ...successAction,
          payload: {
            ...payload,
            keyVar: "forecastTree",
            forecastTree,
          },
        });
      } else if (key === "keys") {
        const xValueCategories = data["keys"];

        yield put({
          ...successAction,
          payload: {
            ...payload,
            keyVar: "xValueCategories",
            xValueCategories,
          },
        });
      } else if (key == "xValueCategories"){
        const forecastXValueCategories = data["xValueCategories"];
        
        yield put({
          ...successAction,
          payload: {
            ...payload,
            keyVar: "xValueCategories",
            xValueCategories: forecastXValueCategories,
          },
        });
      }

      i += 1;
      if (i === 2) {
        yield put(updateForecastResultsParametersAction(idTitleDescIsSaved));
      }
    }
  } catch (errors) {
    const failureAction = fetchForecastTreeviewKeysFailureAction();

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
      headers: authHeaders(),
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
