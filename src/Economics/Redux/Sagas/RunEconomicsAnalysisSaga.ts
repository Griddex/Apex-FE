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
import { devScenarios } from "../../Data/EconomicsData";
import { IAggregateButtonProps } from "../../Routes/EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsAndRevenuesTypes";
import {
  runEconomicsAnalysisFailureAction,
  runEconomicsAnalysisSuccessAction,
  RUN_ECONOMICSANALYSIS_REQUEST,
} from "../Actions/EconomicsActions";

export default function* watchRunEconomicsAnalysisSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const runEconomicsAnalysisChan = yield actionChannel(
    RUN_ECONOMICSANALYSIS_REQUEST
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
  console.log("action: ", action);
  const { payload } = action;
  const { analysisName, analysisTitle } = payload;
  const ap = analysisName;
  const wc = "economicsAnalysisWorkflows";

  const { currentProjectId } = yield select((state) => state.projectReducer);

  const {
    selectedCostsRevenuesInputDeckId,
    selectedEconomicsParametersInputDeckId,
    selectedEconomicsSensitivitiesId,
  } = yield select((state) => state.economicsReducer);

  const { economicsAnalysisButtons, forecastScenarioAnalysis } = yield select(
    (state) => state.economicsReducer[wc][ap]
  );

  const data = {
    projectId: currentProjectId,
    analysisName,
    economicsdataId: selectedCostsRevenuesInputDeckId,
    economicsParameterId: selectedEconomicsParametersInputDeckId,
    economicsSensitivitiesId: selectedEconomicsSensitivitiesId,
    developmentScenariosAnalysis: economicsAnalysisButtons.map(
      (button: IAggregateButtonProps) => devScenarios[button.scenarioName]
    ),
    forecastScenarioAnalysis,
  };

  console.log("data: ", data);

  const config = { withCredentials: false };
  const runEconomicsAnalysisAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    yield put(showSpinnerAction(`Calculating ${analysisTitle}...`));

    const result = yield call(
      runEconomicsAnalysisAPI,
      `${getBaseEconomicsUrl()}/analyses/run-sensitivities`
    );

    console.log("result: ", result);

    const {
      data: {
        data: {
          heatMapTree: sensitivitiesHeatMapTree,
          plotChartsTree: economicsPlotChartsTree,
          templatesTree: economicsTemplatesTree,
        },
      },
      status,
      success,
    } = result;

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
function updateEconomicsResultsParameterAction(
  arg0: string,
  economicsResultsTitle: any
): any {
  throw new Error("Function not implemented.");
}
