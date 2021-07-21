import { ActionType } from "@redux-saga/types";
import jsonpipe from "jsonpipe";
import { END, eventChannel, EventChannel } from "redux-saga";
import {
  actionChannel,
  ActionChannelEffect,
  AllEffect,
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
  getForecastResultsChartDataFailureAction,
  getForecastResultsChartDataSuccessAction,
  GET_FORECASTRESULTS_CHARTDATA_REQUEST,
} from "../Actions/ForecastActions";

export default function* watchGetForecastResultsSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getForecastResultsChan = yield actionChannel("DEPRECATED_ACTION");
  yield takeLeading<ActionType>(getForecastResultsChan, getForecastResultsSaga);
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* getForecastResultsSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosPromise>>
  | CallEffect<EventChannel<any>>
  | TakeEffect
  | PutEffect<IAction>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { selectedNetworkId } = yield select((state) => state.networkReducer);
  const {
    selectedIds,
    selectedModuleNames,
    selectedModulePaths,
    selectedForecastChartVariable,
  } = payload;
  const { selectedForecastingResultsId, isForecastResultsSaved } = yield select(
    (state) => state.forecastReducer
  );

  const userId = "Gideon";
  const url = `${getBaseForecastUrl()}/chartData`;

  //if former selected variable is different form current one
  //please replace chart data in store
  const reqPayload = {
    userId: userId,
    networkId: selectedNetworkId,
    selectedVariable: selectedForecastChartVariable,
    selectedModuleIds: selectedIds,
    selectedModuleNames: selectedModuleNames,
    selectedModulePaths: selectedModulePaths,
    isSaved: isForecastResultsSaved,
    forecastId: selectedForecastingResultsId,
  };

  //isForecastResultsLoading
  try {
    // yield put(showSpinnerAction("fetching data..."));
    yield put({
      type: "UPDATE_FORECASTPARAMETER",
      payload: {
        name: "isForecastResultsLoading",
        value: true,
      },
    });

    const chan = yield call(updateForecastResults, url, reqPayload);

    while (true) {
      const forecastResultsChunk = yield take(chan);
      const { forecastResults } = yield select(
        (state) => state.forecastReducer
      );
      const newForecastResults = [...forecastResults, forecastResultsChunk];

      const successAction = getForecastResultsChartDataSuccessAction();
      yield put({
        ...successAction,
        payload: {
          forecastResults: newForecastResults,
        },
      });

      yield put({
        type: "UPDATE_FORECASTPARAMETER",
        payload: {
          selectedModuleIds: selectedIds,
        },
      });
    }
  } catch (errors) {
    const failureAction = getForecastResultsChartDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put({
      type: "UPDATE_FORECASTPARAMETER",
      payload: {
        name: "isForecastResultsLoading",
        value: false,
      },
    });
    yield put(hideSpinnerAction());
  }
}

function updateForecastResults(url: string, reqPayload: any) {
  return eventChannel((emitter) => {
    jsonpipe.flow(url, {
      method: "POST",
      data: JSON.stringify(reqPayload),
      headers: { "Content-Type": "application/json; charset=utf-8" },
      disableContentType: true,
      ,
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
