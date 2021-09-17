import { ActionType } from "@redux-saga/types";
import {
  actionChannel,
  ActionChannelEffect,
  ForkEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import { ReducersType } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  GET_FORECASTRESULTS_CHARTDATA_SUCCESS,
  transformForecastChartDataFailureAction,
  transformForecastChartDataSuccessAction,
  TRANSFORM_FORECAST_CHARTDATA,
} from "../Actions/ForecastActions";
import { TChartTypes } from "../../../Visualytics/Components/Charts/ChartTypes";
import { forecastChartDataTransformersObj } from "../../../Visualytics/Data/VisualyticsData";

export default function* watchTransformForecastChartDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const transformChartDataChan = yield actionChannel([
    TRANSFORM_FORECAST_CHARTDATA,
    GET_FORECASTRESULTS_CHARTDATA_SUCCESS,
  ]);

  yield takeLeading<ActionType>(
    transformChartDataChan,
    transformForecastChartDataSaga
  );
}

function* transformForecastChartDataSaga(
  action: IAction
): Generator<TakeEffect | PutEffect<IAction> | SelectEffect, void, any> {
  const { payload } = action;
  const {
    reducer,
    workflowCategory,
    defaultChart,
    chartType,
    chartData,
    xValueCategories,
    lineOrScatter,
    isYear,
  } = payload;

  const wc = workflowCategory;
  const ch = defaultChart;

  const chartDataObj = yield select(
    (state: RootState) => state[reducer as ReducersType][wc][ch]
  );
  let data = [] as any[];

  if (chartData) data = chartData;
  else data = chartDataObj["chartData"];

  try {
    const transformedChartDataFxn =
      forecastChartDataTransformersObj[chartType as TChartTypes];

    const transformedChartData = transformedChartDataFxn({
      data,
      yearsOrMonths: xValueCategories,
      lineOrScatter,
      isYear,
    });

    const successAction = transformForecastChartDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        reducer,
        chartType,
        defaultChart,
        chartData: transformedChartData,
        xValueCategories,
        lineOrScatter,
        isYear,
        workflowCategory,
      },
    });
  } catch (errors) {
    const failureAction = transformForecastChartDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });
  }
}
