import { call, put, select, takeLatest } from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/AutoGenerateFailureDialogParameters";
import {
  saveNetworkFailureAction,
  saveNetworkSuccessAction,
  SAVENETWORK_REQUEST,
} from "../Actions/NetworkActions";

export default function* watchSaveNetworkSaga() {
  yield takeLatest(SAVENETWORK_REQUEST, saveNetworkSaga);
}

function* saveNetworkSaga(action: IAction) {
  const { payload } = action;
  const { userId } = yield select((state) => state.loginReducer);
  const { projectId } = yield select((state) => state.projectReducer);

  const { facilitiesInputDeckId, forecastInputDeckId } = yield select(
    (state) => state.inputReducer
  );

  const data = {
    facilitiesInputDeckId,
    forecastInputDeckId,
  };
  // const data = {
  //   userId,
  //   id: projectId,
  //   networkId,
  //   nodeElements,
  //   edgeElements,
  // };

  const config = { headers: null };
  const saveNetworkAPI = (url: string) => authService.post(url, config, data);

  try {
    const result = yield call(saveNetworkAPI, `${getBaseUrl()}/network`);

    const {
      // data: { data: facilitiesInputDeckExisting }, //prevent 2nd trip to server
      statusCode,
      success,
    } = result;

    const successAction = saveNetworkSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, success },
    });
  } catch (errors) {
    const failureAction = saveNetworkFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
  }

  yield put(hideSpinnerAction());
}
