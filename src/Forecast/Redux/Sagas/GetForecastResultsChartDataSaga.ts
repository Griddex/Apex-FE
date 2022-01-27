import { ActionType } from "@redux-saga/types";
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
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredForecastResultsSuccessFailureDialogParameters";
import transformForecastForChart from "../../Utils/TransformForecastForChart";
import {
  getForecastResultsChartDataFailureAction,
  getForecastResultsChartDataSuccessAction,
  GET_FORECASTRESULTS_CHARTDATA_REQUEST,
  updateForecastResultsParameterAction,
} from "../Actions/ForecastActions";

export default function* watchGetForecastResultsChartDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getForecastResultsChan = yield actionChannel(
    GET_FORECASTRESULTS_CHARTDATA_REQUEST
  );
  yield takeLeading<ActionType>(
    getForecastResultsChan,
    getForecastResultsChartDataSaga
  );
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* getForecastResultsChartDataSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosPromise>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<IAction>
  | SelectEffect,
  void,
  any
> {
  const reducer = "forecastReducer";
  const workflowCategory = "forecastChartsWorkflows";
  const defaultChart = "stackedAreaChart";

  const { payload } = action;
  const {
    selectedIds,
    selectedModuleNames,
    selectedModulePaths,
    selectedForecastChartVariable,
    selectedForecastAggregationType,
  } = payload;

  const { selectedNetworkId } = yield select((state) => state.networkReducer);
  const {
    selectedForecastingResultsId,
    isForecastResultsSaved,
    selectedForecastChartOption,
  } = yield select((state) => state.forecastReducer);
  const { variableUnits } = yield select((state) => state.unitSettingsReducer);

  const chartType = selectedForecastChartOption.value;
  const lineOrScatter =
    chartType === "lineChart" ? "lineChart" : "scatterChart";

  const config = {};
  const url = `${getBaseForecastUrl()}/chartData`;

  const requestData = {
    networkId: selectedNetworkId,
    selectedVariable: selectedForecastChartVariable,
    selectedModuleIds: selectedIds,
    selectedModuleNames: selectedModuleNames,
    selectedModulePaths: selectedModulePaths,
    isSaved: isForecastResultsSaved,
    forecastId: selectedForecastingResultsId,
    forecastAggregationType: selectedForecastAggregationType,
  };

  const message = "Loading forecast chart data...";

  try {
    yield put(showSpinnerAction(message));

    const forecastResultsAPI = (url: string) =>
      authService.post(url, requestData, config);
    const result = yield call(forecastResultsAPI, url);

    const {
      data: { xAxesData, uniqueYears },
    } = result;

    const chartData = transformForecastForChart(xAxesData);

    const isYear = true;
    const selectedVarYObj = variableUnits.find(
      (v: any) => v.variableName === selectedForecastChartVariable
    );

    if (selectedVarYObj) {
      const selectedVarTitle = selectedVarYObj?.variableTitle;
      const unitObj = selectedVarYObj["units"].find(
        (o: any) => o.unitId === selectedVarYObj.displayUnitId
      );
      const unitTitle = unitObj.title ? unitObj.title : "";

      yield put(
        updateForecastResultsParameterAction(
          "forecastChartsWorkflows.primary.commonChartProps.axisLeft.legend",
          `${selectedVarTitle} [${unitTitle}]`
        )
      );

      yield put(
        updateForecastResultsParameterAction(
          "forecastChartsWorkflows.primary.commonChartProps.axisBottom.legend",
          "Year"
        )
      );
    }

    const successAction = getForecastResultsChartDataSuccessAction();

    yield put({
      ...successAction,
      payload: {
        reducer,
        defaultChart,
        workflowCategory,
        chartType,
        chartData,
        xValueCategories: uniqueYears,
        lineOrScatter,
        isYear,
      },
    });

    yield put({
      type: "UPDATE_FORECASTPARAMETER",
      payload: {
        selectedModuleIds: selectedIds,
      },
    });
  } catch (errors) {
    const failureAction = getForecastResultsChartDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}
