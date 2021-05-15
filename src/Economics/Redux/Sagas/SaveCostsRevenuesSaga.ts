import { access } from "fs";
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
import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
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
import { devScenarios } from "../../Data/EconomicsData";
import { TDevScenarioNames } from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { IAggregateButtonProps } from "../../Routes/EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsAndRevenuesTypes";
import {
  fetchExistingCostsRevenuesHeadersRequestAction,
  fetchExistingEconomicsDataRequestAction,
  saveCostsRevenuesFailureAction,
  saveCostsRevenuesSuccessAction,
  SAVECOSTSREVENUES_REQUEST,
  updateEconomicsParameterAction,
} from "../Actions/EconomicsActions";

export default function* watchSaveCostsRevenuesSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveCostsRevenuesChan = yield actionChannel(SAVECOSTSREVENUES_REQUEST);
  yield takeLeading(saveCostsRevenuesChan, saveCostsRevenuesSaga);
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* saveCostsRevenuesSaga(
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
  console.log(
    "Logged output --> ~ file: SaveCostsRevenuesSaga.ts ~ line 64 ~ reducer",
    reducer
  );
  console.log(
    "Logged output --> ~ file: SaveCostsRevenuesSaga.ts ~ line 64 ~ workflowProcess",
    workflowProcess
  );
  const wp = workflowProcess;
  const wc = "inputDataWorkflows";

  const { projectId } = yield select((state) => state.projectReducer);
  const { savedMatchObjectAll: matchObject } = yield select(
    (state) => state.applicationReducer
  );
  const { forecastResultsId } = yield select((state) => state.forecastReducer);
  const { costsRevenuesInputDeckTitle, costsRevenuesInputDeckDescription } =
    yield select((state) => state.economicsReducer);

  const {
    costsRevenues,
    costRevenuesButtons,
    forecastScenario,
    variableUnits,
  } = yield select((state) => state[reducer][wc][wp]);

  const shiftedCostRevenues = costRevenuesButtons
    .map((b: IAggregateButtonProps) => b.scenarioName)
    .reduce(
      (acc: Record<TDevScenarioNames, IRawRow[]>, name: TDevScenarioNames) => {
        costsRevenues[name].shift();
        return { ...acc, [name]: costsRevenues[name] };
      },
      {} as Record<TDevScenarioNames, IRawRow[]>
    );

  const data = {
    projectId,
    forecastId: forecastResultsId,
    title: costsRevenuesInputDeckTitle,
    description: costsRevenuesInputDeckDescription,
    source: forecastResultsId ? "Apex" : "External",
    costRevenues: shiftedCostRevenues,
    developmentScenarios: Object.keys(shiftedCostRevenues).map(
      (k) => devScenarios[k as TDevScenarioNames]
    ),
    forecastScenario,
    matchObject,
    variableUnits,
  };
  console.log(
    "Logged output --> ~ file: SaveCostsRevenuesSaga.ts ~ line 83 ~ data",
    data
  );

  const config = { withCredentials: false };
  const saveCostsRevenuesAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    yield put(showSpinnerAction("Saving costs and revenues data..."));

    const result = yield call(
      saveCostsRevenuesAPI,
      `${getBaseEconomicsUrl()}/data/costRevenue/save`
    );

    const {
      data: { data: selectedCostsRevenuesId },
      status,
      success,
    } = result;

    const successAction = saveCostsRevenuesSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, success, selectedCostsRevenuesId },
    });

    yield put(
      updateEconomicsParameterAction(
        "selectedCostsRevenuesTitle",
        costsRevenuesInputDeckTitle
      )
    );
    yield put(fetchExistingEconomicsDataRequestAction(projectId));
    yield put(showDialogAction(successDialogParameters()));
  } catch (errors) {
    const failureAction = saveCostsRevenuesFailureAction();

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
