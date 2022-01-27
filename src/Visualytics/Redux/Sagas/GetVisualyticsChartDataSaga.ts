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
import { getBaseVisualyticsUrl } from "../../../Application/Services/BaseUrlService";
import { IDragItem } from "../../Components/ChartCategories/ChartCategoryTypes";
import {
  getVisualyticsChartDataFailureAction,
  getVisualyticsChartDataSuccessAction,
  GET_VISUALYTICS_CHARTDATA_REQUEST,
} from "../Actions/VisualyticsActions";

export default function* watchGetVisualyticsChartDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getVisualyticsChan = yield actionChannel(
    GET_VISUALYTICS_CHARTDATA_REQUEST
  );
  yield takeLeading<ActionType>(
    getVisualyticsChan,
    getVisualyticsChartDataSaga
  );
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* getVisualyticsChartDataSaga(
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
  const { reducer, workflowCategory } = payload;

  const {
    selectedVisualyticsId,
    visualyticsCategoryDragItems,
    selectedVisualyticsChartOption,
    selectedVisualyticsSecondaryChartOption,
  } = yield select((state) => state.visualyticsReducer);

  const chartType = selectedVisualyticsChartOption.value;
  const secondaryChartType = selectedVisualyticsSecondaryChartOption.value;

  const config = {};
  const url = `${getBaseVisualyticsUrl()}/chartData`;

  const columnNames = Object.values(
    visualyticsCategoryDragItems as Record<string, Record<string, IDragItem>>
  ).reduce((acc, row) => {
    const dragItems = Object.values(row);

    return [...acc, ...dragItems.map((obj) => obj.name)];
  }, [] as string[]);

  const requestData = {
    chartType,
    secondaryChartType,
    columnNames,
    visualyticsId: selectedVisualyticsId,
  };

  const message = "Loading visualytics data...";

  try {
    yield put(showSpinnerAction(message));

    const visualyticsResultsAPI = (url: string) =>
      authService.post(url, requestData, config);
    const result = yield call(visualyticsResultsAPI, url);

    const {
      data: {
        data: { visualyticsResults: chartData },
      },
    } = result;

    const successAction = getVisualyticsChartDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        reducer,
        workflowCategory,
        chartType,
        secondaryChartType,
        chartData,
        pipeline: "request",
      },
    });
  } catch (errors) {
    const failureAction = getVisualyticsChartDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    // yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}
