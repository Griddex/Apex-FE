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
import { TAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { workflowResetAction } from "../../../Application/Redux/Actions/WorkflowActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import { TTitleDescription } from "../../../Application/Types/ApplicationTypes";
import { fetchStoredForecastingParametersRequestAction } from "../../../Network/Redux/Actions/NetworkActions";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/SaveInputDeckDialogParameters";
import {
  saveInputDeckFailureAction,
  saveInputDeckSuccessAction,
  SAVE_INPUTDECK_REQUEST,
  updateInputParameterAction,
} from "../Actions/InputActions";
import { fetchStoredInputDeckRequestAction } from "../Actions/StoredInputDeckActions";
import { showSpinnerAction } from "./../../../Application/Redux/Actions/UISpinnerActions";
import { initialInputWorkflowParameters } from "../State/InputState";
import history from "../../../Application/Services/HistoryService";
import { loadWorkflowAction } from "../../../Application/Redux/Actions/LayoutActions";

function getInputDeckType(workflowProcess: TAllWorkflowProcesses) {
  if (workflowProcess.includes("facilities")) return "Facilities InputDeck";
  else if (workflowProcess.includes("forecast")) return "Forecast InputDeck";
  else return "";
}

function getInputDeckRouteParam(workflowProcess: TAllWorkflowProcesses) {
  if (workflowProcess.includes("facilities")) return "facilities-inputdeck";
  else if (workflowProcess.includes("forecast")) return "forecast-inputdeck";
  else return "";
}

function getGotoRouteUrl(workflowProcess: TAllWorkflowProcesses) {
  if (workflowProcess.includes("facilities"))
    return "/apex/import/facilitiesdeck/approveddeck";
  else if (workflowProcess.includes("forecast"))
    return "/apex/import/forecastdeck/approveddeck";
  else return "";
}

export default function* watchSaveInputDeckSaga(
  autoTitleDesc?: TTitleDescription
): Generator<ActionChannelEffect | ForkEffect<never>, void, any> {
  const saveInputDeckChan = yield actionChannel(SAVE_INPUTDECK_REQUEST);
  yield takeLeading(saveInputDeckChan, (action) =>
    saveInputDeckSaga(action, autoTitleDesc as TTitleDescription)
  );
}

export function* saveInputDeckSaga(
  action: IAction,
  autoTitleDesc: TTitleDescription
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
  const currentTitleDesc = autoTitleDesc ? autoTitleDesc : titleDesc;
  const { title, description } = currentTitleDesc;

  const wc = "inputDataWorkflows";
  const wp = workflowProcess;

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
    if (Array.isArray(val) && val[0].toLowerCase() === "noid") {
      return acc;
    }
    if (val.toLowerCase() !== "noid") return { ...acc, [key]: val };
    else return acc;
  }, {});

  const { facilitiesInputDeckId } = yield select((state) => state.inputReducer);

  const inputDeckData = [...inputDeck];
  inputDeckData.shift();

  const dateFormat = "DD/MM/YYYY";

  const data = {
    userId: "Gideon",
    projectId: currentProjectId,
    facilitiesInputDeckId,
    title,
    description,
    inputDeck: inputDeckData,
    matchObject,
    variableUnits: appHeaderNameUnitsMapDefined,
  };

  const config = { withCredentials: false };
  const saveinputDeckAPI = (url: string) => authService.post(url, data, config);
  const inputDeckType = getInputDeckType(wp);

  try {
    yield put(showSpinnerAction(message));

    const result = yield call(
      saveinputDeckAPI,
      `${getBaseForecastUrl()}/${getInputDeckRouteParam(wp)}/save`
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

    yield put(loadWorkflowAction());
    yield call(forwardTo, getGotoRouteUrl(workflowProcess));
    yield put(workflowResetAction(0, wp, wc));
    yield put(fetchStoredInputDeckRequestAction(currentProjectId));
    yield put(fetchStoredForecastingParametersRequestAction(currentProjectId));
    yield put(
      showDialogAction(successDialogParameters(reducer, inputDeckType, wp))
    );
    yield put(
      updateInputParameterAction(
        "inputReducer",
        `${wc}.${wp}`,
        initialInputWorkflowParameters
      )
    );
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

function forwardTo(routeUrl: string) {
  history.replace(routeUrl);
}
