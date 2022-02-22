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
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import {
  fetchStoredForecastingParametersRequestAction,
  saveForecastParametersFailureAction,
  saveForecastParametersSuccessAction,
  SAVE_FORECASTPARAMETERS_REQUEST,
} from "../Actions/NetworkActions";
import history from "../../../Application/Services/HistoryService";

export default function* watchSaveForecastParametersSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveForecastParametersChan = yield actionChannel(
    SAVE_FORECASTPARAMETERS_REQUEST
  );
  yield takeLeading<ActionType>(
    saveForecastParametersChan,
    saveForecastParametersSaga
  );
}

function* saveForecastParametersSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload?: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload, meta } = action;
  const { titleDesc } = payload;
  const { showSpinner, message } = meta as NonNullable<IAction["meta"]>;
  const { currentProjectId } = yield select((state) => state.projectReducer);
  const { selectedForecastInputDeckId } = yield select(
    (state) => state.inputReducer
  );
  const { selectedProductionPrioritizationId } = yield select(
    (state) => state.networkReducer
  );
  const { selectedDeclineParametersId, createdOrEditedForecastParameters } =
    yield select((state) => state.networkReducer);

  const { title, description } = titleDesc;

  let isDefered = 0;
  if (createdOrEditedForecastParameters.isDefered == "useDeferment") {
    isDefered = 1;
  }
  const startForecast = new Date(
    createdOrEditedForecastParameters.startForecast
  );

  const parameterEntries = {
    targetFluid: createdOrEditedForecastParameters.targetFluid,
    timeFrequency: createdOrEditedForecastParameters.timeFrequency,
    realtimeResults: createdOrEditedForecastParameters.realtimeResults,
    isDefered: isDefered,
    stopDay: createdOrEditedForecastParameters.endForecast.getDate(),
    stopMonth: createdOrEditedForecastParameters.endForecast.getMonth() + 1,
    stopYear: createdOrEditedForecastParameters.endForecast.getFullYear(),
    startDay: startForecast.getDate(),
    startMonth: startForecast.getMonth() + 1,
    startYear: startForecast.getFullYear(),
  };

  const data = {
    title,
    description,
    forecastInputDeckId: selectedForecastInputDeckId,
    declineParametersId: selectedDeclineParametersId,
    wellPrioritizationId: selectedProductionPrioritizationId,
    projectId: currentProjectId,
    parameterEntries,
    type: "User",
  };

  const config = { withCredentials: false };
  const saveForecastParametersAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    if (showSpinner) yield put(showSpinnerAction(message as string));

    const result = yield call(
      saveForecastParametersAPI,
      `${getBaseForecastUrl()}/forecast-parameters/save`
    );

    const {
      data: { success, status, data },
    } = result;

    const successAction = saveForecastParametersSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, success, status, data },
    });

    yield put(fetchStoredForecastingParametersRequestAction(currentProjectId));
    yield call(forwardTo, "/apex/network/forecastParametersStored");
  } catch (errors) {
    const failureAction = saveForecastParametersFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });
  } finally {
    if (showSpinner) yield put(hideSpinnerAction());
  }
}

function forwardTo(routeUrl: string) {
  history.replace(routeUrl);
}
