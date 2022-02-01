import { ActionType } from "@redux-saga/types";
import uniqBy from "lodash.uniqby";
import zipObject from "lodash.zipobject";
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
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import { IDragItem } from "../../../Visualytics/Components/ChartCategories/ChartCategoryTypes";
import {
  getEconomicsPlotChartDataFailureAction,
  getEconomicsPlotChartDataSuccessAction,
  GET_ECONOMICSPLOT_CHARTDATA_REQUEST,
  updateEconomicsParameterAction,
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
  } = yield select((state: RootState) => state.economicsReducer);

  const chartType = selectedEconomicsPlotChartOption.value;

  const config = {};
  const url = `${getBaseEconomicsUrl()}/analysis-chart/plotCharts`;

  const plotChartsCategoryDragItemsDefined =
    plotChartsCategoryDragItems as Record<string, Record<string, IDragItem>>;

  const plotChartDragItems = Object.values(plotChartsCategoryDragItemsDefined);

  const data = plotChartDragItems.reduce((acc, categoryObj) => {
    const dragItems = Object.values(categoryObj);

    const newDragItems = dragItems.reduce((acc, item) => {
      const { id, name, path } = item;
      const sensitivitiesJoined = path?.split("@#$%")[3];

      const sensitivitiesArr = sensitivitiesJoined?.split("-");

      return {
        ...acc,
        [id]: {
          ...zipObject(["x", "y", "z"], sensitivitiesArr as string[]),
          name: name.split("_")[0],
        },
      };
    }, {});

    return { ...acc, ...newDragItems };
  }, {});

  const idSensitivitiesMap = plotChartDragItems.reduce((acc, categoryObj) => {
    const dragItems = Object.values(categoryObj);

    const idSensitivities = dragItems.reduce((acc, item) => {
      const { id, path } = item;
      const sensitivitiesJoined = path?.split("@#$%")[3];

      return {
        ...acc,
        [id]: sensitivitiesJoined,
      };
    }, {});

    return { ...acc, ...idSensitivities };
  }, {});

  const requestData = {
    data,
    developmentScenario: "OIL/AG",
    isSaved: isEconomicsResultsSaved,
    analysisResultId: selectedEconomicsResultsId,
  };

  const message = "Loading economics data...";

  try {
    yield put(showSpinnerAction(message));

    const economicsResultsAPI = (url: string) =>
      authService.post(url, requestData, config);

    const result = yield call(economicsResultsAPI, url);

    const {
      data: { data },
    } = result;

    const economicsResults = Object.keys(data).map((id) => {
      const variableObj = data[id];
      const sensitivityJoined = idSensitivitiesMap[id];

      return {
        ...variableObj,
        name: `${variableObj.name}_${sensitivityJoined}`,
        title: `${variableObj.title}_${sensitivityJoined}`,
      };
    });

    //TODO test these out

    let yAxisLegend = "";
    let ySecondaryAxisLegend = "";
    const yCategoryMoreThanOne =
      Object.values(plotChartsCategoryDragItemsDefined["Y Category"]).length >
      1;
    const ySecondaryCategoryMoreThanOne =
      Object.values(plotChartsCategoryDragItemsDefined["Y Secondary Category"])
        .length > 1;

    if (yCategoryMoreThanOne) {
      yAxisLegend = "Multiple Series";
    } else {
      const yCategoryObjs = Object.values(
        plotChartsCategoryDragItemsDefined["Y Category"]
      );
      yAxisLegend = yCategoryObjs[0].title.split("_")[0];
    }

    if (ySecondaryCategoryMoreThanOne) {
      ySecondaryAxisLegend = "Multiple Series";
    } else {
      const yCategoryObjs = Object.values(
        plotChartsCategoryDragItemsDefined["Y Secondary Category"]
      );
      ySecondaryAxisLegend = yCategoryObjs[0].title.split("_")[0];
    }

    const xAxisLegend = Object.values(
      plotChartsCategoryDragItemsDefined["X Category"]
    )[0].title.split("_")[0];

    yield put(
      updateEconomicsParameterAction(
        "economicsChartsWorkflows.primary.commonChartProps.axisLeft.legend",
        yAxisLegend
      )
    );
    yield put(
      updateEconomicsParameterAction(
        "economicsChartsWorkflows.secondary.commonChartProps.axisRight.legend",
        ySecondaryAxisLegend
      )
    );
    yield put(
      updateEconomicsParameterAction(
        "economicsChartsWorkflows.primary.commonChartProps.axisBottom.legend",
        xAxisLegend
      )
    );

    const chartData = economicsResults;
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
