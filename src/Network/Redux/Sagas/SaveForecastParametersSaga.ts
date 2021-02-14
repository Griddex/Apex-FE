import { ActionType } from "@redux-saga/types";
import {
  actionChannel,
  call,
  put,
  select,
  takeLeading,
} from "redux-saga/effects";
import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import history from "../../../Application/Services/HistoryService";
import {
  SAVE_FORECASTPARAMETERS_REQUEST,
  saveForecastParametersSuccessAction,
  saveForecastParametersFailureAction,
} from "../Actions/NetworkActions";

export default function* watchSaveForecastParametersSaga() {
  const saveForecastParametersChan = yield actionChannel(
    SAVE_FORECASTPARAMETERS_REQUEST
  );
  yield takeLeading<ActionType>(
    saveForecastParametersChan,
    saveForecastParametersSaga
  );
}

function* saveForecastParametersSaga(action: IAction) {
  const { payload } = action;
  const { userId } = yield select((state) => state.loginReducer);
  const {
    forecastParametersTitle,
    forecastParametersDescription,
    selectedForecastingParametersRootId,
    declineParameters,
    parameterEntries: {
      targetFluid,
      timeFrequency,
      defermentDecision,
      realtimeResults,
      endForecastDate,
    },
  } = yield select((state) => state.networkReducer);

  const endForecast = new Date(endForecastDate);
  const data = {
    title: forecastParametersTitle,
    description: forecastParametersDescription,
    type: "User",
    userId: "Gideon",
    forecastingParametersId: selectedForecastingParametersRootId,
    declineParameters,
    parameterEntries: {
      targetFluid,
      timeFrequency,
      realtimeResults,
      isDefered: defermentDecision,
      stopDay: endForecast.getDay(),
      stopMonth: endForecast.getMonth(),
      stopYear: endForecast.getFullYear(),
    },
  };

  const config = { headers: null };
  const saveForecastParametersAPI = (url: string) =>
    authService.post(url, data, config);
  const statusCode = ""; //Get from success response

  try {
    const result = yield call(
      saveForecastParametersAPI,
      `${getBaseUrl()}/forecast-parameters` //This is the URL endpoint you should change
    );

    const {
      data: {
        success,
        statusCode,
        data: { nodes: nodeElements, edges: edgeElements },
      },
    } = result;

    const successAction = saveForecastParametersSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, success, statusCode, data },
    });

    // yield call(forwardTo, "/apex"); //put --> show snackbar, reset registration form
  } catch (errors) {
    const failureAction = saveForecastParametersFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, statusCode, errors },
    });
  } finally {
    yield put(hideSpinnerAction());
  }
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
