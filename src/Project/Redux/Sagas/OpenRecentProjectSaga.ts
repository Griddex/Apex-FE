import { call, put, takeLeading } from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/OpenProjectFailureDialogParameters";
import {
  openRecentProjectFailureAction,
  openRecentProjectSuccessAction,
  OPENRECENTPROJECT_REQUEST,
} from "../Actions/ProjectActions";

export default function* watchOpenRecentProjectSaga() {
  yield takeLeading(OPENRECENTPROJECT_REQUEST, openRecentProjectSaga);
}

function* openRecentProjectSaga(action: IAction) {
  const { payload } = action;
  const { userId, projectId, projectTitle, projectDescription } = payload; //grab from own dps

  const config = { headers: null };
  const openRecentProjectAPI = (url: string) => authService.get(url, config);

  try {
    const result = yield call(
      openRecentProjectAPI,
      `${getBaseUrl()}/project/${projectId}`
      // `https://jsonplaceholder.typicode.com/posts`
    );

    // const { statusCode, data } = response; //data that'll go to several reducers to
    //boostrap project

    const {
      data: { statusCode, data, succcess }, //prevent 2nd trip to server
    } = result;
    const { title } = data; //unitsettins object

    const successAction = openRecentProjectSuccessAction(); //this will do the bootstrap
    yield put({
      ...successAction,
      payload: {
        ...payload,
        statusCode,
        projectId,
        projectTitle,
        projectDescription,
      },
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
