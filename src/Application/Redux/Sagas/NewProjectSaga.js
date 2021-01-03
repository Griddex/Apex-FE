import { call, put, takeLatest } from "redux-saga/effects";
import * as authService from "../../Services/AuthService";
import history from "../../Services/HistoryService";
import {
  newProjectFailureAction,
  newProjectSuccessAction,
  CREATE_NEWPROJECT,
} from "../Actions/ProjectActions";
import { hideSpinnerAction } from "../Actions/UISpinnerActions";
import { showDialogAction } from "./../Actions/DialogsAction";

export default function* watchNewProjectSaga() {
  yield takeLatest(CREATE_NEWPROJECT, newProjectSaga);
}

function* newProjectSaga(action) {
  const { payload } = action;
  const {
    projectName,
    projectDescription,
    successDialogParameters,
    failureDialogParameters,
  } = payload;
  console.log(
    "Logged output --> ~ file: NewProjectSaga.js ~ line 24 ~ function*newProjectSaga ~ successDialogParameters",
    successDialogParameters
  );

  const data = {
    title: projectName,
    body: projectDescription,
  };
  const config = { headers: null };
  const newProjectAPI = (url) => authService.post(url, data, config);
  const statusCode = ""; //Get from success response

  try {
    const result = yield call(
      newProjectAPI,
      "https://jsonplaceholder.typicode.com/posts"
    );

    const successAction = newProjectSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode: statusCode, result },
    });

    yield put(showDialogAction(successDialogParameters)); //put --> show snackbar, reset registration form
  } catch (errors) {
    const failureAction = newProjectFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, statusCode: statusCode, errors: errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  }

  yield put(hideSpinnerAction());
}
