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
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredForecastResultsSuccessFailureDialogParameters";
import {
  getForecastResultsChartDataFailureAction,
  getForecastResultsChartDataSuccessAction,
  GET_FORECASTRESULTS_CHARTDATA_REQUEST,
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
  const { payload } = action;
  const {
    selectedIds,
    selectedModuleNames,
    selectedModulePaths,
    selectedForecastChartVariable,
    selectedForecastAggregationType
  } = payload;

  const { selectedNetworkId } = yield select((state) => state.networkReducer);
  const {
    selectedForecastingResultsId,
    isForecastResultsSaved,
    selectedForecastChartOption,
  } = yield select((state) => state.forecastReducer);

  const chartType = selectedForecastChartOption.value;
  const lineOrScatter = chartType === "lineChart" ? "line" : "scatter";

  const config = {};
  const url = `${getBaseForecastUrl()}/chartData`;

  const data = {
    networkId: selectedNetworkId,
    selectedVariable: selectedForecastChartVariable,
    selectedModuleIds: selectedIds,
    selectedModuleNames: selectedModuleNames,
    selectedModulePaths: selectedModulePaths,
    isSaved: isForecastResultsSaved,
    forecastId: selectedForecastingResultsId,
    forecastAggregationType: selectedForecastAggregationType
  };

  const message = "Loading forecast chart data...";

  try {
    yield put(showSpinnerAction(message));

    const forecastResultsAPI = (url: string) =>
      authService.post(url, data, config);
    const result = yield call(forecastResultsAPI, url);
    console.log("result: ", result);

    const { data: forecastResults } = result;
    //TODO Get both from Gift
    const xValueCategories = forecastResults.map(
      (_: any, i: number) => 2020 + i
    );
    const isYear = true;


    console.log("forecastResults: ", forecastResults);

    yield put({
      type: "UPDATE_FORECASTRESULT_PARAMETERS",
      payload: {
        timeData: [],
        forecastResults
      },
    });

   /*  const successAction = getForecastResultsChartDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        chartType,
        forecastResults,
        xValueCategories,
        lineOrScatter,
        isYear,
      },
    }); */

   /*  yield put({
      type: "UPDATE_FORECASTPARAMETER",
      payload: {
        path: "forecastResults",
        value: forecastResults
      },
    }); */

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
