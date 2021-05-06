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
} from "../../Components/DialogParameters/EconomicsAnalysisSuccessFailureDialogParameters";
import {
  executeEconomicsAnalysisFailureAction,
  executeEconomicsAnalysisSuccessAction,
  EXECUTEECONOMICSANALYSIS_REQUEST,
} from "../Actions/EconomicsActions";

export default function* watchExecuteEconomicsAnalysisSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const executeEconomicsAnalysisChan = yield actionChannel(
    EXECUTEECONOMICSANALYSIS_REQUEST
  );
  yield takeLeading(executeEconomicsAnalysisChan, executeEconomicsAnalysisSaga);
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* executeEconomicsAnalysisSaga(
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
  const { workflowProcess, analysisName, analysisTitle } = payload;
  const wp = workflowProcess;
  const wc = "economicsAnalysisWorkflows";

  const { projectId } = yield select((state) => state.projectReducer);

  const {
    selectedCostsRevenuesInputDeckId,
    selectedEconomicsParametersInputDeckId,
    selectedEconomicsSensitivitiesId,
  } = yield select((state) => state.economicsReducer);

  const data = {
    projectId,
    selectedCostsRevenuesInputDeckId,
    selectedEconomicsParametersInputDeckId,
    selectedEconomicsSensitivitiesId,
    analysisName,
  };

  const config = { withCredentials: false };
  const executeEconomicsAnalysisAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    yield put(showSpinnerAction(`Calculating ${analysisTitle}...`));

    const result = yield call(
      executeEconomicsAnalysisAPI,
      // `${getBaseEconomicsUrl()}/analyses/run-sensitivities`
      `${getBaseEconomicsUrl()}/analyses/run-sensitivities`
    );
    console.log(
      "Logged output --> ~ file: ExecuteEconomicsAnalysisSaga.ts ~ line 93 ~ result",
      result
    );

    const {
      data: { data }, //prevent 2nd trip to server
      status,
      success,
    } = result;

    const successAction = executeEconomicsAnalysisSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, success, data },
    });

    // yield put(
    //   updateEconomicsParameterAction(
    //     "selectedCostsRevenuesTitle",
    //     costsRevenuesInputDeckTitle
    //   )
    // );
    yield put(showDialogAction(successDialogParameters(analysisTitle)));
  } catch (errors) {
    const failureAction = executeEconomicsAnalysisFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(
      // showDialogAction(failureDialogParameters(errors["errors"][0].message))
      showDialogAction(failureDialogParameters(errors.message, analysisTitle))
    );
  } finally {
    yield put(hideSpinnerAction());
  }
}
