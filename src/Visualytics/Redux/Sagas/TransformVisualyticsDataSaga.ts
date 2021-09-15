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
import { TChartTypes } from "../../Components/Charts/ChartTypes";
import { visualyticsChartDataTransformersObj } from "../../Data/VisualyticsData";
import {
  GET_VISUALYTICS_CHARTDATA_SUCCESS,
  transformVisualyticsChartDataFailureAction,
  transformVisualyticsChartDataSuccessAction,
  TRANSFORM_VISUALYTICS_CHARTDATA,
} from "../Actions/VisualyticsActions";

export default function* watchTransformVisualyticsChartDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const transformChartDataChan = yield actionChannel([
    TRANSFORM_VISUALYTICS_CHARTDATA,
    GET_VISUALYTICS_CHARTDATA_SUCCESS,
  ]);

  yield takeLeading<ActionType>(
    transformChartDataChan,
    transformVisualyticsChartDataSaga
  );
}

function* transformVisualyticsChartDataSaga(
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
  console.log(
    "Logged output --> ~ file: TransformVisualyticsDataSaga.ts ~ line 56 ~ payload",
    payload
  );

  const {
    visualyticsResults,
    visualyticsCategoryDragItems,
    plotChartsResults,
    plotChartsCategoryDragItems,
  } = yield select((state: RootState) => state[reducer as ReducersType]);
  console.log(
    "Logged output --> ~ file: TransformVisualyticsDataSaga.ts ~ line 64 ~ visualyticsResults",
    visualyticsResults
  );
  let data = [] as any[];

  if (chartData) data = chartData;
  else data = visualyticsResults;
  console.log(
    "Logged output --> ~ file: TransformVisualyticsDataSaga.ts ~ line 68 ~ data",
    data
  );

  try {
    const transformedChartDataFxn =
      visualyticsChartDataTransformersObj[chartType as TChartTypes];

    const transformedChartData = transformedChartDataFxn({
      data,
      categoryDragItems: visualyticsCategoryDragItems,
      lineOrScatter,
      collateBy,
      collationFxn,
    });
    console.log(
      "Logged output --> ~ file: TransformVisualyticsDataSaga.ts ~ line 82 ~ transformedChartData",
      transformedChartData
    );

    const successAction = transformVisualyticsChartDataSuccessAction();
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
    const failureAction = transformVisualyticsChartDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });
  }
}
