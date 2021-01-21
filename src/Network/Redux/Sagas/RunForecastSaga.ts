import { call, put, select, takeLatest } from "redux-saga/effects";
import * as authService from "../../../Application/Services/AuthService";
import history from "../../../Application/Services/HistoryService";
import {
  runForecastFailureAction,
  runForecastSuccessAction,
  RUN_FORECAST_REQUEST,
} from "../Actions/ForecastingActions";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { ActionType } from "@redux-saga/types";

export default function* watchRunForecastSaga() {
  yield takeLatest<ActionType>(RUN_FORECAST_REQUEST, runForecastSaga);
}

function* runForecastSaga(action: IAction) {
  const { payload } = action;
  const { workflowProcess } = payload;

  const { definedTableData } = yield select(
    (state) => state.importReducer["allWorkflows"][workflowProcess as string]
  );
  const data = definedTableData;
  const config = { headers: null };
  const runForecastAPI = (url: string) => authService.post(url, data, config);
  const statusCode = ""; //Get from success response

  try {
    const data = yield call(
      runForecastAPI,
      "https://jsonplaceholder.typicode.com/posts" //This is the URL endpoint you should change
    );

    const successAction = runForecastSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, data },
    });

    // yield call(forwardTo, "/apex"); //put --> show snackbar, reset registration form
  } catch (errors) {
    const failureAction = runForecastFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, statusCode, errors },
    });
  }

  yield put(hideSpinnerAction());
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
