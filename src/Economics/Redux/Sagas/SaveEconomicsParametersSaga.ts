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
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/CostsRevenueSuccessFailureDialogParameters";
import {
  fetchExistingEconomicsDataRequestAction,
  fetchExistingEconomicsParametersHeadersRequestAction,
  saveEconomicsParametersFailureAction,
  saveEconomicsParametersSuccessAction,
  SAVEECONOMICSPARAMETERS_REQUEST,
  updateEconomicsParameterAction,
} from "../Actions/EconomicsActions";
import pick from "lodash.pick";

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

  const { tableData: inputDeck, variableUnits } = yield select(
    (state) => state[reducer][wc][wp]
  );

  const { savedMatchObjectAll: matchObject } = yield select(
    (state) => state.applicationReducer
  );

  const economicsParameters = [...inputDeck];
  console.log(
    "Logged output --> ~ file: SaveEconomicsParametersSaga.ts ~ line 82 ~ economicsParameters",
    economicsParameters
  );
  economicsParameters.shift();
  const economicsParametersObj = economicsParameters[0];

  const commercialTechnical = pick(economicsParametersObj, [
    "yearDiscounting",
    "firstOilYear",
    "oilPrice",
    "gasPrice",
    "lPGPrice",
    "leanWHGasRatio",
    "LPGWHGasRatio",
    "farmInBonus",
    "preProd",
    "postProd",
    "CHAOpex",
    "terminalFee",
    "gasVarOpex",
    "operationDaysPerAnnum",
    "utilizedGasVolume",
    "inflationRate",
    "recReserves",
    "abandCost",
    "abandCoostPerBbl",
    "prodTerrain",
    "gasDevConcept",
  ]);
  const fiscal = pick(economicsParametersObj, [
    "pia",
    "citaOnGas",
    "nddcLevy",
    "pptOption",
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
    variableUnits,
    matchObject,
  };
  console.log(
    "Logged output --> ~ file: SaveEconomicsParametersSaga.ts ~ line 120 ~ data",
    data
  );

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
      data: { data: selectedEconomicsParametersId }, //prevent 2nd trip to server
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
    yield put(fetchExistingEconomicsDataRequestAction(projectId));
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
