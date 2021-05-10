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
  runEconomicsAnalysisFailureAction,
  runEconomicsAnalysisSuccessAction,
  RUNECONOMICSANALYSIS_REQUEST,
} from "../Actions/EconomicsActions";

export default function* watchRunEconomicsAnalysisSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const runEconomicsAnalysisChan = yield actionChannel(
    RUNECONOMICSANALYSIS_REQUEST
  );
  yield takeLeading(runEconomicsAnalysisChan, runEconomicsAnalysisSaga);
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* runEconomicsAnalysisSaga(
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
    analysisName,
    economicsdataId: selectedCostsRevenuesInputDeckId,
    economicsParameterId: selectedEconomicsParametersInputDeckId,
    economicsSensitivitiesId: selectedEconomicsSensitivitiesId,
  };

  const config = { withCredentials: false };
  const runEconomicsAnalysisAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    yield put(showSpinnerAction(`Calculating ${analysisTitle}...`));

    const result = yield call(
      runEconomicsAnalysisAPI,
      `${getBaseEconomicsUrl()}/analyses/run-sensitivities`
    );
    console.log(
      "Logged output --> ~ file: RunEconomicsAnalysisSaga.ts ~ line 93 ~ result",
      result
    );

    const {
      data: {
        data: {
          heatMapTree: sensitivitiesHeatMapTree,
          plotChartsTree: economicsPlotChartsTree,
          templatesTree: economicsTemplatesTree,
        },
      }, //prevent 2nd trip to server
      status,
      success,
    } = result;
    console.log(
      "Logged output --> ~ file: RunEconomicsAnalysisSaga.ts ~ line 102 ~ sensitivitiesHeatMapTree",
      sensitivitiesHeatMapTree
    );

    const successAction = runEconomicsAnalysisSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        status,
        success,
        sensitivitiesHeatMapTree,
        economicsPlotChartsTree,
        economicsTemplatesTree,
      },
    });

    yield put(showDialogAction(successDialogParameters(analysisTitle)));
  } catch (errors) {
    const failureAction = runEconomicsAnalysisFailureAction();

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
