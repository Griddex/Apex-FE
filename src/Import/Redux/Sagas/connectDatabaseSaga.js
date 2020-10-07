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
  const { successDialogPayload, failureDialogPayload } = payload;
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
      payload: { ...payload, statusCode: statusCode, databases: databases },
    });

    //dispatch spinner
    //after success,

    yield put(showDialogAction(successDialogPayload));
  } catch (errors) {
    const failureAction = serverLoginFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, statusCode: statusCode, errors: errors },
    });

    yield put(showDialogAction(failureDialogPayload));
  }

  yield put(hideSpinnerAction());
}
