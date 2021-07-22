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
import { persistFormTitlesAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredProjectsFailureDialogParameters";
import {
  fetchStoredProjectsFailureAction,
  fetchStoredProjectsSuccessAction,
  FETCH_STORED_PROJECTS_REQUEST,
} from "../Actions/ProjectActions";

export default function* watchFetchStoredProjectsSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const fetchStoredProjectsChan = yield actionChannel(
    FETCH_STORED_PROJECTS_REQUEST
  );
  yield takeLeading(fetchStoredProjectsChan, fetchStoredProjectsSaga);
}

function* fetchStoredProjectsSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<IAction>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;

  const config = { withCredentials: false };
  const fetchStoredProjectsAPI = (url: string) => authService.get(url, config);

  try {
    const result = yield call(
      fetchStoredProjectsAPI,
      `${getBaseForecastUrl()}/project/recents/20`
    );

    const {
      data: { status, data: storedProjects },
    } = result;

    const successAction = fetchStoredProjectsSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, storedProjects },
    });

    yield put(
      persistFormTitlesAction(
        "projectTitles",
        storedProjects.map((o: any) => o.title)
      )
    );
  } catch (errors) {
    const failureAction = fetchStoredProjectsFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
    yield put(hideSpinnerAction());
  }
}
