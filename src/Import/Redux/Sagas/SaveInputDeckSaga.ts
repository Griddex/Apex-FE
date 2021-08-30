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
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
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
} from "../Actions/InputActions";
import { fetchStoredInputDeckRequestAction } from "../Actions/StoredInputDeckActions";
import { showSpinnerAction } from "./../../../Application/Redux/Actions/UISpinnerActions";
//import moment from moment

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

  const dateFormat = "DD/MM/YYYY";
  /*  stopDay: titleDesc.endForecast.getDate(),
  stopMonth: titleDesc.endForecast.getMonth() + 1,
  stopYear: titleDesc.endForecast.getFullYear(), */

  /* const mappedInputDeck = inputDeckData.map((row:any) => {
    const onStreamDate1P1C = row.onStreamDate1P1C as string;
    const onStreamDate2P2C = row.onStreamDate2P2C as string;
    const onStreamDate3P3C = row.onStreamDate3P3C as string;
    try {
      const dateLowCase = new Date(onStreamDate1P1C); // moment(onStreamDate1P1C, dateFormat); to be added
      const dateBaseCase = new Date(onStreamDate2P2C); // moment(onStreamDate2P2C, dateFormat); to be added
      const dateHighCase = new Date(onStreamDate3P3C); // moment(onStreamDate3P3C, dateFormat); to be added

      return {
        ...row,
        onStreamDate1P1C:`${dateLowCase.getDate()}/${dateLowCase.getMonth()+1}/${dateLowCase.getFullYear()}`,
        onStreamDate2P2C:`${dateBaseCase.getDate()}/${dateBaseCase.getMonth()+1}/${dateBaseCase.getFullYear()}`,
        onStreamDate3P3C:`${dateHighCase.getDate()}/${dateHighCase.getMonth()+1}/${dateHighCase.getFullYear()}`
      }
    }catch(e){

      alert("Wrong date format.");
    }

    return {
      ...row
    }

  }); */

  //console.log("inputDeckData: ", inputDeckData);
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

  console.log("data: ", data);

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

    yield put(fetchStoredInputDeckRequestAction(currentProjectId));
    yield put(fetchStoredForecastingParametersRequestAction(currentProjectId));
    // yield put(workflowResetAction(0, wp, wc));
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
