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
  fetchStoredEconomicsDataRequestAction,
  loadEconomicsWorkflowAction,
  saveCostsRevenuesFailureAction,
  saveCostsRevenuesSuccessAction,
  SAVE_COSTSREVENUES_REQUEST,
  updateEconomicsParameterAction,
} from "../Actions/EconomicsActions";
import history from "../../../Application/Services/HistoryService";

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
    titleDesc: { title, description },
  } = payload;

  const wc = "inputDataWorkflows";
  const wp = workflowProcess;

  const { currentProjectId } = yield select((state) => state.projectReducer);
  const { savedMatchObjectAll: matchObject } = yield select(
    (state) => state.applicationReducer
  );
  const { forecastResultsId } = yield select((state) => state.forecastReducer);

  const {
    costsRevenues,
    costRevenuesButtons,
    forecastCase,
    appHeaderNameUnitsMap,
  } = yield select((state) => state.economicsReducer[wc][wp]);

  const data = {
    projectId: currentProjectId,
    forecastId: forecastResultsId,
    title,
    description,
    source: forecastResultsId ? "Apex" : "External",
    costRevenues: costsRevenues,
    developmentScenarios: Object.keys(costsRevenues),
    forecastScenario: forecastCase,
    matchObject,
    variableUnits: appHeaderNameUnitsMap,
  };

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

    yield put(loadEconomicsWorkflowAction("loadCostsRevenueWorkflow"));
    yield call(forwardTo, "/apex/economics/costsrevenue/approveddeck");

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
      showDialogAction(failureDialogParameters((errors as any).message))
    );
  } finally {
    yield put(hideSpinnerAction());
  }
}

function forwardTo(routeUrl: string) {
  history.replace(routeUrl);
}
