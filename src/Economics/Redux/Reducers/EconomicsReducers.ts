import omitBy from "lodash.omitby";
import set from "lodash.set";
import { TAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  GET_TABLEDATABYID_FAILURE,
  GET_TABLEDATABYID_SUCCESS,
  UPDATE_SELECTEDIDTITLE,
} from "../../../Application/Redux/Actions/ApplicationActions";
import {
  IMPORTFILE_INITIALIZATION,
  PERSIST_CHOSENAPPLICATIONHEADERS,
  PERSIST_CHOSENAPPLICATIONHEADERSINDICES,
  PERSIST_CHOSENAPPLICATIONUNITINDICES,
  PERSIST_CHOSENAPPLICATIONUNITS,
  PERSIST_COLUMNNAMETABLEDATA,
  PERSIST_FILE,
  PERSIST_FILEHEADERS,
  PERSIST_FILEHEADERSMATCH,
  PERSIST_FILEUNITSANDUNIQUEUNITS,
  PERSIST_FILEUNITSMATCH,
  PERSIST_TABLEDATA,
  PERSIST_TABLEROLENAMES,
  PERSIST_VARIABLEUNITS,
  PERSIST_WORKSHEET,
  PERSIST_WORKSHEETNAMES,
  UPDATE_INPUT,
} from "../../../Import/Redux/Actions/InputActions";
import { TChartTypes } from "../../../Visualytics/Components/Charts/ChartTypes";
import {
  PUT_SELECTCHART,
  RESET_CHART_DATA,
} from "../../../Visualytics/Redux/Actions/VisualyticsActions";
import { TEconomicsAnalysesNames } from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import {
  ECONOMICSHEATMAP_UPDATE_DRAGITEMS,
  ECONOMICSHEATMAP_UPDATE_HASDROPPED,
  ECONOMICSPLOTCHARTS_UPDATE_DRAGITEMS,
  ECONOMICSPLOTCHARTS_UPDATE_HASDROPPED,
  ECONOMICS_REMOVE_CHARTCATEGORY,
  ECONOMICS_UPDATE_CHARTCATEGORY,
  FETCH_COSTSREVENUESHEADERS_FAILURE,
  FETCH_COSTSREVENUESHEADERS_SUCCESS,
  FETCH_ECONOMICSPARAMETERSHEADERS_FAILURE,
  FETCH_ECONOMICSPARAMETERSHEADERS_SUCCESS,
  GET_ECONOMICSPLOT_CHARTDATA_SUCCESS,
  GET_ECONOMICSSENSITIVITIESBYID_FAILURE,
  GET_ECONOMICSSENSITIVITIESBYID_SUCCESS,
  LOAD_ECONOMICS_WORKFLOW,
  RESET_ECONOMICS,
  RESET_HEATMAP_CHARTWORKFLOWS,
  RESET_PLOTCHARTS_CHARTWORKFLOWS,
  RESET_TEMPLATE_CHARTWORKFLOWS,
  RUN_ECONOMICSANALYSIS_FAILURE,
  RUN_ECONOMICSANALYSIS_SUCCESS,
  RUN_ECONOMICSFORECASTAGGREGATION_SUCCESS,
  STORED_ECONOMICSDATA_SUCCESS,
  STORED_ECONOMICSRESULTS_FAILURE,
  STORED_ECONOMICSRESULTS_SUCCESS,
  STORED_ECONOMICSSENSITIVITIES_FAILURE,
  STORED_ECONOMICSSENSITIVITIES_SUCCESS,
  TRANSFORM_ECONOMICSPLOT_CHARTDATA_SUCCESS,
  UPDATE_ECONOMICSPARAMETER,
  UPDATE_ECONOMICSPARAMETERS,
} from "../Actions/EconomicsActions";
import EconomicsState from "../State/EconomicsState";

const economicsReducer = (state = EconomicsState, action: IAction) => {
  switch (action.type) {
    case UPDATE_ECONOMICSPARAMETER: {
      const { path, value } = action.payload;

      const updatedState = set(state, path, value);
      return updatedState;
    }

    case UPDATE_ECONOMICSPARAMETERS: {
      const { updateObj } = action.payload;

      return {
        ...state,
        ...updateObj,
      };
    }

    case UPDATE_INPUT: {
      const { reducer, nameOrPath, value } = action.payload;

      if (reducer === "economicsReducer") {
        const updatedState = set(state, nameOrPath, value);
        return updatedState;
      } else {
        return state;
      }
    }

    case UPDATE_SELECTEDIDTITLE: {
      const { reducer, idTitleObj } = action.payload;

      if (reducer === "economicsReducer") {
        return {
          ...state,
          ...idTitleObj,
        };
      } else {
        return state;
      }
    }

    case LOAD_ECONOMICS_WORKFLOW: {
      return {
        ...state,
        [action.payload.name]: true,
      };
    }

    case IMPORTFILE_INITIALIZATION:
    case PERSIST_VARIABLEUNITS:
    case PERSIST_FILE:
    case PERSIST_WORKSHEETNAMES:
    case PERSIST_WORKSHEET:
    case PERSIST_FILEHEADERS:
    case PERSIST_CHOSENAPPLICATIONHEADERSINDICES:
    case PERSIST_CHOSENAPPLICATIONUNITS:
    case PERSIST_CHOSENAPPLICATIONUNITINDICES:
    case PERSIST_CHOSENAPPLICATIONHEADERS:
    case PERSIST_FILEHEADERSMATCH:
    case PERSIST_FILEUNITSANDUNIQUEUNITS:
    case PERSIST_FILEUNITSMATCH:
    case PERSIST_TABLEROLENAMES:
    case PERSIST_TABLEDATA:
    case PERSIST_COLUMNNAMETABLEDATA: {
      const { reducer, workflowProcess } = action.payload;
      const workflowProcessDefined = workflowProcess as TAllWorkflowProcesses;

      if (reducer === "economicsReducer") {
        return {
          ...state,
          inputDataWorkflows: {
            ...state.inputDataWorkflows,
            [workflowProcessDefined]: {
              ...state.inputDataWorkflows[workflowProcessDefined],
              ...action.payload,
            },
          },
        };
      } else {
        return state;
      }
    }

    case STORED_ECONOMICSRESULTS_SUCCESS: {
      const { economicsResultsStored } = action.payload;

      return {
        ...state,
        storedDataWorkflows: {
          ...state.storedDataWorkflows,
          economicsResultsStored,
        },
      };
    }

    //TODO Yikes move from here
    case STORED_ECONOMICSRESULTS_FAILURE: {
      const { errors } = action.payload;

      return {
        ...state,
        errors,
      };
    }

    case FETCH_COSTSREVENUESHEADERS_SUCCESS: {
      const {
        costsRevenuesAppHeaders,
        cstRevAppHeadersSelectOptions,
        cstRevAppHeadersNameMaps,
      } = action.payload;

      return {
        ...state,
        costsRevenuesAppHeaders,
        cstRevAppHeadersSelectOptions,
        cstRevAppHeadersNameMaps,
      };
    }

    case FETCH_COSTSREVENUESHEADERS_FAILURE: {
      const { errors } = action.payload;

      return {
        ...state,
        errors,
      };
    }

    case FETCH_ECONOMICSPARAMETERSHEADERS_SUCCESS: {
      const {
        economicsParametersAppHeaders,
        ecoParAppHeadersSelectOptions,
        ecoParAppHeadersNameMap,
      } = action.payload;

      return {
        ...state,
        economicsParametersAppHeaders,
        ecoParAppHeadersSelectOptions,
        ecoParAppHeadersNameMap,
      };
    }

    case FETCH_ECONOMICSPARAMETERSHEADERS_FAILURE: {
      const { errors } = action.payload;

      return {
        ...state,
        errors,
      };
    }

    case STORED_ECONOMICSDATA_SUCCESS: {
      const {
        economicsCostsRevenuesDeckStored,
        economicsParametersDeckStored,
      } = action.payload;

      return {
        ...state,
        storedDataWorkflows: {
          ...state.storedDataWorkflows,
          economicsCostsRevenuesDeckStored,
          economicsParametersDeckStored,
        },
      };
    }

    case STORED_ECONOMICSSENSITIVITIES_FAILURE:
    case STORED_ECONOMICSSENSITIVITIES_SUCCESS: {
      return {
        ...state,
        storedDataWorkflows: {
          ...state.storedDataWorkflows,
          ...action.payload,
        },
      };
    }

    case RUN_ECONOMICSANALYSIS_FAILURE:
    case RUN_ECONOMICSANALYSIS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_ECONOMICSSENSITIVITIESBYID_FAILURE:
    case GET_ECONOMICSSENSITIVITIESBYID_SUCCESS: {
      const { analysisName, sensitivitiesTableTitle, sensitivitiesTable } =
        action.payload;

      const analysisNameDefined = analysisName as TEconomicsAnalysesNames;
      return {
        ...state,
        economicsAnalysisWorkflows: {
          ...state.economicsAnalysisWorkflows,
          sensitivitiesTable,
          sensitivitiesTableTitle,
        },
      };
    }

    case GET_TABLEDATABYID_SUCCESS: {
      const { reducer, selectedTableData } = action.payload;

      if (reducer === "economicsReducer") {
        const updatedState = set(state, "selectedTableData", selectedTableData);
        return updatedState;
      } else {
        return state;
      }
    }

    case GET_TABLEDATABYID_FAILURE: {
      const { errors } = action.payload;
      return { ...state, errors };
    }

    case PUT_SELECTCHART: {
      const { reducer, chartOption, transformChartResultsPayload } =
        action.payload;

      if (reducer === "economicsReducer") {
        return {
          ...state,
          ...transformChartResultsPayload,
          selectedEconomicsPlotChartOption: chartOption,
        };
      } else {
        return state;
      }
    }

    case RUN_ECONOMICSFORECASTAGGREGATION_SUCCESS: {
      const { forecastEconomicsAggregated } = action.payload;
      return { ...state, forecastEconomicsAggregated };
    }

    case GET_ECONOMICSPLOT_CHARTDATA_SUCCESS: {
      const { chartData: plotChartsResults } = action.payload;

      return { ...state, plotChartsResults };
    }

    case TRANSFORM_ECONOMICSPLOT_CHARTDATA_SUCCESS: {
      const {
        reducer,
        workflowCategory,
        chartType,
        chartData,
        xValueCategories,
      } = action.payload;

      return {
        ...state,
        xValueCategories,
        [workflowCategory]: {
          ...(state as any)[workflowCategory],
          [chartType]: {
            ...(state as any)[workflowCategory][chartType as TChartTypes],
            chartData,
          },
        },
      };
    }

    case ECONOMICS_UPDATE_CHARTCATEGORY: {
      const { categoryOptionTitle, item } = action.payload;

      return {
        ...state,
        [categoryOptionTitle]: {
          ...(state as any)[categoryOptionTitle],
          [item.id]: item,
        },
      };
    }

    case ECONOMICS_REMOVE_CHARTCATEGORY: {
      const {
        categoryMembersObjTitle,
        categoryDragItemsTitle,
        categoryOptionTitle,
        id,
      } = action.payload;
      console.log(
        "🚀 ~ file: EconomicsReducers.ts ~ line 354 ~ economicsReducer ~ id",
        id
      );
      console.log(
        "🚀 ~ file: EconomicsReducers.ts ~ line 354 ~ economicsReducer ~ categoryOptionTitle",
        categoryOptionTitle
      );

      const categoryMembers = (state as any)[categoryMembersObjTitle][
        categoryOptionTitle
      ];
      console.log(
        "🚀 ~ file: EconomicsReducers.ts ~ line 369 ~ economicsReducer ~ categoryMembers",
        categoryMembers
      );
      const categoryDragItems = (state as any)[categoryDragItemsTitle][
        categoryOptionTitle
      ];
      console.log(
        "🚀 ~ file: EconomicsReducers.ts ~ line 373 ~ economicsReducer ~ categoryDragItems",
        categoryDragItems
      );

      const newCategoryMembers = omitBy(categoryMembers, (k, v) => k === id);
      console.log(
        "🚀 ~ file: EconomicsReducers.ts ~ line 378 ~ economicsReducer ~ newCategoryMembers",
        newCategoryMembers
      );
      const newCategoryDragItems = omitBy(
        categoryDragItems,
        (k, v) => k === id
      );
      console.log(
        "🚀 ~ file: EconomicsReducers.ts ~ line 383 ~ economicsReducer ~ newCategoryDragItems",
        newCategoryDragItems
      );

      return {
        ...state,
        [categoryMembersObjTitle]: newCategoryMembers,
        [categoryDragItemsTitle]: newCategoryDragItems,
      };
    }

    case ECONOMICSHEATMAP_UPDATE_DRAGITEMS: {
      const { reducer, categoryTitle, categoryDragItemsTitle, item } =
        action.payload;
      console.log(
        "Logged output --> ~ file: EconomicsReducers.ts ~ line 324 ~ economicsReducer ~ categoryTitle",
        categoryTitle
      );

      return {
        ...state,
        [categoryDragItemsTitle]: {
          ...state["heatMapCategoryDragItems"],
          [categoryTitle]: {
            ...state["heatMapCategoryDragItems"][categoryTitle],
            [item.id]: item,
          },
        },
      };
    }

    case ECONOMICSHEATMAP_UPDATE_HASDROPPED: {
      const {
        reducer,
        categoryTitle,
        categoryHasDroppedTitle,
        id,
        hasDropped,
      } = action.payload;
      console.log(
        "Logged output --> ~ file: EconomicsReducers.ts ~ line 339 ~ economicsReducer ~ categoryTitle",
        categoryTitle
      );

      return {
        ...state,
        [categoryHasDroppedTitle]: {
          ...state["heatMapCategoryHasDropped"],
          [categoryTitle]: {
            ...state["heatMapCategoryHasDropped"][categoryTitle],
            [id]: hasDropped,
          },
        },
      };
    }

    case ECONOMICSPLOTCHARTS_UPDATE_DRAGITEMS: {
      const { reducer, categoryTitle, categoryDragItemsTitle, item } =
        action.payload;
      console.log(
        "Logged output --> ~ file: EconomicsReducers.ts ~ line 324 ~ economicsReducer ~ categoryTitle",
        categoryTitle
      );

      return {
        ...state,
        [categoryDragItemsTitle]: {
          ...state["plotChartsCategoryDragItems"],
          [categoryTitle]: {
            ...state["plotChartsCategoryDragItems"][categoryTitle],
            [item.id]: item,
          },
        },
      };
    }

    case ECONOMICSPLOTCHARTS_UPDATE_HASDROPPED: {
      const {
        reducer,
        categoryTitle,
        categoryHasDroppedTitle,
        id,
        hasDropped,
      } = action.payload;
      console.log(
        "Logged output --> ~ file: EconomicsReducers.ts ~ line 339 ~ economicsReducer ~ categoryTitle",
        categoryTitle
      );

      return {
        ...state,
        [categoryHasDroppedTitle]: {
          ...state["plotChartsCategoryHasDropped"],
          [categoryTitle]: {
            ...state["plotChartsCategoryHasDropped"][categoryTitle],
            [id]: hasDropped,
          },
        },
      };
    }

    case RESET_CHART_DATA: {
      const { reducer, workflowCategory } = action.payload;

      if (reducer === "economicsReducer") {
        return {
          ...state,
          [workflowCategory]: {
            ...(state as any)[workflowCategory],
            stackedAreaChart: { chartData: [] },
            lineChart: { chartData: [] },
            scatterChart: { chartData: [] },
            doughnutChart: { chartData: [] },
            radarChart: { chartData: [] },
            heatMapChart: { chartData: [] },
          },
        };
      } else {
        return state;
      }
    }

    case RESET_PLOTCHARTS_CHARTWORKFLOWS: {
      const {
        economicsChartsWorkflows,
        selectedEconomicsPlotChartOption,
        showPlotChartsCategories,
        plotChartsVariableXOptions,
        plotChartsVariableYOptions,
        plotChartsSecondaryVariableYOptions,
        plotChartsVariableZOptions,
        plotChartsVariableROptions,
        showPlotChartsCategoryMembersObj,
        plotChartsCategoryDragItems,
        plotChartsCategoryHasDropped,
      } = EconomicsState;

      return {
        ...state,
        economicsChartsWorkflows,
        selectedEconomicsPlotChartOption,
        showPlotChartsCategories,
        plotChartsVariableXOptions,
        plotChartsVariableYOptions,
        plotChartsSecondaryVariableYOptions,
        plotChartsVariableZOptions,
        plotChartsVariableROptions,
        showPlotChartsCategoryMembersObj,
        plotChartsCategoryDragItems,
        plotChartsCategoryHasDropped,
      };
    }

    case RESET_HEATMAP_CHARTWORKFLOWS: {
      const {
        sensitivitiesHeatMapData,
        sensitivitiesHeatMap1or2D,
        heatMapStylingData,
        economicsChartsWorkflows,
        heatMapVariableXOptions,
        heatMapVariableYOptions,
        heatMapVariableZOptions,
        showPlotChartsCategoryMembersObj,
        plotChartsCategoryDragItems,
        plotChartsCategoryHasDropped,
      } = EconomicsState;

      return {
        ...state,
        sensitivitiesHeatMapData,
        sensitivitiesHeatMap1or2D,
        heatMapStylingData,
        economicsChartsWorkflows,
        heatMapVariableXOptions,
        heatMapVariableYOptions,
        heatMapVariableZOptions,
        showPlotChartsCategoryMembersObj,
        plotChartsCategoryDragItems,
        plotChartsCategoryHasDropped,
      };
    }

    case RESET_TEMPLATE_CHARTWORKFLOWS: {
      const { economicsChartsWorkflows } = EconomicsState;

      return {
        ...state,
        economicsChartsWorkflows,
      };
    }

    case RESET_ECONOMICS: {
      return EconomicsState;
    }

    default:
      return state;
  }
};

export default economicsReducer;
