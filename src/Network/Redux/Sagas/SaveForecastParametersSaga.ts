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

  const forecastingParametersObj: any = {};

  const { currentProjectId } = yield select((state) => state.projectReducer);
  const { selectedProductionPrioritizationId } = yield select(
    (state) => state.networkReducer
  );
  const { selectedDeclineParametersId } = yield select(
    (state) => state.networkReducer
  );

  let isDefered = 0;
  if (titleDesc.isDefered == "useDeferment") {
    isDefered = 1;
  }

  const startForecast = new Date(titleDesc.startForecast);

  forecastingParametersObj.title = titleDesc.title;
  forecastingParametersObj.description = titleDesc.description;
  forecastingParametersObj.forecastInputDeckId = titleDesc.forecastInputDeckId;
  forecastingParametersObj.projectId = currentProjectId;
  forecastingParametersObj.userId = "";
  forecastingParametersObj.type = titleDesc.type;
  forecastingParametersObj.parameterEntries = {
    targetFluid: titleDesc.targetFluid,
    timeFrequency: titleDesc.timeFrequency,
    realtimeResults: titleDesc.realtimeResults,
    isDefered: isDefered,
    stopDay: titleDesc.endForecast.getDate(),
    stopMonth: titleDesc.endForecast.getMonth() + 1,
    stopYear: titleDesc.endForecast.getFullYear(),
    startDay: startForecast.getDate(),
    startMonth: startForecast.getMonth() + 1,
    startYear: startForecast.getFullYear(),
  };
  forecastingParametersObj.declineParametersId = selectedDeclineParametersId;
  forecastingParametersObj.wellPrioritizationId =
    selectedProductionPrioritizationId;
  forecastingParametersObj.forecastInputdeckTitle =
    titleDesc.forecastInputdeckTitle;
  forecastingParametersObj.wellPrioritizationTitle =
    titleDesc.wellPrioritizationTitle;
  forecastingParametersObj.wellDeclineParameterTitle =
    titleDesc.wellDeclineParameterTitle;

  const config = { withCredentials: false };
  const saveForecastParametersAPI = (url: string) =>
    authService.post(url, forecastingParametersObj, config);

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
