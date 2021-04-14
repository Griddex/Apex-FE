import {
  actionChannel,
  ActionChannelEffect,
  call,
  ForkEffect,
  put,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { saveInputDeckSaga } from "../../../Import/Redux/Sagas/SaveInputDeckSaga";
import {
  autoGenerateNetworkFailureAction,
  autoGenerateNetworkRequestAction,
  SAVEAUTOGENERATENETWORK_REQUEST,
} from "../Actions/NetworkActions";
import { autoGenerateNetworkSaga } from "./AutogenerateNetworkSaga";
import { saveInputDeckRequestAction } from "./../../../Import/Redux/Actions/InputActions";
import { failureDialogParameters } from "../../Components/DialogParameters/AutoGenerateFailureDialogParameters";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import history from "../../../Application/Services/HistoryService";

export default function* watchAndSaveAutogenerateNetworkSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveAutoGenerateNetworkChan = yield actionChannel(
    SAVEAUTOGENERATENETWORK_REQUEST
  );
  yield takeLeading(
    saveAutoGenerateNetworkChan,
    saveAndAutoGenerateNetworkSaga
  );
}

function* saveAndAutoGenerateNetworkSaga(action: IAction) {
  const { payload } = action;
  const { workflowProcess } = payload;

  try {
    // yield call(saveInputDeckSaga, action);
    yield put(saveInputDeckRequestAction(workflowProcess));

    yield call(forwardTo, "/apex");

    // yield call(autoGenerateNetworkSaga, action);
    yield put(autoGenerateNetworkRequestAction());
  } catch (errors) {
    const failureAction = autoGenerateNetworkFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
  } finally {
    yield put(hideSpinnerAction());
  }
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
