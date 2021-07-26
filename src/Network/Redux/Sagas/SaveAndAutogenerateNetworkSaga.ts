import {
  actionChannel,
  ActionChannelEffect,
  call,
  ForkEffect,
  put,
  putResolve,
  take,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import history from "../../../Application/Services/HistoryService";
import {
  saveInputDeckRequestAction,
  SAVE_INPUTDECK_FAILURE,
  SAVE_INPUTDECK_SUCCESS,
} from "../../../Import/Redux/Actions/InputActions";
import { failureDialogParameters } from "../../Components/DialogParameters/AutoGenerateFailureDialogParameters";
import {
  autoGenerateNetworkFailureAction,
  AUTOGENERATENETWORK_FAILURE,
  AUTOGENERATENETWORK_SUCCESS,
  SAVE_AUTOGENERATENETWORK_REQUEST,
  updateNetworkParameterAction,
} from "../Actions/NetworkActions";
import { autoGenerateNetworkRequestAction } from "./../Actions/NetworkActions";

export default function* watchAndSaveAutogenerateNetworkSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveAutoGenerateNetworkChan = yield actionChannel(
    SAVE_AUTOGENERATENETWORK_REQUEST
  );
  yield takeLeading(
    saveAutoGenerateNetworkChan,
    saveAndAutoGenerateNetworkSaga
  );
}

function* saveAndAutoGenerateNetworkSaga(action: IAction) {
  const { payload } = action;
  const { workflowProcess, titleDesc } = payload;

  try {
    yield putResolve(saveInputDeckRequestAction(workflowProcess, titleDesc));

    yield take([SAVE_INPUTDECK_SUCCESS, SAVE_INPUTDECK_FAILURE]);
  } catch (errors) {
    const failureAction = autoGenerateNetworkFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
  } finally {
    yield putResolve(
      updateNetworkParameterAction("loadNetworkGenerationWorkflow", true)
    );
    yield put(hideSpinnerAction());
  }

  try {
    yield call(forwardTo, "/apex/network/networkAuto");

    yield putResolve(autoGenerateNetworkRequestAction());
    yield take([AUTOGENERATENETWORK_SUCCESS, AUTOGENERATENETWORK_FAILURE]);
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
