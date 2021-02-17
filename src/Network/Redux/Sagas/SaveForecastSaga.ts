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
  saveForecastSuccessAction,
  saveForecastFailureAction,
} from "../../../Forecast/Redux/ForecastActions/ForecastActions";
import {
  successDialogParameters,
  failureDialogParameters,
} from "../../Components/DialogParameters/SaveForecastSuccessFailureDialogParameters";
import { SAVE_FORECAST_REQUEST } from "../Actions/NetworkActions";

export default function* watchSaveForecastSaga() {
  const saveForecastChan = yield actionChannel(SAVE_FORECAST_REQUEST);
  yield takeLeading<ActionType>(saveForecastChan, saveForecastSaga);
}

function* saveForecastSaga(action: IAction) {
  const { payload } = action;
  const { userId } = yield select((state) => state.loginReducer);
  const { projectId } = yield select((state) => state.projectReducer);

  const { selectedNetworkId, selectedForecastingParametersId } = yield select(
    (state) => state.networkReducer
  );
  const { forecastResultsTitle, forecastResultsDescription } = yield select(
    (state) => state.forecastReducer
  );

  const data = {
    userId: "Gideon",
    projectId,
    networkId: selectedNetworkId,
    forecastingParametersId: selectedForecastingParametersId,
    title: forecastResultsTitle,
    description: forecastResultsDescription,
  };

  const config = { headers: null };
  const saveForecastAPI = (url: string) => authService.post(url, data, config);

  try {
    const result = yield call(saveForecastAPI, `${getBaseUrl()}/forecast/save`);

    const {
      data: {
        data: {
          statusCode,
          forecastResultsId,
          forecastParametersGroupId,
          forecastInputDeckId,
        },
      },
    } = result;

    const successAction = saveForecastSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        statusCode,
        forecastResultsId,
        forecastParametersGroupId,
        forecastInputDeckId,
      },
    });

    yield put(showDialogAction(successDialogParameters()));
    // yield call(forwardTo, "/apex"); //put --> show snackbar, reset registration form
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

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
