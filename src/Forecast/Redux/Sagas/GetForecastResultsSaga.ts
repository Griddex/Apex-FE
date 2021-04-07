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
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/ExistingForecastResultsSuccessFailureDialogParameters";
import {
  getForecastResultsFailureAction,
  getForecastResultsSuccessAction,
  GET_FORECASTRESULTS_REQUEST,
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
  | PutEffect<{ payload: any; type: string }>
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
  const url = `${getBaseUrl()}/chartData`;

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

  try {
    const chan = yield call(updateForecastResults, url, reqPayload);

    while (true) {
      const forecastResultsChunk = yield take(chan);
      console.log(
        "Logged output --> ~ file: GetForecastResultsSaga.ts ~ line 90 ~ forecastResultsChunk",
        forecastResultsChunk
      );
      const { forecastResults } = yield select(
        (state) => state.forecastReducer
      );
      const newForecastResults = [...forecastResults, forecastResultsChunk];

      const successAction = getForecastResultsSuccessAction();
      yield put({
        ...successAction,
        payload: {
          forecastResults: newForecastResults,
        },
      });

      yield put({
        type: "PERSIST_FIRSTLEVELFORECASTPROPERTY",
        payload: {
          selectedModuleIds: selectedIds,
        },
      });

      // yield put(showDialogAction(successDialogParameters()));
    }
  } catch (errors) {
    const failureAction = getForecastResultsFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  } finally {
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
