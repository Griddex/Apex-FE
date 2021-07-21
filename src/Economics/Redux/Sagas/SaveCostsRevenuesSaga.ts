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
  fetchStoredCostsRevenuesHeadersRequestAction,
  fetchStoredEconomicsDataRequestAction,
  saveCostsRevenuesFailureAction,
  saveCostsRevenuesSuccessAction,
  SAVE_COSTSREVENUES_REQUEST,
  updateEconomicsParameterAction,
} from "../Actions/EconomicsActions";

export default function* watchSaveCostsRevenuesSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveCostsRevenuesChan = yield actionChannel(SAVE_COSTSREVENUES_REQUEST);
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
  const {
    workflowProcess,
    reducer,
    titleDesc: { title, description },
  } = payload;

  const wp = workflowProcess;
  const wc = "inputDataWorkflows";

  const { currentProjectId } = yield select((state) => state.projectReducer);
  const { savedMatchObjectAll: matchObject } = yield select(
    (state) => state.applicationReducer
  );
  const { forecastResultsId } = yield select((state) => state.forecastReducer);

  const {
    costsRevenues,
    costRevenuesButtons,
    forecastScenario,
    appHeaderNameUnitsMap,
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
    projectId: currentProjectId,
    forecastId: forecastResultsId,
    title,
    description,
    source: forecastResultsId ? "Apex" : "External",
    costRevenues: shiftedCostRevenues,
    developmentScenarios: Object.keys(shiftedCostRevenues).map(
      (k) => devScenarios[k as TDevScenarioNames]
    ),
    forecastScenario,
    matchObject,
    variableUnits: appHeaderNameUnitsMap,
  };

  const config = {};
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
      updateEconomicsParameterAction("selectedCostsRevenuesTitle", title)
    );
    yield put(fetchStoredEconomicsDataRequestAction(currentProjectId));
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
