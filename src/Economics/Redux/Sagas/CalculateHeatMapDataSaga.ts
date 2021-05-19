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
import {
  ISensitivitiesRow,
  TDevScenarioNames,
} from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { IAggregateButtonProps } from "../../Routes/EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsAndRevenuesTypes";
import {
  calculateHeatMapDataFailureAction,
  calculateHeatMapDataSuccessAction,
  CALCULATE_HEATMAPDATA_REQUEST,
} from "../Actions/EconomicsActions";

export default function* watchCalculateHeatMapDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const calculateHeatMapDataChan = yield actionChannel(
    CALCULATE_HEATMAPDATA_REQUEST
  );
  yield takeLeading(calculateHeatMapDataChan, calculateHeatMapDataSaga);
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* calculateHeatMapDataSaga(
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
  const { analysisName, analysisTitle } = payload;
  const ap = analysisName;
  const wc = "economicsAnalysisWorkflows";

  const {
    selectedEconomicsResultsId,
    heatMapVariableXOption,
    heatMapVariableYOption,
    heatMapVariableZOption,
    isEconomicsResultsSaved,
  } = yield select((state) => state.economicsReducer);

  const {
    economicsAnalysisButtons,
    forecastScenarioAnalysis,
    sensitivitiesTable,
  } = yield select((state) => state.economicsReducer[wc][ap]);

  //TODO Gift to give me this?
  const sensitivitiesZRow = (sensitivitiesTable as ISensitivitiesRow[]).filter(
    (row) => heatMapVariableZOption.label.startsWith(row.parameterTitle)
  )[0];

  const variableZlength = sensitivitiesZRow.parameterValues.split(", ").length;

  const data = {
    analysisResultId: selectedEconomicsResultsId,
    xName: heatMapVariableXOption.value,
    yName: heatMapVariableYOption.value,
    zName: heatMapVariableZOption.value,
    zLength: variableZlength,
    isSaved: isEconomicsResultsSaved,
    developmentScenariosAnalysis: economicsAnalysisButtons.map(
      (button: IAggregateButtonProps) => {
        const devScenarioName = button.scenarioName;
        return {
          backendName: devScenarios[devScenarioName],
          frontendName: devScenarioName,
        };
      }
    ),
    forecastScenarioAnalysis,
  };

  const config = { withCredentials: false };
  const calculateHeatMapDataAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    yield put(showSpinnerAction(`Calculating data...`));

    const result = yield call(
      calculateHeatMapDataAPI,
      `${getBaseEconomicsUrl()}/analysis-chart/heatmap`
    );
    console.log(
      "Logged output --> ~ file: CalculateHeatMapDataSaga.ts ~ line 93 ~ result",
      result
    );

    const {
      data: {
        data: { matrix2D },
      },
      status,
      success,
    } = result;

    const successAction = calculateHeatMapDataSuccessAction();
    // yield put({
    //   ...successAction,
    //   payload: {
    //     ...payload,
    //     status,
    //     success,
    //     sensitivitiesHeatMapTree,
    //     economicsPlotChartsTree,
    //     economicsTemplatesTree,
    //   },
    // });

    yield put(showDialogAction(successDialogParameters(analysisTitle)));
  } catch (errors) {
    const failureAction = calculateHeatMapDataFailureAction();

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
