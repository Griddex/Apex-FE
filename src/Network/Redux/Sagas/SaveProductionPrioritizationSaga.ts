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
  fetchStoredProductionPrioritizationRequestAction,
  saveProductionPrioritizationFailureAction,
  saveProductionPrioritizationSuccessAction,
  SAVE_PRODUCTIONPRIORITIZATION_REQUEST,
} from "../Actions/NetworkActions";

export default function* watchSaveProductionPrioritizationSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveProductionPrioritizationChan = yield actionChannel(
    SAVE_PRODUCTIONPRIORITIZATION_REQUEST
  );
  yield takeLeading<ActionType>(
    saveProductionPrioritizationChan,
    saveProductionPrioritizationSaga
  );
}

function* saveProductionPrioritizationSaga(
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
  console.log("action: ", action);

  const { payload } = action;
  const {
    titleDesc: { title, description },
  } = payload;
  const { currentProjectId } = yield select((state) => state.projectReducer);
  console.log("currentProjectId: ", currentProjectId);

  const { selectedForecastInputDeckId } = yield select(
    (state) => state.inputReducer
  );
  console.log("selectedForecastInputDeckId: ", selectedForecastInputDeckId);

  const { currentProductionPrioritization } = yield select(
    (state) => state.networkReducer
  );
  console.log("currentProductionPrioritization: ", currentProductionPrioritization);

  const data = {
    projectId: currentProjectId,
    title,
    description,
    type: "User",
    declineParameters: currentProductionPrioritization,
    forecastInputDeckId: selectedForecastInputDeckId,
  };

      /*   const data = {
            projectId: currentProjectId,
            title,
            description,
            type: "User",
            typeOfPrioritization: currentProductionPrioritization,
            forecastInputDeckId: selectedForecastInputDeckId,
            typeOfStream,
            useSecondaryFacility,
            wellPrioritizations
            
          }; */

  const config = { withCredentials: false };
  const saveProductionPrioritizationAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    const result = yield call(
      saveProductionPrioritizationAPI,
      `${getBaseForecastUrl()}/well-prioritization`
    );

    const {
      data: { success, status, data },
    } = result;

    const successAction = saveProductionPrioritizationSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, success, status, data },
    });

    yield put(
      fetchStoredProductionPrioritizationRequestAction(currentProjectId)
    );
  } catch (errors) {
    const failureAction = saveProductionPrioritizationFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });
  } finally {
    yield put(hideSpinnerAction());
  }
}
