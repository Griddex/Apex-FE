import { actionChannel, call, put, takeLeading } from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { saveInputDeckSaga } from "../../../Import/Redux/Sagas/SaveInputDeckSaga";
import {
  autoGenerateNetworkRequestAction,
  SAVEAUTOGENERATENETWORK_REQUEST,
} from "../Actions/NetworkActions";
import { autoGenerateNetworkSaga } from "./AutogenerateNetworkSaga";
import { saveInputDeckRequestAction } from "./../../../Import/Redux/Actions/ImportActions";

export default function* watchAndSaveAutogenerateNetworkSaga() {
  const saveAutoGenerateNetworkChan = yield actionChannel(
    SAVEAUTOGENERATENETWORK_REQUEST
  );
  yield takeLeading(
    saveAutoGenerateNetworkChan,
    saveAndAutoGenerateNetworkSaga
  );
}

function* saveAndAutoGenerateNetworkSaga(action: IAction) {
  const {
    payload: { workflowProcess },
  } = action;

  // yield call(saveInputDeckSaga, action);
  yield put(saveInputDeckRequestAction(workflowProcess));
  // yield call(autoGenerateNetworkSaga, action);
  yield put(autoGenerateNetworkRequestAction());
}
