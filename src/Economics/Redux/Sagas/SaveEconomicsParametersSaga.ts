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
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import {
  fetchStoredEconomicsDataRequestAction,
  fetchStoredEconomicsParametersHeadersRequestAction,
  saveEconomicsParametersFailureAction,
  saveEconomicsParametersSuccessAction,
  SAVEECONOMICSPARAMETERS_REQUEST,
  updateEconomicsParameterAction,
} from "../Actions/EconomicsActions";
import pick from "lodash.pick";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/EconomicsParameterSuccessFailureDialogParameters";

export default function* watchSaveEconomicsParametersSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveEconomicsParametersChan = yield actionChannel(
    SAVEECONOMICSPARAMETERS_REQUEST
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
  const { workflowProcess, reducer } = payload;
  const wp = workflowProcess;
  const wc = "inputDataWorkflows";

  const { projectId } = yield select((state) => state.projectReducer);

  const {
    economicsParametersInputDeckTitle,
    economicsParametersInputDeckDescription,
  } = yield select((state) => state.economicsReducer);

  const { tableData: inputDeck, appHeaderNameUnitsMap } = yield select(
    (state) => state[reducer][wc][wp]
  );

  const { savedMatchObjectAll: matchObject } = yield select(
    (state) => state.applicationReducer
  );

  const economicsParameters = [...inputDeck];

  economicsParameters.shift();
  const economicsParametersObj = economicsParameters[0];

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
    projectId,
    title: economicsParametersInputDeckTitle,
    description: economicsParametersInputDeckDescription,
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

    yield put(
      updateEconomicsParameterAction(
        "selectedEconomicsParametersTitle",
        economicsParametersInputDeckTitle
      )
    );
    yield put(fetchStoredEconomicsDataRequestAction(projectId));
    yield put(showDialogAction(successDialogParameters()));
  } catch (errors) {
    const failureAction = saveEconomicsParametersFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(
      // showDialogAction(failureDialogParameters(errors["errors"][0].message))
      showDialogAction(failureDialogParameters(errors.message))
    );
  } finally {
    yield put(hideSpinnerAction());
  }
}
