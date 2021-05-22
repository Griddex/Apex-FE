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
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import {
  fetchExistingForecastingResultsRequestAction,
  saveForecastFailureAction,
  saveForecastSuccessAction,
  updateForecastResultsParameterAction,
} from "../../../Forecast/Redux/Actions/ForecastActions";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/SaveForecastSuccessFailureDialogParameters";
import { SAVE_FORECAST_REQUEST } from "../Actions/NetworkActions";
import { showSpinnerAction } from "./../../../Application/Redux/Actions/UISpinnerActions";

export default function* watchSaveForecastSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveForecastChan = yield actionChannel(SAVE_FORECAST_REQUEST);
  yield takeLeading<ActionType>(saveForecastChan, saveForecastSaga);
}

function* saveForecastSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { userId } = yield select((state) => state.loginReducer);
  const { projectId } = yield select((state) => state.projectReducer);

  const { selectedNetworkId, selectedForecastingParametersId } = yield select(
    (state) => state.networkReducer
  );
  const {
    forecastResultsTitle,
    forecastResultsDescription,
    selectedForecastingResultsId,
  } = yield select((state) => state.forecastReducer);

  const data = {
    userId: "Gideon",
    projectId,
    networkId: selectedNetworkId,
    forecastingParametersGroupId: selectedForecastingParametersId,
    title: forecastResultsTitle,
    description: forecastResultsDescription,
    forecastResultsKey: selectedForecastingResultsId,
  };

  const config = { withCredentials: false };
  const saveForecastAPI = (url: string) => authService.post(url, data, config);

  try {
    yield put(showSpinnerAction("Saving forecast results..."));

    const result = yield call(saveForecastAPI, `${getBaseForecastUrl()}/save`);

    const {
      data: { data: selectedForecastingResultsId },
    } = result;

    const successAction = saveForecastSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        status,
        selectedForecastingResultsId,
      },
    });

    yield put(
      updateForecastResultsParameterAction(
        "forecastResultsTitle",
        forecastResultsTitle
      )
    );
    yield put(fetchExistingForecastingResultsRequestAction(projectId));
    yield put(showDialogAction(successDialogParameters()));
  } catch (errors) {
    const failureAction = saveForecastFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}
