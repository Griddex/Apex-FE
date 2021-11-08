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
  updateEconomicsParameterAction,
} from "../Actions/EconomicsActions";
import uniq from "lodash.uniq";
import uniqBy from "lodash.uniqby";

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

  const { variableUnits } = yield select((state) => state.unitSettingsReducer);

  const chartType = selectedEconomicsPlotChartOption.value;

  const config = {};
  const url = `${getBaseEconomicsUrl()}/analysis-chart/plotCharts`;

  const plotChartDragItems = Object.values(
    plotChartsCategoryDragItems as Record<string, Record<string, IDragItem>>
  );

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

    const yUnitNamesTitles = uniqBy(
      Object.values(plotChartsCategoryDragItems["Y Category"]).map(
        (u: any) => ({
          name: u.name.split("_")[0],
          title: u.title.split("_")[0],
        })
      ),
      (o) => o.name
    );

    const yUnitNames = yUnitNamesTitles.map((u) => u.name);

    const varYObjArrayByNames = variableUnits.filter((v: any) =>
      yUnitNames.includes(v.variableName)
    );

    const selectedVarYObjArray = varYObjArrayByNames.map((obj: any) => {
      const unitsObj = obj["units"].find(
        (o: any) => o.unitId === obj.displayUnitId
      );

      return unitsObj;
    });

    const selectedVarTitleUnitTitleArray = selectedVarYObjArray.map(
      (u: any, i: number) => {
        const selectedVarTitle = yUnitNamesTitles[i].title;

        return `${selectedVarTitle} [${u.title}]`;
      }
    );

    const selectedVarTitleUnitTitleString =
      selectedVarTitleUnitTitleArray.join(",");

    if (Object.keys(selectedVarYObjArray).length > 0) {
      yield put(
        updateEconomicsParameterAction(
          "economicsChartsWorkflows.commonChartProps.axisLeft.legend",
          selectedVarTitleUnitTitleString
        )
      );
    }

    const xUnitNamesTitles = uniqBy(
      Object.values(plotChartsCategoryDragItems["X Category"]).map(
        (u: any) => ({
          name: u.name.split("_")[0],
          title: u.title.split("_")[0],
        })
      ),
      (o) => o.name
    );

    yield put(
      updateEconomicsParameterAction(
        "economicsChartsWorkflows.commonChartProps.axisBottom.legend",
        "Year"
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
