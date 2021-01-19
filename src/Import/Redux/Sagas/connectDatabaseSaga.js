import { call, put, takeLatest } from "redux-saga/effects";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { showDialogAction } from "./../../../Application/Redux/Actions/DialogsAction";
import {
  serverLoginFailureAction,
  serverLoginSuccessAction,
  SERVERLOGIN_REQUEST,
} from "./../Actions/DatabaseServerActions";

export default function* watchConnectDatabaseSaga() {
  yield takeLatest(SERVERLOGIN_REQUEST, connectDatabaseSaga);
}

function* connectDatabaseSaga(action) {
  const { payload } = action;
  const { successDialogParameters, failureDialogParameters } = payload;
  //add authenticationType
  const { userName, password } = payload;

  const data = {
    title: userName,
    body: password,
  };
  const config = { headers: null };
  const serverLoginAPI = (url) => authService.post(url, data, config);
  const statusCode = "";

  //Replace with actual API call
  try {
    let databases = yield call(
      serverLoginAPI,
      "https://jsonplaceholder.typicode.com/posts"
    );

    databases = ["ForecastingDb", "MainDb"];
    const successAction = serverLoginSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, databases: databases },
    });

    //dispatch spinner
    //after success,

    yield put(showDialogAction(successDialogParameters));
  } catch (errors) {
    const failureAction = serverLoginFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, statusCode, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  }

  yield put(hideSpinnerAction());
}
