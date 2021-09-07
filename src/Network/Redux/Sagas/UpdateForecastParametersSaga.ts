import { ActionType } from "@redux-saga/types";
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
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAllWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import history from "../../../Application/Services/HistoryService";
import {
  UPDATE_FORECASTPARAMETERS_REQUEST,
  updateForecastParametersSuccessAction,
  updateForecastParametersFailureAction,
} from "../Actions/NetworkActions";

export default function* watchUpdateForecastParametersSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const updateForecastParametersChan = yield actionChannel(
    UPDATE_FORECASTPARAMETERS_REQUEST
  );
  yield takeLeading<ActionType>(
    updateForecastParametersChan,
    updateForecastParametersSaga
  );
}

function* updateForecastParametersSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<IAction>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { userId } = yield select((state) => state.loginReducer);
  const {
    forecastParametersTitle,
    forecastParametersDescription,
    selectedForecastingParametersId,
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
    forecastingParametersId: selectedForecastingParametersId,
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

  const config = { withCredentials: false };
  const updateForecastParametersAPI = (url: string) =>
    authService.post(url, data, config);
  const status = ""; //Get from success response

  try {
    const result = yield call(
      updateForecastParametersAPI,
      `${getBaseForecastUrl()}/forecast-parameters` //This is the URL endpoint you should change
    );

    const {
      data: {
        success,
        status,
        data: { nodes: nodeElements, edges: edgeElements },
      },
    } = result;

    const successAction = updateForecastParametersSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, success, status, data },
    });

    // yield call(forwardTo, "/apex"); //put --> show snackbar, reset registration form
  } catch (errors) {
    const failureAction = updateForecastParametersFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, status, errors },
    });
  } finally {
    yield put(hideSpinnerAction());
  }
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
