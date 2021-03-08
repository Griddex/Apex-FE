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
import {
  runForecastFailureAction,
  runForecastSuccessAction,
} from "../../../Forecast/Redux/Actions/ForecastActions";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/RunForecastSuccessFailureDialogParameters";
import { RUN_FORECAST_REQUEST } from "../Actions/NetworkActions";

export default function* watchRunForecastSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
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
  const url = `${getBaseUrl()}/run/networkId=${selectedNetworkId}/forecastingParametersGroupId=${selectedForecastingParametersId}/userId=${userId}`;

  try {
    const chan = yield call(updateForecastKeysAndTrees, url);

    while (true) {
      const data = yield take(chan);
      const successAction = runForecastSuccessAction();
      if (Object.keys(data)[0] === "keys") {
        console.log(
          "Logged output --> ~ file: RunForecastSaga.ts ~ line 75 ~",
          data["keys"]
        );
        yield put({
          ...successAction,
          payload: {
            ...payload,
            keyVar: "forecastKeys",
            forecastKeys: data["keys"],
          },
        });
      } else if (Object.keys(data)[0] === "tree") {
        const { forecastTree } = yield select((state) => state.forecastReducer);
        // const newData =
        //   forecastTree.length > 0
        //     ? [...forecastTree, data["tree"]]
        //     : [data["tree"]];

        const newData = data["tree"];
        console.log(
          "Logged output --> ~ file: RunForecastSaga.ts ~ line 79 ~ newData",
          newData
        );

        yield put({
          ...successAction,
          payload: {
            ...payload,
            keyVar: "forecastTree",
            forecastTree: newData,
          },
        });
      }
      yield put(showDialogAction(successDialogParameters()));
    }
  } catch (errors) {
    console.log(
      "Logged output --> ~ file: RunForecastSaga.ts ~ line 97 ~ errors",
      errors
    );
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

function updateForecastKeysAndTrees(url: string) {
  return eventChannel((emitter) => {
    jsonpipe.flow(url, {
      method: "GET",
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
