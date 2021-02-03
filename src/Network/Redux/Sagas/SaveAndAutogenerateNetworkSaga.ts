import { call, takeLatest } from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { saveInputDeckSaga } from "../../../Import/Redux/Sagas/SaveInputDeckSaga";
import { SAVEAUTOGENERATENETWORK_REQUEST } from "../Actions/NetworkActions";
import { autoGenerateNetworkSaga } from "./AutogenerateNetworkSaga";

export default function* watchAndSaveAutogenerateNetworkSaga() {
  yield takeLatest(
    SAVEAUTOGENERATENETWORK_REQUEST,
    saveAndAutoGenerateNetworkSaga
  );
}

function* saveAndAutoGenerateNetworkSaga(action: IAction) {
  yield call(saveInputDeckSaga, action);
  yield call(autoGenerateNetworkSaga, action);
}
