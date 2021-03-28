import {
  actionChannel,
  ActionChannelEffect,
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/SaveInputDeckDialogParameters";
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

export default function* watchSaveInputDeckSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveInputDeckChan = yield actionChannel(SAVEINPUTDECK_REQUEST);
  yield takeLeading(saveInputDeckChan, saveInputDeckSaga);
}

export function* saveInputDeckSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload: any; type: string }>
  | SelectEffect,
  void,
  any
> {
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

  const config = { withCredentials: false };
  const saveinputDeckAPI = (url: string) => authService.post(url, data, config);
  const inputDeckType = getInputDeckType(wp);

  yield put(showSpinnerAction(message));

  try {
    const result = yield call(
      saveinputDeckAPI,
      `${getBaseUrl()}/${getInputDeckRouteParam(wp)}`
    );

    const {
      status,
      success,
      data: { data },
    } = result;

    const successAction = saveInputDeckSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, workflowProcess: wp, status, success, data },
    });

    yield put(fetchExistingDataRequestAction(projectId));

    yield put(showDialogAction(successDialogParameters(inputDeckType, wp)));
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
