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
import {
  fetchStoredDeclineParametersRequestAction,
  saveDeclineParametersFailureAction,
  saveDeclineParametersSuccessAction,
  SAVE_DECLINEPARAMETERS_REQUEST,
} from "../Actions/NetworkActions";

export default function* watchSaveDeclineParametersSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveDeclineParametersChan = yield actionChannel(
    SAVE_DECLINEPARAMETERS_REQUEST
  );
  yield takeLeading<ActionType>(
    saveDeclineParametersChan,
    saveDeclineParametersSaga
  );
}

function* saveDeclineParametersSaga(
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
    selectedDeclineParametersTitle,
    selectedDeclineParametersDescription,
    currentDeclineParameters,
  } = yield select((state) => state.networkReducer);

  const data = {
    projectId,
    title: selectedDeclineParametersTitle,
    description: selectedDeclineParametersDescription,
    type: "User",
    declineParameters: currentDeclineParameters,
    forecastInputDeckId: selectedForecastInputDeckId,
  };

  const config = { withCredentials: false };
  const saveDeclineParametersAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    const result = yield call(
      saveDeclineParametersAPI,
      `${getBaseForecastUrl()}/well-decline-parameters`
    );

    const {
      data: { success, status, data },
    } = result;

    const successAction = saveDeclineParametersSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, success, status, data },
    });

    yield put(fetchStoredDeclineParametersRequestAction());
  } catch (errors) {
    const failureAction = saveDeclineParametersFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });
  } finally {
    yield put(hideSpinnerAction());
  }
}
