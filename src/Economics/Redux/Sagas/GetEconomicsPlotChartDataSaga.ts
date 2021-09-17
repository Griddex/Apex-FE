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
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import { IDragItem } from "../../../Visualytics/Components/ChartCategories/ChartCategoryTypes";
import zipObject from "lodash.zipobject";
import {
  getEconomicsPlotChartDataFailureAction,
  getEconomicsPlotChartDataSuccessAction,
  GET_ECONOMICSPLOT_CHARTDATA_REQUEST,
} from "../Actions/EconomicsActions";

export default function* watchGetEconomicsPlotChartDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getEconomicsPlotChan = yield actionChannel(
    GET_ECONOMICSPLOT_CHARTDATA_REQUEST
  );
  yield takeLeading<ActionType>(
    getEconomicsPlotChan,
    getEconomicsPlotChartDataSaga
  );
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* getEconomicsPlotChartDataSaga(
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
    selectedEconomicsResultsId,
    isEconomicsResultsSaved,
    plotChartsCategoryDragItems,
    selectedEconomicsPlotChartOption,
  } = yield select((state) => state.economicsReducer);
  console.log(
    "Logged output --> ~ file: GetEconomicsPlotChartDataSaga.ts ~ line 68 ~ selectedEconomicsPlotChartOption",
    selectedEconomicsPlotChartOption
  );
  console.log(
    "Logged output --> ~ file: GetEconomicsPlotChartDataSaga.ts ~ line 68 ~ plotChartsCategoryDragItems",
    plotChartsCategoryDragItems
  );
  console.log(
    "Logged output --> ~ file: GetEconomicsPlotChartDataSaga.ts ~ line 68 ~ selectedEconomicsResultsId",
    selectedEconomicsResultsId
  );

  const chartType = selectedEconomicsPlotChartOption.value;

  const config = {};
  const url = `${getBaseEconomicsUrl()}/analysis-chart/plotCharts`;

  const plotChartDragItems = Object.values(
    plotChartsCategoryDragItems as Record<string, Record<string, IDragItem>>
  );

  const data = plotChartDragItems.reduce((acc, categoryObj) => {
    const dragItems = Object.values(categoryObj);
    console.log(
      "Logged output --> ~ file: GetEconomicsPlotChartDataSaga.ts ~ line 93 ~ data ~ dragItems",
      dragItems
    );

    const newDragItems = dragItems.reduce((acc, item) => {
      console.log(
        "Logged output --> ~ file: GetEconomicsPlotChartDataSaga.ts ~ line 96 ~ newDragItems ~ item",
        item
      );
      const { name, path } = item;
      const sensitivitiesJoined = path?.split("@#$%")[3];
      console.log(
        "Logged output --> ~ file: GetEconomicsPlotChartDataSaga.ts ~ line 97 ~ newDragItems ~ sensitivitiesJoined",
        sensitivitiesJoined
      );
      const sensitivitiesArr = sensitivitiesJoined?.split("-");
      console.log(
        "Logged output --> ~ file: GetEconomicsPlotChartDataSaga.ts ~ line 99 ~ newDragItems ~ sensitivitiesArr",
        sensitivitiesArr
      );

      return {
        ...acc,
        [name]: zipObject(["x", "y", "z"], sensitivitiesArr as string[]),
      };
    }, {});

    return { ...acc, ...newDragItems };
  }, {});

  const requestData = {
    data,
    developmentScenario: "OIL/AG",
    isSaved: isEconomicsResultsSaved,
    analysisResultId: selectedEconomicsResultsId,
  };
  console.log(
    "Logged output --> ~ file: GetEconomicsPlotChartDataSaga.ts ~ line 101 ~ data",
    data
  );

  const message = "Loading economics data...";

  try {
    yield put(showSpinnerAction(message));

    const economicsResultsAPI = (url: string) =>
      authService.post(url, requestData, config);
    const result = yield call(economicsResultsAPI, url);

    const {
      data: {
        data: { economicsResults: chartData },
      },
    } = result;

    const successAction = getEconomicsPlotChartDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        reducer,
        workflowCategory,
        chartType,
        chartData,
      },
    });
  } catch (errors) {
    const failureAction = getEconomicsPlotChartDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    // yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}
