import { call, put, select, takeLatest } from "redux-saga/effects";
import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import { autoGenerateNetworkRequestAction } from "../../../Network/Redux/Actions/NetworkActions";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/SaveInputDeckFailureDialogParameters";
import { fetchExistingDataRequestAction } from "../Actions/ExistingDataActions";
import {
  saveInputDeckFailureAction,
  saveInputDeckSuccessAction,
  SAVEINPUTDECK_REQUEST,
} from "../Actions/ImportActions";

export default function* watchSaveInputDeckSaga() {
  yield takeLatest(SAVEINPUTDECK_REQUEST, saveInputDeckSaga);
}

function getInputDeckType(
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) {
  if (workflowProcess.includes("facilities")) return "Facilities Input Deck";
  else if (workflowProcess.includes("forecast")) return "Forecast Input Deck";
  else return "";
}

function getInputDeckRouteParam(
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
) {
  if (workflowProcess.includes("facilities")) return "facility-inputdeck";
  else if (workflowProcess.includes("forecast")) return "forecast-inputdeck";
  else return "";
}

export function* saveInputDeckSaga(action: IAction) {
  const { payload } = action;
  const { workflowProcess } = payload;
  const { userId } = yield select((state) => state.loginReducer);
  const { projectId } = yield select((state) => state.projectReducer);

  const { tableData: inputDeck } = yield select(
    (state) => state.inputReducer["importDataWorkflows"][workflowProcess]
  );
  const {
    facilitiesInputDeckId,
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
    facilitiesInputDeckId,
    title: workflowProcess.includes("facilities")
      ? facilitiesInputDeckTitle
      : forecastInputDeckTitle,
    description: workflowProcess.includes("facilities")
      ? facilitiesInputDeckDescription
      : forecastInputDeckDescription,
    inputDeck: inputDeckData,
  };

  const config = { headers: null };
  const saveinputDeckAPI = (url: string) => authService.post(url, data, config);
  const inputDeckType = getInputDeckType(workflowProcess);

  try {
    const result = yield call(
      saveinputDeckAPI,
      `${getBaseUrl()}/${getInputDeckRouteParam(workflowProcess)}`
    );

    const {
      statusCode,
      success,
      data: { data },
    } = result;

    const successAction = saveInputDeckSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, workflowProcess, statusCode, success, data },
    });

    //If it's a forecast deck, save it
    if (workflowProcess.includes("facilities"))
      yield put(showDialogAction(successDialogParameters(inputDeckType)));
    // else if (workflowProcess.includes("forecast"))
    //   yield put(autoGenerateNetworkRequestAction());
    // else return "";

    yield put(fetchExistingDataRequestAction(projectId));
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
