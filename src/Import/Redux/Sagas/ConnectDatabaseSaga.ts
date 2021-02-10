import { call, put, takeLeading } from "redux-saga/effects";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import {
  connectDatabaseFailureAction,
  connectDatabaseSuccessAction,
  CONNECTDATABASE_REQUEST,
} from "../Actions/DatabaseServerActions";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";

export default function* watchConnectDatabaseSaga() {
  yield takeLeading(CONNECTDATABASE_REQUEST, connectDatabaseSaga);
}

function* connectDatabaseSaga(action: IAction) {
  const { payload } = action;
  const { successDialogParameters, failureDialogParameters } = payload;
  //add authenticationType
  //connectionString, userName, password as payload
  const { userName, password } = payload;

  const data = {
    title: userName,
    body: password,
  };
  const config = { headers: null };
  const connectDatabaI = (url: string) => authService.post(url, data, config);
  const statusCode = "";

  //Replace with actual API call
  try {
    let databases = yield call(
      connectDatabaI,
      "https://jsonplaceholder.typicode.com/posts"
    );

    databases = ["ForecastingDb", "MainDb"];
    const successAction = connectDatabaseSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, databases: databases },
    });

    //dispatch spinner
    //after success,

    yield put(showDialogAction(successDialogParameters));
  } catch (errors) {
    const failureAction = connectDatabaseFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, statusCode, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  } finally {
    yield put(hideSpinnerAction());
  }
}
