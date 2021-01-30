import { call, put, select, takeLatest } from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { activateDisabledMenusAction } from "../../../Application/Redux/Actions/LayoutActions";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import {
  createNewProjectFailureAction,
  createNewProjectSuccessAction,
  CREATE_NEWPROJECT,
} from "../Actions/ProjectActions";

export default function* watchCreateNewProjectSaga() {
  yield takeLatest(CREATE_NEWPROJECT, createNewProjectSaga);
}

function* createNewProjectSaga(action: IAction) {
  const { payload } = action;
  const { successDialogParameters, failureDialogParameters } = payload;

  const { projectTitle, projectDescription, pressureAddend } = yield select(
    (state: RootState) => state.projectReducer
  );

  const unitSettingsData = yield select(
    (state: RootState) => state.unitSettingsReducer["unitSettingsData"]
  );

  const data = {
    userId: "Gideon",
    title: projectTitle,
    description: projectDescription,
    ...unitSettingsData,
  };
  const config = { headers: null };
  const createNewProjectAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    const result = yield call(
      createNewProjectAPI,
      `${getBaseUrl()}/project`
      // `https://jsonplaceholder.typicode.com/posts`
    );

    const {
      data: {
        statusCode,
        data: { id },
        succcess,
      }, //prevent 2nd trip to server
    } = result;
    //put default unitsettings data received into
    //unitsettings store

    const successAction = createNewProjectSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, id },
    });

    yield put(activateDisabledMenusAction());
    yield put(showDialogAction(successDialogParameters)); //put --> show snackbar, reset registration form
  } catch (errors) {
    const failureAction = createNewProjectFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  }

  yield put(hideSpinnerAction());
}
