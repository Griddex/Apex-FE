import { call, put, takeLatest } from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { failureDialogParameters } from "../../Components/DialogParameters/OpenProjectFailureDialogParameters";
import {
  openRecentProjectFailureAction,
  openRecentProjectSuccessAction,
  OPENRECENTPROJECT_REQUEST,
} from "../Actions/ProjectActions";

export default function* watchOpenRecentProjectSaga() {
  yield takeLatest(OPENRECENTPROJECT_REQUEST, openRecentProjectSaga);
}

function* openRecentProjectSaga(action: IAction) {
  const { payload } = action;
  const { userId, projectId } = payload; //grab from own dps

  const config = { headers: null };
  const openRecentProjectAPI = (url: string) =>
    authService.post(url, config, { userId, projectId });

  try {
    const response = yield call(
      openRecentProjectAPI,
      "https://jsonplaceholder.typicode.com/posts"
      // "http://a4b6b400f0c6.ngrok.io/api/project"
    );

    const { statusCode, data } = response; //data that'll go to several reducers to
    //boostrap project

    const successAction = openRecentProjectSuccessAction(); //this will do the bootstrap
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, data },
    });
  } catch (errors) {
    const failureAction = openRecentProjectFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  }

  yield put(hideSpinnerAction());
}
