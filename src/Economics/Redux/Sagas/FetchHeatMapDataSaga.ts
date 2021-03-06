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
import { failureDialogParameters } from "../../Components/DialogParameters/EconomicsAnalysisSuccessFailureDialogParameters";
import {
  developmentScenariosMap,
  TDevScenariosMapKeys,
} from "../../Data/EconomicsData";
import { getAggregationLevelIndex } from "../../Utils/GetAggregationIndex";
import {
  fetchHeatMapDataFailureAction,
  FETCH_HEATMAPDATA_REQUEST,
  updateEconomicsParameterAction,
} from "../Actions/EconomicsActions";

export default function* watchFetchHeatMapDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const fetchHeatMapDataChan = yield actionChannel(FETCH_HEATMAPDATA_REQUEST);
  yield takeLeading(fetchHeatMapDataChan, fetchHeatMapDataSaga);
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* fetchHeatMapDataSaga(
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
    analysisTitle,
    noOfSensitivities,
    selectedDevScenario,
    variableZlength,
    variableZKey,
  } = payload;

  const {
    selectedEconomicsResultsId,
    heatMapVariableXOptions,
    heatMapVariableYOptions,
    heatMapVariableZOptions,
    isEconomicsResultsSaved,
    analysisOption,
  } = yield select((state) => state.economicsReducer);

  const firstXKey = Object.keys(heatMapVariableXOptions)[0];
  const firstYKey = Object.keys(heatMapVariableYOptions)[0];
  const firstZKey = Object.keys(heatMapVariableZOptions)[0];
  const path = heatMapVariableXOptions[firstXKey]?.path;

  const aggregationLevelIndex = getAggregationLevelIndex(path as string);

  const data = {
    analysisResultId: selectedEconomicsResultsId,
    xName: heatMapVariableXOptions[firstXKey]?.name,
    yName: heatMapVariableYOptions[firstYKey]?.name,
    zName: heatMapVariableZOptions[firstZKey]?.name,
    zLength: variableZlength,
    isSaved: isEconomicsResultsSaved,
    developmentScenariosAnalysis: [
      {
        backendName: selectedDevScenario,
        frontendName:
          developmentScenariosMap[selectedDevScenario as TDevScenariosMapKeys],
      },
    ],
    aggregationLevelIndex,
    analysisName: analysisOption?.value,
  };

  const config = { withCredentials: false };
  const fetchHeatMapDataAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    yield put(showSpinnerAction(`Loading data...`));

    const result = yield call(
      fetchHeatMapDataAPI,
      `${getBaseEconomicsUrl()}/analysis-chart/heatmap`
    );

    const {
      data: { data: sensitivitiesHeatMapData },
    } = result;

    const devScenario =
      developmentScenariosMap[selectedDevScenario as TDevScenariosMapKeys];

    //TODO sensitivitiesHeatMapData take care of scenario
    //when object is empty

    if (noOfSensitivities === 1 || noOfSensitivities === 2) {
      yield put(
        updateEconomicsParameterAction(
          "sensitivitiesHeatMap1or2D",
          sensitivitiesHeatMapData[devScenario][0]
        )
      );
    } else if (noOfSensitivities === 3) {
      yield put(
        updateEconomicsParameterAction(
          "sensitivitiesHeatMapData",
          sensitivitiesHeatMapData
        )
      );

      const sensitivitiesHeatMap1or2D =
        sensitivitiesHeatMapData[devScenario][variableZKey];

      yield put(
        updateEconomicsParameterAction(
          "sensitivitiesHeatMap1or2D",
          sensitivitiesHeatMap1or2D
        )
      );
    }
  } catch (errors) {
    const failureAction = fetchHeatMapDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(
      showDialogAction(
        failureDialogParameters((errors as any).message, analysisTitle)
      )
    );
  } finally {
    yield put(hideSpinnerAction());
  }
}
