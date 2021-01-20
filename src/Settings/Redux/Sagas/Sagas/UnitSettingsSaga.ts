import { call, put, select, takeLatest } from "redux-saga/effects";
import { IAction } from "../../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import * as authService from "../../../../Application/Services/AuthService";
import {
  fetchUnitSettingsFailureAction,
  fetchUnitSettingsSuccessAction,
  FETCH_UNITSETTINGS,
} from "../../Actions/UnitSettingsActions";

export default function* watchFetchUnitSettingsSaga() {
  yield takeLatest(FETCH_UNITSETTINGS, fetchUnitSettingsSaga);
}

function* fetchUnitSettingsSaga(action: IAction) {
  const { payload } = action;
  const { successDialogParameters, failureDialogParameters } = payload;

  const data = yield select(
    (state: RootState) => state.unitSettingsReducer["unitSettingsData"]
  );

  const config = { headers: null };
  const fetchUnitSettingsAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    const response = yield call(
      fetchUnitSettingsAPI,
      "https://jsonplaceholder.typicode.com/posts"
    );

    const { statusCode, data } = response;
    const successAction = fetchUnitSettingsSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, data },
    });

    yield put(showDialogAction(successDialogParameters)); //put --> show snackbar, reset registration form
  } catch (errors) {
    const failureAction = fetchUnitSettingsFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  }

  yield put(hideSpinnerAction());
}
