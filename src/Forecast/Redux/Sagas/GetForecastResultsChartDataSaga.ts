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
import { failureDialogParameters } from "../../Components/DialogParameters/ExistingForecastResultsSuccessFailureDialogParameters";
import {
  getForecastResultsChartDataFailureAction,
  getForecastResultsChartDataSuccessAction,
  GET_FORECASTRESULTS_CHARTDATA_REQUEST,
} from "../Actions/ForecastActions";

export default function* watchGetForecastResultsChartDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getForecastResultsChan = yield actionChannel(
    GET_FORECASTRESULTS_CHARTDATA_REQUEST
  );
  yield takeLeading<ActionType>(
    getForecastResultsChan,
    getForecastResultsChartDataSaga
  );
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* getForecastResultsChartDataSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosPromise>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const {
    selectedIds,
    selectedModuleNames,
    selectedModulePaths,
    selectedForecastChartVariable,
  } = payload;

  const { selectedNetworkId } = yield select((state) => state.networkReducer);
  const { selectedForecastingResultsId, isForecastResultsSaved } = yield select(
    (state) => state.forecastReducer
  );

  const config = {};
  const userId = "Gideon";
  const url = `${getBaseForecastUrl()}/chartData`;

  //if former selected variable is different form current one
  //please replace chart data in store
  const data = {
    userId: userId,
    networkId: selectedNetworkId,
    selectedVariable: selectedForecastChartVariable,
    selectedModuleIds: selectedIds,
    selectedModuleNames: selectedModuleNames,
    selectedModulePaths: selectedModulePaths,
    isSaved: isForecastResultsSaved,
    forecastId: selectedForecastingResultsId,
  };

  const message = "Loading forecast chart data...";

  try {
    yield put(showSpinnerAction(message));

    const forecastResultsAPI = (url: string) =>
      authService.post(url, data, config);
    const result = yield call(forecastResultsAPI, url);
    console.log(
      "Logged output --> ~ file: GetForecastResultsWholeSaga.ts ~ line 89 ~ result",
      result
    );

    const { status, data: forecastResults, succcess } = result;
    console.log(
      "Logged output --> ~ file: GetForecastResultsWholeSaga.ts ~ line 93 ~ forecastResults",
      forecastResults
    );

    const successAction = getForecastResultsChartDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        forecastResults,
      },
    });

    yield put({
      type: "PERSIST_FIRSTLEVELFORECASTPROPERTY",
      payload: {
        selectedModuleIds: selectedIds,
      },
    });

    // yield put(showDialogAction(successDialogParameters()));
  } catch (errors) {
    const failureAction = getForecastResultsChartDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}
