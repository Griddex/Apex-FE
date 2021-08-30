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
import { developmentScenariosMap } from "../../Data/EconomicsData";
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
  const { analysisName, analysisTitle, variableZlength, selectedDevScenario } =
    payload;
  const ap = analysisName;
  const wc = "economicsAnalysisWorkflows";

  const {
    selectedEconomicsResultsId,
    heatMapVariableXOption,
    heatMapVariableYOption,
    heatMapVariableZOption,
    isEconomicsResultsSaved,
  } = yield select((state) => state.economicsReducer);

  const data = {
    analysisResultId: selectedEconomicsResultsId,
    xName: heatMapVariableXOption.value,
    yName: heatMapVariableYOption.value,
    zName: heatMapVariableZOption.value,
    zLength: variableZlength,
    isSaved: isEconomicsResultsSaved,
    developmentScenariosAnalysis: [
      {
        backendName: selectedDevScenario,
        frontendName:
          developmentScenariosMap[
            selectedDevScenario as keyof typeof developmentScenariosMap
          ],
      },
    ],

    //TODO Alternative place to get this
    //Gift to give me this?
    forecastScenarioAnalysis: "Payout",
  };

  const config = { withCredentials: false };
  const fetchHeatMapDataAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    yield put(showSpinnerAction(`Fetching data...`));

    const result = yield call(
      fetchHeatMapDataAPI,
      `${getBaseEconomicsUrl()}/analysis-chart/heatmap`
    );

    const {
      data: { data: sensitivitiesHeatMapData },
    } = result;

    yield put(
      updateEconomicsParameterAction(
        "sensitivitiesHeatMapData",
        sensitivitiesHeatMapData
      )
    );
  } catch (errors) {
    const failureAction = fetchHeatMapDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(
      showDialogAction(failureDialogParameters(errors.message, analysisTitle))
    );
  } finally {
    yield put(hideSpinnerAction());
  }
}
