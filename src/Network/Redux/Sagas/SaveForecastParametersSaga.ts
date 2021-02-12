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
  const { workflowProcess } = payload;

  const { inputDeckData } = yield select(
    (state) =>
      state.inputReducer["importDataWorkflows"][
        workflowProcess as IAllWorkflowProcesses["wrkflwPrcss"]
      ]
  );
  const data = inputDeckData;
  const config = { headers: null };
  const saveForecastParametersAPI = (url: string) =>
    authService.post(url, data, config);
  const statusCode = ""; //Get from success response

  try {
    const data = yield call(
      saveForecastParametersAPI,
      "https://jsonplaceholder.typicode.com/posts" //This is the URL endpoint you should change
    );

    const successAction = saveForecastParametersSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, data },
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
