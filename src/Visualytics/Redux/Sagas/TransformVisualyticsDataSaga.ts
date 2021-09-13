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
import { GET_FORECASTRESULTS_CHARTDATA_SUCCESS } from "../../../Forecast/Redux/Actions/ForecastActions";
import { TChartTypes } from "../../Components/Charts/ChartTypes";
import { chartDataTransformersObj } from "../../Data/VisualyticsData";
import {
  TRANSFORM_CHARTDATA,
  GET_VISUALYTICS_CHARTDATA_SUCCESS,
  transformChartDataFailureAction,
  transformChartDataSuccessAction,
} from "../Actions/VisualyticsActions";

export default function* watchTransformChartDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const transformChartDataChan = yield actionChannel([
    TRANSFORM_CHARTDATA,
    GET_VISUALYTICS_CHARTDATA_SUCCESS,
    GET_FORECASTRESULTS_CHARTDATA_SUCCESS,
  ]);

  yield takeLeading<ActionType>(transformChartDataChan, transformChartDataSaga);
}

function* transformChartDataSaga(
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
  console.log(
    "Logged output --> ~ file: TransformChartDataSaga.ts ~ line 44 ~ payload",
    payload
  );
  const wc = workflowCategory;
  const ch = defaultChart;

  const foredcr = yield select(
    (state: RootState) => state[reducer as ReducersType][wc]
  );
  console.log(
    "Logged output --> ~ file: TransformChartDataSaga.ts ~ line 62 ~ foredcr",
    foredcr
  );
  const chartDataObj = yield select(
    (state: RootState) => state[reducer as ReducersType][wc][ch]
  );
  let data = [] as any[];

  if (chartData) data = chartData;
  else data = chartDataObj["chartData"];

  try {
    const transformedChartDataFxn =
      chartDataTransformersObj[chartType as TChartTypes];

    const transformedChartData = transformedChartDataFxn({
      data,
      yearsOrMonths: xValueCategories,
      lineOrScatter,
      isYear,
    });
    console.log(
      "Logged output --> ~ file: TransformChartDataSaga.ts ~ line 58 ~ transformedChartData",
      transformedChartData
    );

    const successAction = transformChartDataSuccessAction();
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
    console.log(
      "Logged output --> ~ file: TransformChartDataSaga.ts ~ line 74 ~ errors",
      errors
    );
    const failureAction = transformChartDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });
  }
}
