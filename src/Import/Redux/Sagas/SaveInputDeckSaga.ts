import { call, put, select, takeLatest } from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import watchAutogenerateNetworkSaga from "../../../Network/Redux/Sagas/AutogenerateNetworkSaga";
import { openRecentProjectAction } from "../../../Project/Redux/Actions/ProjectActions";
import { failureDialogParameters } from "../../Components/DialogParameters/SaveInputDeckFailureDialogParameters";
import {
  saveInputDeckFailureAction,
  saveInputDeckSuccessAction,
  SAVEINPUTDECK_REQUEST,
} from "../Actions/ImportActions";

export default function* watchSaveInputDeckSaga() {
  yield takeLatest(SAVEINPUTDECK_REQUEST, saveInputDeckSaga);
}

function getInputDeckName(deck: string) {
  switch (deck) {
    case "Facilities InputDeck":
      return "forecastInputDeck";
    case "Forecast InputDeck":
      return "facilitiesInputDeck";
    default:
      return "";
  }
}

function getInputDeckId(deck: string) {
  switch (deck) {
    case "Facilities InputDeck":
      return "facilitiesInputDeckId";
    case "Forecast InputDeck":
      return "forecastInputDeckId";
    default:
      return "";
  }
}

function* saveInputDeckSaga(action: IAction) {
  const { payload } = action;
  const { inputDeckType } = payload;
  const { userId } = yield select((state) => state.loginReducer);
  const { projectId } = yield select((state) => state.projectReducer);
  const { currentWorkflowProcess: workflowProcess } = yield select(
    (state) => state.workflowReducer
  );
  const { existingData, existingDataId, title, description } = yield select(
    (state) => state.inputReducer["importDataWorkflows"][workflowProcess]
  );

  const data = {
    projectId,
    userId,
    title,
    description,
    [getInputDeckId(inputDeckType)]: existingDataId,
    [getInputDeckName(inputDeckType)]: existingData,
  };

  const config = { headers: null };
  const saveinputDeckAPI = (url: string) => authService.post(url, config, data);

  try {
    const response = yield call(
      saveinputDeckAPI,
      "https://jsonplaceholder.typicode.com/posts"
      // "http://a4b6b400f0c6.ngrok.io/api/project"
    );

    const { statusCode, success, data } = response;

    const successAction = saveInputDeckSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, workflowProcess, statusCode, success, data },
    });

    //If it's a forecast deck, save it
    yield call(watchAutogenerateNetworkSaga);
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

function* handleClick(userId: string, projectId: string) {
  // const action = openRecentProjectAction(userId,projectId);
  // yield put({ ...action, userId, projectId });
  yield put(openRecentProjectAction(userId, projectId));
}
