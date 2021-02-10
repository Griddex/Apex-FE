import { call, put, select, takeLeading } from "redux-saga/effects";
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
  yield takeLeading(FETCHRECENTPROJECTS_REQUEST, fetchRecentProjectsSaga);
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
      `${getBaseUrl()}/project/recents/6`
      // `https://jsonplaceholder.typicode.com/posts`
    );

    const {
      data: { statusCode, data, succcess }, //prevent 2nd trip to server
    } = result;

    const recentProjects = data.map((row: any) => ({
      projectId: row.id,
      projectTitle: row.title,
      projectDescription: row.description,
      toggleSN: true,
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
  } finally {
    yield put(hideSpinnerAction());
  }
}
