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
import { IAllWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { workflowResetAction } from "../../../Application/Redux/Actions/WorkflowActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { fetchStoredForecastingParametersRequestAction } from "../../../Network/Redux/Actions/NetworkActions";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/SaveInputDeckDialogParameters";
import {
  saveInputDeckFailureAction,
  saveInputDeckSuccessAction,
  SAVE_INPUTDECK_REQUEST,
} from "../Actions/InputActions";
import { fetchStoredInputDeckRequestAction } from "../Actions/StoredInputDeckActions";
import { showSpinnerAction } from "./../../../Application/Redux/Actions/UISpinnerActions";

function getInputDeckType(workflowProcess: IAllWorkflows["wrkflwPrcss"]) {
  if (workflowProcess.includes("facilities")) return "Facilities InputDeck";
  else if (workflowProcess.includes("forecast")) return "Forecast InputDeck";
  else return "";
}

function getInputDeckRouteParam(workflowProcess: IAllWorkflows["wrkflwPrcss"]) {
  if (workflowProcess.includes("facilities")) return "facilities-inputdeck";
  else if (workflowProcess.includes("forecast")) return "forecast-inputdeck";
  else return "";
}

export default function* watchSaveInputDeckSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveInputDeckChan = yield actionChannel(SAVE_INPUTDECK_REQUEST);
  yield takeLeading(saveInputDeckChan, saveInputDeckSaga);
}

export function* saveInputDeckSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ type: string; payload?: any }>
  | SelectEffect,
  void,
  any
> {
  const { payload, meta } = action;
  const message = meta && meta.message ? meta.message : "";

  const { workflowProcess, reducer, titleDesc } = payload;
  const { title, description } = titleDesc;

  const wp = workflowProcess;
  const wc = "inputDataWorkflows";

  const { currentProjectId } = yield select((state) => state.projectReducer);

  const { tableData: inputDeck, appHeaderNameUnitsMap } = yield select(
    (state) => state[reducer][wc][wp]
  );

  const { savedMatchObjectAll: matchObject } = yield select(
    (state) => state.applicationReducer
  );

  const appHeaderNameUnitsMapDefined = (
    Object.keys(appHeaderNameUnitsMap) as string[]
  ).reduce((acc: any, key) => {
    const val = appHeaderNameUnitsMap[key];
    if (val.toLowerCase() !== "noid") return { ...acc, [key]: val };
    else return acc;
  }, {});

  const { facilitiesInputDeckId } = yield select((state) => state.inputReducer);

  const inputDeckData = [...inputDeck];
  inputDeckData.shift();
  const data = {
    projectId: currentProjectId,
    userId: "Gideon",
    facilitiesInputDeckId,
    title,
    description,
    inputDeck: inputDeckData,
    matchObject,
    variableUnits: appHeaderNameUnitsMapDefined,
  };

  const config = { withCredentials: true };
  const saveinputDeckAPI = (url: string) => authService.post(url, data, config);
  const inputDeckType = getInputDeckType(wp);

  try {
    yield put(showSpinnerAction(message));

    const result = yield call(
      saveinputDeckAPI,
      `${getBaseForecastUrl()}/${getInputDeckRouteParam(wp)}`
    );

    const {
      status,
      success,
      data: { data: storedDataId },
    } = result;

    const successAction = saveInputDeckSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        workflowProcess: wp,
        status,
        success,
        storedDataId,
      },
    });

    yield put(fetchStoredInputDeckRequestAction(currentProjectId));
    yield put(fetchStoredForecastingParametersRequestAction(currentProjectId));
    yield put(workflowResetAction(0, wp, wc));
    yield put(
      showDialogAction(successDialogParameters(reducer, inputDeckType, wp))
    );
  } catch (errors) {
    const failureAction = saveInputDeckFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters(inputDeckType)));
    yield put(hideSpinnerAction());
  }
}
