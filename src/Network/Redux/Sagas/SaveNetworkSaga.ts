import { call, put, select, takeLatest } from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
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

  const { networkId, nodeElements, edgeElements } = yield select(
    (state) => state.networkReducer
  );

  const data = {
    userId,
    id: projectId,
    networkId,
    nodeElements,
    edgeElements,
  };

  const config = { headers: null };
  const saveNetworkAPI = (url: string) => authService.post(url, config, data);

  try {
    const result = yield call(
      saveNetworkAPI,
      "https://jsonplaceholder.typicode.com/posts"
      // "http://a4b6b400f0c6.ngrok.io/api/project"
    );

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
