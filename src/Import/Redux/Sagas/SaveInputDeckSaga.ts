import { call, put, select, takeLatest } from "redux-saga/effects";
import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import watchAutogenerateNetworkSaga from "../../../Network/Redux/Sagas/AutogenerateNetworkSaga";
import { openRecentProjectAction } from "../../../Project/Redux/Actions/ProjectActions";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/SaveInputDeckFailureDialogParameters";
import {
  saveInputDeckFailureAction,
  saveInputDeckSuccessAction,
  SAVEINPUTDECK_REQUEST,
} from "../Actions/ImportActions";
import history from "../../../Application/Services/HistoryService";

export default function* watchSaveInputDeckSaga() {
  yield takeLatest(SAVEINPUTDECK_REQUEST, saveInputDeckSaga);
}

function getInputDeckName(
  workflowProcess: IAllWorkflowProcesses["workflowProcess"]
) {
  if (workflowProcess.includes("facilities")) return "Facilities Input Deck";
  else if (workflowProcess.includes("forecast")) return "Forecast Input Deck";
  else return "";
}

function getInputDeckId(
  workflowProcess: IAllWorkflowProcesses["workflowProcess"]
) {
  if (workflowProcess.includes("facilities")) return "facilitiesInputDeckId";
  else if (workflowProcess.includes("forecast")) return "forecastInputDeckId";
  else return "";
}

function* saveInputDeckSaga(action: IAction) {
  const { payload } = action;
  const { workflowProcess } = payload;
  const { userId } = yield select((state) => state.loginReducer);
  const { projectId } = yield select((state) => state.projectReducer);

  const { inputDeckData, existingDataId, title, description } = yield select(
    (state) => state.inputReducer["importDataWorkflows"][workflowProcess]
  );

  const data = {
    projectId,
    userId,
    title,
    description,
    inputDeck: inputDeckData,
    [getInputDeckId(workflowProcess)]: existingDataId,
    // [getInputDeckName(inputDeckType)]: existingData,
  };

  const config = { headers: null };
  const saveinputDeckAPI = (url: string) => authService.post(url, config, data);
  const inputDeckType = getInputDeckName(workflowProcess);

  try {
    const response = yield call(
      saveinputDeckAPI,
      `https://jsonplaceholder.typicode.com/posts`
      // "http://a4b6b400f0c6.ngrok.io/api/project"
    );

    const { statusCode, success, data } = response;

    const successAction = saveInputDeckSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, workflowProcess, statusCode, success, data },
    });

    //If it's a forecast deck, save it
    if (workflowProcess.includes("facilities"))
      yield put(showDialogAction(successDialogParameters(inputDeckType)));
    else if (workflowProcess.includes("forecast"))
      yield call(watchAutogenerateNetworkSaga);
    else return "";
  } catch (errors) {
    const failureAction = saveInputDeckFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters(inputDeckType)));
  }

  yield put(hideSpinnerAction());
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
