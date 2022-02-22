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
  fetchStoredDeclineCurveParametersRequestAction,
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
  const {
    titleDesc: { title, description },
  } = payload;

  const { currentProjectId } = yield select((state) => state.projectReducer);
  const { selectedForecastInputDeckId } = yield select(
    (state) => state.inputReducer
  );
  const { declineParameters } = yield select((state) => state.networkReducer);

  const data = {
    projectId: currentProjectId,
    title,
    description,
    type: "User",
    declineParameters,
    forecastInputDeckId: selectedForecastInputDeckId,
  };

  const config = { withCredentials: false };
  const saveDeclineParametersAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    yield put(showSpinnerAction("Saving parameters..."));

    const result = yield call(
      saveDeclineParametersAPI,
      `${getBaseForecastUrl()}/well-decline-parameters/save`
    );

    console.log("result: ", result);

    const {
      data: { success, status, data },
    } = result;

    const successAction = saveDeclineParametersSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, success, status, data },
    });

    yield put(fetchStoredDeclineCurveParametersRequestAction(currentProjectId));
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
