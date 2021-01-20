import { call, put, select, takeLatest } from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { activateDisabledMenusAction } from "../../../Application/Redux/Actions/LayoutActions";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import * as authService from "../../../Application/Services/AuthService";
import {
  loadRecentProjectFailureAction,
  loadRecentProjectSuccessAction,
  LOAD_RECENTPROJECT_REQUEST,
} from "../Actions/ProjectActions";

export default function* watchLoadRecentProjectSaga() {
  yield takeLatest(LOAD_RECENTPROJECT_REQUEST, loadRecentProjectSaga);
}

function* loadRecentProjectSaga(action: IAction) {
  const { payload } = action;
  const { successDialogParameters, failureDialogParameters } = payload;

  const { projectName, projectDescription, pressureAddend } = yield select(
    (state: RootState) => state.projectReducer
  );

  const unitSettingsData = yield select(
    (state: RootState) => state.unitSettingsReducer["unitSettingsData"]
  );

  const data = {
    projectName,
    projectDescription,
    pressureAddend,
    unitSettingsData,
  };
  const config = { headers: null };
  const loadRecentProjectAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    const response = yield call(
      loadRecentProjectAPI,
      "https://jsonplaceholder.typicode.com/posts"
    );

    const { statusCode, data } = response;
    const successAction = loadRecentProjectSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, data },
    });

    yield put(activateDisabledMenusAction());
    yield put(showDialogAction(successDialogParameters)); //put --> show snackbar, reset registration form
  } catch (errors) {
    const failureAction = loadRecentProjectFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  }

  yield put(hideSpinnerAction());
}
