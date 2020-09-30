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
    const dialogParameters = {
      dialogType: "textDialog",
      dialogProps: {
        name: "Connect_Database_Success_Dialog",
        title: "Save Operation Success",
        show: true,
        exclusive: true,
        maxwidth: "xs",
        icon: <CheckCircleIcon />,
        dialogText: "Database connection successful",
      },
    };

    yield put(showDialogAction(dialogParameters));
  } catch (errors) {
    const failureAction = serverLoginFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, statusCode: statusCode, errors: errors },
    });
  }

  yield put(hideSpinnerAction());
}
