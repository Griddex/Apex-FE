import { call, put, select, takeLeading } from "redux-saga/effects";
import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
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
import { showSpinnerAction } from "./../../../Application/Redux/Actions/UISpinnerActions";

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
  if (workflowProcess.includes("facilities")) return "facilities-inputdeck";
  else if (workflowProcess.includes("forecast")) return "forecast-inputdeck";
  else return "";
}

export default function* watchSaveInputDeckSaga() {
  yield takeLeading(SAVEINPUTDECK_REQUEST, saveInputDeckSaga);
}

export function* saveInputDeckSaga(action: IAction) {
  const { payload, meta } = action;
  const message = meta && meta.message ? meta.message : "";

  const { workflowProcess } = payload;
  const wp = workflowProcess;
  const wc = "importDataWorkflows";
  const { userId } = yield select((state) => state.loginReducer);
  const { projectId } = yield select((state) => state.projectReducer);

  const { tableData: inputDeck } = yield select(
    (state) => state.inputReducer[wc][wp]
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
    title: wp.includes("facilities")
      ? facilitiesInputDeckTitle
      : forecastInputDeckTitle,
    description: wp.includes("facilities")
      ? facilitiesInputDeckDescription
      : forecastInputDeckDescription,
    inputDeck: inputDeckData,
  };

  const config = { headers: null };
  const saveinputDeckAPI = (url: string) => authService.post(url, data, config);
  const inputDeckType = getInputDeckType(wp);

  yield put(showSpinnerAction(message));

  try {
    const result = yield call(
      saveinputDeckAPI,
      `${getBaseUrl()}/${getInputDeckRouteParam(wp)}`
    );

    const {
      statusCode,
      success,
      data: { data },
    } = result;

    const successAction = saveInputDeckSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, workflowProcess: wp, statusCode, success, data },
    });

    if (wp.includes("facilities"))
      yield put(showDialogAction(successDialogParameters(inputDeckType)));

    yield put(fetchExistingDataRequestAction(projectId));
  } catch (errors) {
    const failureAction = saveInputDeckFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters(inputDeckType)));
  } finally {
    yield put(hideSpinnerAction());
  }
}
