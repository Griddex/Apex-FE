import { ActionType } from "@redux-saga/types";
import {
  actionChannel,
  call,
  put,
  select,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import history from "../../../Application/Services/HistoryService";
import {
  runForecastSuccessAction,
  runForecastFailureAction,
} from "../../../Forecast/Redux/ForecastActions/ForecastActions";
import {
  successDialogParameters,
  failureDialogParameters,
} from "../../Components/DialogParameters/RunForecastSuccessFailureDialogParameters";
import { RUN_FORECAST_REQUEST } from "../Actions/NetworkActions";

export default function* watchRunForecastSaga() {
  const runForecastChan = yield actionChannel(RUN_FORECAST_REQUEST);
  yield takeLeading<ActionType>(runForecastChan, runForecastSaga);
}

function* runForecastSaga(action: IAction) {
  const { payload } = action;

  const { selectedNetworkId } = yield select((state) => state.networkReducer);
  const { selectedForecastingParametersId } = yield select(
    (state) => state.networkReducer
  );

  const data = {
    networkId: selectedNetworkId,
    forecastingParametersGroupId: selectedForecastingParametersId,
  };

  const config = { headers: null };
  const runForecastAPI = (url: string) => authService.post(url, data, config);
  const statusCode = ""; //Get from success response

  try {
    const result = yield call(
      runForecastAPI,
      `${getBaseUrl()}/forecast/run` //This is the URL endpoint you should change
    );

    const {
      data: {
        data: { chart: forecastResult, tree: forecastTree, keys: forecastKeys },
      },
    } = result;

    const successAction = runForecastSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        statusCode,
        forecastResult,
        forecastTree,
        forecastKeys,
      },
    });

    yield put(showDialogAction(successDialogParameters()));
    // yield call(forwardTo, "/apex"); //put --> show snackbar, reset registration form
  } catch (errors) {
    const failureAction = runForecastFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, statusCode, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
