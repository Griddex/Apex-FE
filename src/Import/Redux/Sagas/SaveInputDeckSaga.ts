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
import getBaseUrl from "../../../Application/Services/BaseUrlService";

export default function* watchSaveInputDeckSaga() {
  yield takeLatest(SAVEINPUTDECK_REQUEST, saveInputDeckSaga);
}

function getInputDeckType(
  workflowProcess: IAllWorkflowProcesses["workflowProcess"]
) {
  if (workflowProcess.includes("facilities")) return "Facilities Input Deck";
  else if (workflowProcess.includes("forecast")) return "Forecast Input Deck";
  else return "";
}

function getInputDeckRouteParam(
  workflowProcess: IAllWorkflowProcesses["workflowProcess"]
) {
  if (workflowProcess.includes("facilities")) return "facility-inputdeck";
  else if (workflowProcess.includes("forecast")) return "forecast-inputdeck";
  else return "";
}

function* saveInputDeckSaga(action: IAction) {
  const { payload } = action;
  const { workflowProcess } = payload;
  const { userId } = yield select((state) => state.loginReducer);
  const { projectId } = yield select((state) => state.projectReducer);

  const { tableData: inputDeck } = yield select(
    (state) => state.inputReducer["importDataWorkflows"][workflowProcess]
  );
  const {
    facilitiesInputDeckTitle,
    facilitiesInputDeckDescription,
    forecastInputDeckTitle,
    forecastInputDeckDescription,
  } = yield select((state) => state.inputReducer);

  const inputDeckData = [...inputDeck];
  inputDeckData.shift();
  const data = {
    projectId,
    userId: "Gideon",
    title: workflowProcess.includes("facilities")
      ? facilitiesInputDeckTitle
      : forecastInputDeckTitle,
    description: workflowProcess.includes("facilities")
      ? facilitiesInputDeckDescription
      : forecastInputDeckDescription,
    inputDeck: inputDeckData,
  };
  console.log(
    "Logged output --> ~ file: SaveInputDeckSaga.ts ~ line 60 ~ function*saveInputDeckSaga ~ data",
    data
  );

  const config = { headers: null };
  const saveinputDeckAPI = (url: string) => authService.post(url, data, config);
  const inputDeckType = getInputDeckType(workflowProcess);

  try {
    const response = yield call(
      saveinputDeckAPI,
      // `https://jsonplaceholder.typicode.com/posts`
      `${getBaseUrl()}/${getInputDeckRouteParam(workflowProcess)}`
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
