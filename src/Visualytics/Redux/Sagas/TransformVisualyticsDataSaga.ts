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
    secondaryChartType,
    chartStory,
    chartData,
    xValueCategories,
    lineOrScatter,
    collateBy,
    collationFxn,
    pipeline,
  } = payload;

  const { visualyticsResults, visualyticsCategoryDragItems } = yield select(
    (state: RootState) => state[reducer as ReducersType]
  );

  let data = [] as any[];

  if (chartData) data = chartData;
  else data = visualyticsResults;

  try {
    if (pipeline === "request") {
      const xObj = visualyticsCategoryDragItems["X Category"];
      const xCategoryName = (Object.values(xObj) as any[])[0].name;
      const yCategoryNames = Object.values(
        visualyticsCategoryDragItems["Y Category"]
      ).map((o: any) => o.name);

      const ySecondaryCategoryNames = Object.values(
        visualyticsCategoryDragItems["Y Secondary Category"]
      ).map((o: any) => o.name);

      if (xCategoryName && yCategoryNames.length > 0) {
        const transformedChartDataFxn =
          visualyticsChartDataTransformersObj[chartType as TChartTypes];

        const transformedChartData = transformedChartDataFxn({
          data,
          categoryDragItems: visualyticsCategoryDragItems,
          chartStory: "primary",
          lineOrScatter,
          collateBy,
          collationFxn,
        });

        const successAction = transformVisualyticsChartDataSuccessAction();
        yield put({
          ...successAction,
          payload: {
            reducer,
            workflowCategory,
            chartType,
            chartStory: "primary",
            chartData: (transformedChartData as any)["data"],
            xValueCategories,
          },
        });
      }

      if (xCategoryName && ySecondaryCategoryNames.length > 0) {
        const transformedChartDataFxn =
          visualyticsChartDataTransformersObj[
            secondaryChartType as TChartTypes
          ];

        const transformedChartData = transformedChartDataFxn({
          data,
          categoryDragItems: visualyticsCategoryDragItems,
          chartStory: "secondary",
          lineOrScatter,
          collateBy,
          collationFxn,
        });

        const successAction = transformVisualyticsChartDataSuccessAction();
        yield put({
          ...successAction,
          payload: {
            reducer,
            workflowCategory,
            chartType: secondaryChartType,
            chartStory: "secondary",
            chartData: (transformedChartData as any)["data"],
            xValueCategories,
          },
        });
      }
    } else {
      const transformedChartDataFxn =
        visualyticsChartDataTransformersObj[chartType as TChartTypes];

      const transformedChartData = transformedChartDataFxn({
        data,
        categoryDragItems: visualyticsCategoryDragItems,
        chartStory,
        lineOrScatter,
        collateBy,
        collationFxn,
      });

      const successAction = transformVisualyticsChartDataSuccessAction();
      yield put({
        ...successAction,
        payload: {
          reducer,
          workflowCategory,
          chartType,
          chartStory,
          chartData: (transformedChartData as any)["data"],
          xValueCategories,
        },
      });
    }
  } catch (errors) {
    const failureAction = transformVisualyticsChartDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });
  }
}
