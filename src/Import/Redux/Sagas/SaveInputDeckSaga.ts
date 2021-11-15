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
import { loadWorkflowAction } from "../../../Application/Redux/Actions/LayoutActions";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { workflowResetAction } from "../../../Application/Redux/Actions/WorkflowActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import history from "../../../Application/Services/HistoryService";
import { TTitleDescription } from "../../../Application/Types/ApplicationTypes";
import {
  autoGenerateNetworkRequestAction,
  fetchStoredForecastingParametersRequestAction,
  updateNetworkParameterAction,
} from "../../../Network/Redux/Actions/NetworkActions";
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
import { initialInputWorkflowParameters } from "../State/InputState";
import { showSpinnerAction } from "./../../../Application/Redux/Actions/UISpinnerActions";

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

  const { workflowProcess, reducer, titleDesc, finalizationChoice } = payload;
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

    yield put(workflowResetAction(0, wp, wc));
    yield put(fetchStoredInputDeckRequestAction(currentProjectId));
    yield put(fetchStoredForecastingParametersRequestAction(currentProjectId));
    //TODO - reset this in reducer
    yield put(
      updateInputParameterAction(
        "inputReducer",
        `${wc}.${wp}`,
        initialInputWorkflowParameters
      )
    );

    if (finalizationChoice === "saveManual") {
      yield put(
        updateInputParameterAction(
          "inputReducer",
          "selectedForecastInputDeckTitle",
          title
        )
      );
      yield put(updateNetworkParameterAction("isNetworkAuto", false));
      yield put(
        updateNetworkParameterAction("loadNetworkGenerationWorkflow", true)
      );
      yield call(forwardTo, "/apex/network/networkManual");
    } else if (finalizationChoice === "saveAuto") {
      yield put(
        updateInputParameterAction(
          "inputReducer",
          "selectedForecastInputDeckTitle",
          title
        )
      );
      yield put(updateNetworkParameterAction("isNetworkAuto", true));
      yield put(
        updateNetworkParameterAction("loadNetworkGenerationWorkflow", true)
      );

      yield call(forwardTo, "/apex/network/networkAuto");
      yield put(autoGenerateNetworkRequestAction());
    } else {
      yield put(loadWorkflowAction());
      yield call(forwardTo, getGotoRouteUrl(workflowProcess));
    }

    yield put(
      showDialogAction(successDialogParameters(reducer, inputDeckType, wp))
    );
  } catch (errors) {
    const failureAction = saveInputDeckFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });
    console.log("🚀 ~ file: SaveInputDeckSaga.ts ~ line 225 ~ errors", errors);

    const errorMessages = (errors as any)["errors"]
      .map((row: any) => row.message)
      .join(",");

    yield put(
      showDialogAction(failureDialogParameters(inputDeckType, errorMessages))
    );
  } finally {
    yield put(hideSpinnerAction());
  }
}

function forwardTo(routeUrl: string) {
  history.replace(routeUrl);
}
