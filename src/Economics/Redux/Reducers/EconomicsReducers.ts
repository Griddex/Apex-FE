import omit from "lodash.omit";
import set from "lodash.set";
import { TAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  GET_TABLEDATABYID_FAILURE,
  GET_TABLEDATABYID_SUCCESS,
  RESET_INPUTDATA_WORKFLOW,
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
import {
  PUT_SELECTCHART,
  RESET_CHART_DATA,
} from "../../../Visualytics/Redux/Actions/VisualyticsActions";
import updateChartData from "../../Utils/UpdateChartData";
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
  PERSIST_COSTSREVENUESDECKS,
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

    case PERSIST_TABLEDATA: {
      const { reducer, tableData, workflowProcess, currentDevValue } =
        action.payload;
      const workflowProcessDefined = workflowProcess as TAllWorkflowProcesses;

      if (reducer === "economicsReducer") {
        if (workflowProcessDefined.startsWith("economicsCostsRevenues"))
          return {
            ...state,
            inputDataWorkflows: {
              ...state.inputDataWorkflows,
              [workflowProcessDefined]: {
                ...state.inputDataWorkflows[workflowProcessDefined],
                costsRevenues: {
                  ...state.inputDataWorkflows[workflowProcessDefined][
                    "costsRevenues"
                  ],
                  [currentDevValue]: tableData,
                },
              },
            },
          };
        else if (workflowProcessDefined.startsWith("economicsParameters")) {
          return {
            ...state,
            inputDataWorkflows: {
              ...state.inputDataWorkflows,
              [workflowProcessDefined]: {
                ...state.inputDataWorkflows[workflowProcessDefined],
                tableData,
              },
            },
          };
        } else return state;
      } else {
        return state;
      }
    }

    case PERSIST_COSTSREVENUESDECKS: {
      const { devVal, devRows } = action.payload;

      return {
        ...state,
        allDevRows: { ...state.allDevRows, [devVal]: devRows },
      };
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
      const { sensitivitiesTableTitle, sensitivitiesTable } = action.payload;

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

      return {
        ...state,
        inputDataWorkflows: {
          ...state.inputDataWorkflows,
          economicsCostsRevenuesDeckApexForecast: {
            ...state.inputDataWorkflows.economicsCostsRevenuesDeckApexForecast,
            costsRevenues: forecastEconomicsAggregated,
          },
        },
      };
    }

    case GET_ECONOMICSPLOT_CHARTDATA_SUCCESS: {
      const { chartData: plotChartsResults } = action.payload;

      return { ...state, plotChartsResults };
    }

    case TRANSFORM_ECONOMICSPLOT_CHARTDATA_SUCCESS: {
      const {
        workflowCategory,
        chartType,
        chartStory,
        chartData,
        xValueCategories,
      } = action.payload;
      console.log(
        "🚀 ~ file: EconomicsReducers.ts ~ line 378 ~ economicsReducer ~ action.payload",
        action.payload
      );

      const wCObj = (state as any)[workflowCategory];
      const chtStryObj = (state as any)[workflowCategory][chartStory];
      const chtDataObj = (state as any)[workflowCategory][chartStory][
        chartType
      ];

      return {
        ...state,
        xValueCategories,
        [workflowCategory]: {
          ...wCObj,
          [chartStory]: {
            ...chtStryObj,
            [chartType]: { ...chtDataObj, chartData },
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
        variableName,
        chartType,
        chartStory,
        categoryTitle,
        categoryOptionTitle,
        id,
      } = action.payload;
      console.log(
        "🚀 ~ file: EconomicsReducers.ts ~ line 416 ~ economicsReducer ~ action.payload",
        action.payload
      );
      let dragItemsTitle = "heatMapCategoryDragItems" as
        | "heatMapCategoryDragItems"
        | "plotChartsCategoryDragItems";
      let hasDroppedTitle = "heatMapCategoryHasDropped" as
        | "heatMapCategoryHasDropped"
        | "plotChartsCategoryHasDropped";

      if (categoryOptionTitle.toLowerCase().includes("plotcharts")) {
        dragItemsTitle = "plotChartsCategoryDragItems";
        hasDroppedTitle = "plotChartsCategoryHasDropped";
      }

      const categoryObj = state[dragItemsTitle][categoryTitle];
      console.log(
        "🚀 ~ file: EconomicsReducers.ts ~ line 430 ~ economicsReducer ~ state",
        state
      );
      console.log(
        "🚀 ~ file: EconomicsReducers.ts ~ line 429 ~ economicsReducer ~ categoryObj",
        categoryObj
      );
      const newCategoryObj = omit(categoryObj, [id]);
      console.log(
        "🚀 ~ file: EconomicsReducers.ts ~ line 431 ~ economicsReducer ~ newCategoryObj",
        newCategoryObj
      );

      const hasDroppedObj = state[hasDroppedTitle][categoryTitle];
      console.log(
        "🚀 ~ file: EconomicsReducers.ts ~ line 434 ~ economicsReducer ~ hasDroppedObj",
        hasDroppedObj
      );
      const newHasDroppedObj = omit(hasDroppedObj, [id]);
      console.log(
        "🚀 ~ file: EconomicsReducers.ts ~ line 436 ~ economicsReducer ~ newHasDroppedObj",
        newHasDroppedObj
      );

      const variableOptionsObj = (state as any)[categoryOptionTitle];
      console.log(
        "🚀 ~ file: EconomicsReducers.ts ~ line 459 ~ economicsReducer ~ variableOptionsObj",
        variableOptionsObj
      );
      const newVariableOptionsObj = omit(variableOptionsObj, [id]);
      console.log(
        "🚀 ~ file: EconomicsReducers.ts ~ line 461 ~ economicsReducer ~ newVariableOptionsObj",
        newVariableOptionsObj
      );

      const chartStoryObj = (state["economicsChartsWorkflows"] as any)[
        chartStory
      ];
      const chartData = chartStoryObj[chartType]["chartData"];
      const newChartData = updateChartData(variableName, chartType, chartData);

      return {
        ...state,
        [dragItemsTitle]: {
          ...state[dragItemsTitle],
          [categoryTitle]: newCategoryObj,
        },
        [hasDroppedTitle]: {
          ...state[hasDroppedTitle],
          [categoryTitle]: newHasDroppedObj,
        },
        [categoryOptionTitle]: newVariableOptionsObj,
        economicsChartsWorkflows: {
          ...state["economicsChartsWorkflows"],
          [chartStory]: {
            ...chartStoryObj,
            [chartType]: {
              ...chartStoryObj[chartType],
              chartData: newChartData,
            },
          },
        },
      };
    }

    case ECONOMICSHEATMAP_UPDATE_DRAGITEMS: {
      const { categoryTitle, categoryDragItemsTitle, item } = action.payload;

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
      const { categoryTitle, categoryHasDroppedTitle, id, hasDropped } =
        action.payload;

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
      const { categoryTitle, categoryDragItemsTitle, item } = action.payload;

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
      const { categoryTitle, categoryHasDroppedTitle, id, hasDropped } =
        action.payload;

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

      const initialWCObj = EconomicsState["economicsChartsWorkflows"];

      if (reducer === "economicsReducer") {
        return {
          ...state,
          [workflowCategory]: initialWCObj,
        };
      } else {
        return state;
      }
    }

    case RESET_PLOTCHARTS_CHARTWORKFLOWS: {
      const {
        economicsChartsWorkflows,
        selectedEconomicsPlotChartOption,
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
        sensitivitiesHeatMapThresholdData,
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
        sensitivitiesHeatMapThresholdData,
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

    case RESET_INPUTDATA_WORKFLOW: {
      const { reducer } = action.payload;
      const { inputDataWorkflows } = EconomicsState;

      if (reducer !== "economicsReducer") return state;

      return {
        ...state,
        inputDataWorkflows,
      };
    }

    //     case UPDATE_BY_PARAMETERSTABLE: {
    //       const {rowIndex, variableName,parametersTable } = action.payload;
    // const path = `inputDataWorkflows.economicsParametersDeckManual.tableData.${}`

    //       const updatedState = set(state, path, value);

    //       return updatedState;
    //     }

    case RESET_ECONOMICS: {
      return EconomicsState;
    }

    default:
      return state;
  }
};

export default economicsReducer;
