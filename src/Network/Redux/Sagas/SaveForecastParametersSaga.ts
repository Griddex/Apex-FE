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
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import history from "../../../Application/Services/HistoryService";
import { IForecastParametersExistingRow } from "../../Components/Dialogs/ExistingNetworksDialogTypes";
import {
  fetchExistingForecastingParametersRequestAction,
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
  const { payload } = action;
  const { projectId } = yield select((state) => state.projectReducer);
  const { selectedForecastInputDeckId } = yield select(
    (state) => state.inputReducer
  );
  const {
    forecastingParametersExisting,
    forecastParametersTitle,
    forecastParametersDescription,
    selectedDeclineParametersId,
    selectedProductionPrioritizationId,
    parameterEntries: {
      targetFluid,
      timeFrequency,
      defermentDecision,
      realtimeResults,
      endForecastDate,
    },
  } = yield select((state) => state.networkReducer);

  const selectedParametersObj = forecastingParametersExisting.find(
    (k: IForecastParametersExistingRow) =>
      k.forecastInputDeckId === selectedForecastInputDeckId
  );

  const id = selectedParametersObj.forecastingParametersRootId;

  const endForecast = new Date(endForecastDate);
  const data = {
    title: forecastParametersTitle,
    description: forecastParametersDescription,
    type: "User",
    userId: "Gideon",
    declineParametersId: selectedDeclineParametersId,
    wellPrioritizationId: selectedProductionPrioritizationId,
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
  const saveForecastParametersAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    const result = yield call(
      saveForecastParametersAPI,
      `${getBaseForecastUrl()}/forecast-parameters` //This is the URL endpoint you should change
    );

    const {
      data: { success, status, data },
    } = result;

    const successAction = saveForecastParametersSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, success, status, data },
    });

    yield put(fetchExistingForecastingParametersRequestAction(projectId));
  } catch (errors) {
    const failureAction = saveForecastParametersFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });
  } finally {
    yield put(hideSpinnerAction());
  }
}
