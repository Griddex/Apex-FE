import { call, put, select, takeLatest } from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import {
  fetchRecentProjectsFailureAction,
  fetchRecentProjectsSuccessAction,
  FETCHRECENTPROJECTS_REQUEST,
  openRecentProjectAction,
} from "../Actions/ProjectActions";
import { IRecentProject } from "../State/ProjectStateTypes";
import getBaseUrl from "./../../../Application/Services/BaseUrlService";

export default function* watchFetchRecentProjectsSaga() {
  yield takeLatest(FETCHRECENTPROJECTS_REQUEST, fetchRecentProjectsSaga);
}

function* fetchRecentProjectsSaga(action: IAction) {
  const { payload } = action;
  const { failureDialogParameters } = payload;
  const { userId } = yield select((state) => state.loginReducer);

  const config = { headers: null };
  const fetchRecentProjectsAPI = (url: string) => authService.get(url, config);

  try {
    const result = yield call(
      fetchRecentProjectsAPI,
      // `${getBaseUrl()}/project/recents/6`
      `https://jsonplaceholder.typicode.com/posts`
    );

    const {
      data: { statusCode, data, succcess }, //prevent 2nd trip to server
    } = result;

    const recentProjects = data.map((row: any) => ({
      title: row.title,
      projectId: row.id,
      toggleSN: true,
      handleClick: () => handleClick(userId, row.projectId as string),
    }));

    const successAction = fetchRecentProjectsSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, recentProjects },
    });
  } catch (errors) {
    const failureAction = fetchRecentProjectsFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  }

  yield put(hideSpinnerAction());
}

function* handleClick(userId: string, projectId: string) {
  // const action = openRecentProjectAction(userId,projectId);
  // yield put({ ...action, userId, projectId });
  yield put(openRecentProjectAction(userId, projectId));
}
