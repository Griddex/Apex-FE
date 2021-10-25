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
import { TChartTypes } from "../../../Visualytics/Components/Charts/ChartTypes";
import { visualyticsChartDataTransformersObj } from "../../../Visualytics/Data/VisualyticsData";
import {
  GET_ECONOMICSPLOT_CHARTDATA_SUCCESS,
  transformEconomicsChartDataFailureAction,
  transformEconomicsChartDataSuccessAction,
  TRANSFORM_ECONOMICSPLOT_CHARTDATA,
} from "../Actions/EconomicsActions";

export default function* watchTransformEconomicsChartDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const transformChartDataChan = yield actionChannel([
    TRANSFORM_ECONOMICSPLOT_CHARTDATA,
    GET_ECONOMICSPLOT_CHARTDATA_SUCCESS,
  ]);

  yield takeLeading<ActionType>(
    transformChartDataChan,
    transformEconomicsChartDataSaga
  );
}

function* transformEconomicsChartDataSaga(
  action: IAction
): Generator<TakeEffect | PutEffect<IAction> | SelectEffect, void, any> {
  const { payload } = action;
  const {
    reducer,
    workflowCategory,
    chartType,
    chartData,
    xValueCategories,
    lineOrScatter,
    collateBy,
    collationFxn,
  } = payload;

  const { plotChartsResults, plotChartsCategoryDragItems } = yield select(
    (state: RootState) => state[reducer as ReducersType]
  );

  let data = [] as any[];

  if (chartData) data = chartData;
  else data = plotChartsResults;

  try {
    const transformedChartDataFxn =
      visualyticsChartDataTransformersObj[chartType as TChartTypes];

    const transformedChartData = transformedChartDataFxn({
      data,
      categoryDragItems: plotChartsCategoryDragItems,
      lineOrScatter,
      collateBy,
      collationFxn,
    });

    const successAction = transformEconomicsChartDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        reducer,
        workflowCategory,
        chartType,
        chartData: (transformedChartData as any)["data"],
        xValueCategories,
      },
    });
  } catch (errors) {
    const failureAction = transformEconomicsChartDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });
  }
}
