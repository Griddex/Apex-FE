import {
  actionChannel,
  ActionChannelEffect,
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import {
  fetchRecentProjectsFailureAction,
  fetchRecentProjectsSuccessAction,
  FETCHRECENTPROJECTS_REQUEST,
} from "../Actions/ProjectActions";
import getBaseUrl from "./../../../Application/Services/BaseUrlService";

export default function* watchFetchRecentProjectsSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const fetchRecentProjectsChan = yield actionChannel(
    FETCHRECENTPROJECTS_REQUEST
  );
  yield takeLeading(fetchRecentProjectsChan, fetchRecentProjectsSaga);
}

function* fetchRecentProjectsSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { failureDialogParameters } = payload;
  const { userId } = yield select((state) => state.loginReducer);

  const config = { withCredentials: false };
  const fetchRecentProjectsAPI = (url: string) => authService.get(url, config);

  try {
    const result = yield call(
      fetchRecentProjectsAPI,
      `${getBaseUrl()}/project/recents/6`
    );

    const {
      data: { status, data, succcess }, //prevent 2nd trip to server
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
      payload: { ...payload, status, recentProjects },
    });
  } catch (errors) {
    const failureAction = fetchRecentProjectsFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  }
}
