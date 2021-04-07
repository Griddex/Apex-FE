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

export default function* watchGetForecastWholeResultsSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getForecastResultsChan = yield actionChannel(
    GET_FORECASTRESULTS_REQUEST
  );
  yield takeLeading<ActionType>(getForecastResultsChan, getForecastResultsSaga);
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* getForecastResultsSaga(
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

  const config = {};
  const userId = "Gideon";
  const url = `${getBaseUrl()}/chartData`;

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

  try {
    const forecastResultsAPI = (url: string) =>
      authService.post(url, data, config);
    const result = yield call(forecastResultsAPI, url);
    console.log(
      "Logged output --> ~ file: GetForecastResultsWholeSaga.ts ~ line 89 ~ result",
      result
    );

    const {
      status,
      data: forecastResults,
      succcess, //prevent 2nd trip to server
    } = result;
    console.log(
      "Logged output --> ~ file: GetForecastResultsWholeSaga.ts ~ line 93 ~ forecastResults",
      forecastResults
    );

    const successAction = getForecastResultsSuccessAction();
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
