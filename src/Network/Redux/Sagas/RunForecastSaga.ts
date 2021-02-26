import { ActionType } from "@redux-saga/types";
import jsonpipe from "jsonpipe";
import { END, eventChannel, EventChannel } from "redux-saga";
import {
  actionChannel,
  AllEffect,
  call,
  CallEffect,
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
import {
  runForecastFailureAction,
  runForecastSuccessAction,
} from "../../../Forecast/Redux/ForecastActions/ForecastActions";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/RunForecastSuccessFailureDialogParameters";
import { RUN_FORECAST_REQUEST } from "../Actions/NetworkActions";

export default function* watchRunForecastSaga() {
  const runForecastChan = yield actionChannel(RUN_FORECAST_REQUEST);
  yield takeLeading<ActionType>(runForecastChan, runForecastSaga);
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* runForecastSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosPromise>>
  | CallEffect<EventChannel<any>>
  | TakeEffect
  | PutEffect<{ payload: any; type: string }>
  | SelectEffect,
  void,
  { selectedNetworkId: any } & { selectedForecastingParametersId: any } & any
> {
  const { payload } = action;
  const { selectedNetworkId } = yield select((state) => state.networkReducer);
  const { selectedForecastingParametersId } = yield select(
    (state) => state.networkReducer
  );

  const userId = "Gideon";
  const url = `${getBaseUrl()}/forecast/run/networkId=${selectedNetworkId}/forecastingParametersGroupId=${selectedForecastingParametersId}/userId=${userId}`;

  try {
    const chan = yield call(updateForecastResults, url);

    const data = yield take(chan);
    console.log(
      "Logged output --> ~ file: RunForecastSaga.ts ~ line 64 ~ data",
      data
    );
    const successAction = runForecastSuccessAction();
    if (Object.keys(data).includes("keys")) {
      yield put({
        ...successAction,
        payload: {
          ...payload,
          isCumulative: false,
          forecastKeys: data["keys"],
        },
      });

      console.log("here are the keys: ", data);
    } else if (Object.keys(data).includes("tree")) {
      yield put({
        ...successAction,
        payload: {
          ...payload,
          isCumulative: false,
          forecastTree: data["tree"],
        },
      });

      console.log("here is the tree: ", data);
    } else {
      yield put({
        ...successAction,
        payload: {
          ...payload,
          isCumulative: true,
          forecastResult: data,
        },
      });

      console.log("Chunking along", data);
    }

    yield put(showDialogAction(successDialogParameters()));
  } catch (errors) {
    const failureAction = runForecastFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}

function updateForecastResults(url: string) {
  return eventChannel((emitter) => {
    jsonpipe.flow(url, {
      method: "GET",
      withCredentials: false,
      success: function (chunk) {
        console.log(
          "Logged output --> ~ file: RunForecastSaga.ts ~ line 125 ~ returneventChannel ~ chunk",
          chunk
        );
        emitter(chunk);
      },
      error: function (chunk) {
        console.log(
          "Logged output --> ~ file: RunForecastSaga.ts ~ line 132 ~ returneventChannel ~ chunk",
          chunk
        );
        emitter(END);
      },
      complete: function (chunk) {
        console.log(
          "Logged output --> ~ file: RunForecastSaga.ts ~ line 135 ~ returneventChannel ~ chunk",
          chunk
        );
        emitter(END);
      },
    });

    return () => {
      emitter(END);
    };
  });
}
