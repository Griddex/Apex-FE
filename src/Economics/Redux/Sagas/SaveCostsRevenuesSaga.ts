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
  fetchExistingCostsRevenuesDataRequestAction,
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
  const wp = workflowProcess;
  const wc = "inputDataWorkflows";

  const { userId } = yield select((state) => state.loginReducer);
  const { projectId } = yield select((state) => state.projectReducer);

  const { forecastResultsId } = yield select((state) => state.forecastReducer);
  const { costsRevenueTitle, costsRevenueDescription } = yield select(
    (state) => state.economicsReducer
  );

  const { tableData: costRevenues, variableUnits } = yield select(
    (state) => state[reducer][wc][wp]
  );

  const { savedMatchObjectAll: matchObject } = yield select(
    (state) => state.applicationReducer
  );

  const data = {
    userId: "Gift",
    projectId,
    forecastId: forecastResultsId,
    title: costsRevenueTitle,
    description: costsRevenueDescription,
    costRevenues,
    variableUnits,
    matchObject,
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
      data: { data: selectedCostsRevenuesId }, //prevent 2nd trip to server
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
        costsRevenueTitle
      )
    );
    yield put(fetchExistingCostsRevenuesDataRequestAction());
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
