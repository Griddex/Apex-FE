import { call, put, select, takeLatest } from "redux-saga/effects";
import * as authService from "../../../Application/Services/AuthService";
import history from "../../../Application/Services/HistoryService";
import {
  runForecastFailureAction,
  runForecastSuccessAction,
  RUN_FORECAST_REQUEST,
} from "./../Actions/NetworkActions";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";

export default function* watchRunForecastSaga() {
  yield takeLatest(RUN_FORECAST_REQUEST, runForecastSaga);
}

function* runForecastSaga(action) {
  const { payload } = action;

  const finalTableData = yield select(
    (state) => state.importReducer.finalTableData
  );
  const data = finalTableData;
  const config = { headers: null };
  const runForecastAPI = (url) => authService.post(url, data, config);
  const statusCode = ""; //Get from success response

  try {
    const result = yield call(
      runForecastAPI,
      "https://jsonplaceholder.typicode.com/posts" //This is the URL endpoint you should change
    );

    const successAction = runForecastSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, result },
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

function forwardTo(routeUrl) {
  history.push(routeUrl);
}
