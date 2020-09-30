import { call, put, takeLatest } from "redux-saga/effects";
import * as authService from "../../../Application/Services/AuthService";
import history from "../../../Application/Services/HistoryService";
import {
  SERVERLOGIN_REQUEST,
  serverLoginFailureAction,
  serverLoginSuccessAction,
} from "./../Actions/DatabaseServerActions";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { showDialogAction } from "./../../../Application/Redux/Actions/DialogsAction";

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
