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
  devScenarios,
  mapDataResultFromGabriel,
} from "../../Data/EconomicsData";
import {
  ISensitivitiesRow,
  TDevScenarioNames,
} from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { IAggregateButtonProps } from "../../Routes/EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsAndRevenuesTypes";
import {
  calculateHeatMapDataFailureAction,
  calculateHeatMapDataSuccessAction,
  CALCULATE_HEATMAPDATA_REQUEST,
  updateEconomicsParameterAction,
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
  const { analysisName, analysisTitle, selectedZValue } = payload;
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

    const { data, statusCode, success } = mapDataResultFromGabriel;

    type devName = keyof typeof data;
    const sensitivitiesHeatMapData = Object.keys(data).reduce(
      (acc, devScenario) => {
        const scenarioObj = data[devScenario as devName];

        type TvZ = keyof typeof scenarioObj;
        const scenarioData = Object.keys(scenarioObj).reduce(
          (acc, variableZ) => {
            const yZVariableArr = scenarioObj[variableZ as TvZ];

            const updatedyZVariableArr = yZVariableArr.map(
              (row: Record<string, React.Key>) => {
                const xyVariables = Object.keys(row);
                const xyVariableObj = xyVariables.reduce((acc, v) => {
                  if (v.includes("Color"))
                    return {
                      ...acc,
                      [v]: row[v],
                      [v.replace("Color", "")]:
                        Math.floor(Math.random() * 10) + 1,
                    };
                  else return { ...acc, [v]: row[v] };
                }, {});

                return xyVariableObj;
              }
            );

            return { ...acc, [variableZ]: updatedyZVariableArr };
          },
          {}
        );

        return { ...acc, [devScenario]: scenarioData };
      },
      {}
    ) as typeof data;

    const devScenario = economicsAnalysisButtons[0].scenarioName as devName;
    const variableZCamel = sensitivitiesZRow.parameterTitle;
    const variableZKey = `${variableZCamel}${selectedZValue}`;

    const sensitivitiesHeatMap1or2D = (sensitivitiesHeatMapData as any)[
      devScenario
    ][variableZKey];

    yield put(
      updateEconomicsParameterAction(
        "sensitivitiesHeatMap1or2D",
        sensitivitiesHeatMap1or2D
      )
    );

    const successAction = calculateHeatMapDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        statusCode,
        success,
        sensitivitiesHeatMapData,
        sensitivitiesHeatMap1or2D,
      },
    });

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
