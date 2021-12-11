import pick from "lodash.pick";
import zipObject from "lodash.zipobject";
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
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { resetInputDataAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import history from "../../../Application/Services/HistoryService";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/EconomicsParameterSuccessFailureDialogParameters";
import {
  fetchStoredEconomicsDataRequestAction,
  loadEconomicsWorkflowAction,
  saveEconomicsParametersFailureAction,
  saveEconomicsParametersSuccessAction,
  SAVE_ECONOMICSPARAMETERS_REQUEST,
  updateEconomicsParameterAction,
} from "../Actions/EconomicsActions";

export default function* watchSaveEconomicsParametersSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveEconomicsParametersChan = yield actionChannel(
    SAVE_ECONOMICSPARAMETERS_REQUEST
  );
  yield takeLeading(saveEconomicsParametersChan, saveEconomicsParametersSaga);
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* saveEconomicsParametersSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosPromise>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload?: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const {
    workflowProcess,
    titleDesc: { title, description },
  } = payload;

  const wc = "inputDataWorkflows";
  const wp = workflowProcess;
  console.log(
    "🚀 ~ file: SaveEconomicsParametersSaga.ts ~ line 71 ~ workflowProcess",
    workflowProcess
  );

  const { currentProjectId } = yield select((state) => state.projectReducer);

  const { tableData, appHeaderNameUnitsMap } = yield select(
    (state) => state.economicsReducer[wc][wp]
  );
  console.log(
    "🚀 ~ file: SaveEconomicsParametersSaga.ts ~ line 77 ~ tableData",
    tableData
  );

  let inputDeck = [];
  if (wp === "economicsParametersDeckManual") {
    const names = tableData.map((row: any) => row["parameterName"]);
    const units = tableData.map((row: any) => row["unit"]);
    const values = tableData.map((row: any) => row["value"]);

    const firstRow = { ...zipObject(names, units), sn: 1 };
    const secondRow = { ...zipObject(names, values), sn: 2 };

    inputDeck = [firstRow, secondRow];
  } else {
    inputDeck = tableData;
  }

  const { savedMatchObjectAll: matchObject } = yield select(
    (state) => state.applicationReducer
  );

  const economicsParametersObj = inputDeck[1];
  console.log(
    "🚀 ~ file: SaveEconomicsParametersSaga.ts ~ line 106 ~ inputDeck",
    inputDeck
  );

  const commercialTechnical = pick(economicsParametersObj, [
    "yearDiscounting",
    "percentageDiscount",
    "firstOilYear",
    "oilPrice",
    "gasPrice",
    "lPGPrice",
    "leanWHGasRatio",
    "lPGWHGasRatio",
    "farmInSigBonus",
    "preProd",
    "postProd",
    "cHAOpex",
    "terminalFeeOpex",
    "gasVarOpex",
    "operationDaysPerAnnum",
    "utilizedGasVolume",
    "inflationRate",
    "recReserves",
    "abandCost",
    "abandCostPerBbl",
    "prodTerrain",
    "gasDevConcept",
  ]);

  const fiscal = pick(economicsParametersObj, [
    "pIA",
    "cITAGasSales",
    "nDDCLevy",
    "pPTOption",
    "eduTax",
  ]);
  const flarePenalty = pick(economicsParametersObj, "flarePenalty");
  const ppt = pick(economicsParametersObj, "ppt");
  const oilRoyalty = pick(economicsParametersObj, "oilRoyalty");
  const gasRoyalty = pick(economicsParametersObj, "gasRoyalty");

  const data = {
    projectId: currentProjectId,
    title,
    description,
    keyData: {
      commercialTechnical,
      fiscal,
      flarePenalty,
      ppt,
      oilRoyalty,
      gasRoyalty,
    },
    variableUnits: appHeaderNameUnitsMap,
    matchObject,
  };

  const config = { withCredentials: false };
  const saveEconomicsParametersAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    yield put(showSpinnerAction("Saving economics parameters data..."));

    const result = yield call(
      saveEconomicsParametersAPI,
      `${getBaseEconomicsUrl()}/parameter/save`
    );

    const {
      data: { data: selectedEconomicsParametersId },
      status,
      success,
    } = result;

    const successAction = saveEconomicsParametersSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, success, selectedEconomicsParametersId },
    });

    yield put(resetInputDataAction("economicsReducer"));
    yield put(loadEconomicsWorkflowAction("loadCostsRevenueWorkflow"));
    yield call(forwardTo, "/apex/economics/parameters/approveddeck");

    yield put(
      updateEconomicsParameterAction("selectedEconomicsParametersTitle", title)
    );
    yield put(fetchStoredEconomicsDataRequestAction(currentProjectId));
    yield put(showDialogAction(successDialogParameters()));
  } catch (errors) {
    const failureAction = saveEconomicsParametersFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(
      showDialogAction(failureDialogParameters((errors as any).message))
    );
  } finally {
    yield put(hideSpinnerAction());
  }
}

function forwardTo(routeUrl: string) {
  history.replace(routeUrl);
}
