import { IIdNameTitlePathOption } from "../../../Application/Components/Selects/SelectItemsType";
import { TReducer } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { TChartStory, TChartTypes } from "../Charts/ChartTypes";

export interface IDragItem {
  id: string;
  name: string;
  title: string;
  path?: string;
}
export interface IChartCategory {
  categoryTitle: string;
  persistAction: (name: string, title: string) => void;
  removeAction: () => void;
  disable: boolean;
}

export type TCategoriesTitle = string;
export interface IChartCategories {
  reducer?: TReducer;
  chartStory?: TChartStory;
  chartType?: TChartTypes;
  xCategoryOptionTitle?: string;
  yCategoryOptionTitle?: string;
  ySecondaryCategoryOptionTitle?: string;
  zCategoryOptionTitle?: string;
  rCategoryOptionTitle?: string;
  categoryTitle?: string;
  categoryOptionTitle?: string;
  devScenariosTitle?: string;
  disable?: boolean;
  disableX?: boolean;
  disableY?: boolean;
  disableSecondaryY?: boolean;
  disableZ?: boolean;
  disableR?: boolean;
  updateAction: (name: string, item: any) => IAction;
  removeAction: (
    chartStory: TChartStory,
    chartType: TChartTypes,
    categoryTitle: string,
    categoryOptionTitle: string,
    id: any
  ) => IAction;
  showCategoryMembersSwitch?: boolean;
  showXCategoryMembersSwitch?: boolean;
  showYCategoryMembersSwitch?: boolean;
  showYSecondaryCategoryMembersSwitch?: boolean;
  showZCategoryMembersSwitch?: boolean;
  showRCategoryMembersSwitch?: boolean;
  showCategoryMembers?: boolean;
  showCategoryMembersObj?: Record<string, boolean>;
  path?: string;
  updateParameterAction?: (path: string, value: any) => IAction;
  updateDragItemsAction?: (
    reducer: TReducer,
    categoryTitle: string,
    categoryDragItemsTitle: string,
    item: IIdNameTitlePathOption
  ) => IAction;
  updateHasDroppedAction?: (
    reducer: TReducer,
    categoryTitle: string,
    categoryHasDroppedTitle: string,
    id: string,
    hasDropped: boolean
  ) => IAction;
  categoryDragItemsTitle?: string;
  categoryDragItems?: Record<string, Record<string, IDragItem>>;
  categoryHasDroppedTitle?: string;
  categoryHasDropped?: Record<string, Record<string, true>>;
  categoryDragItem?: Record<string, IDragItem>;
  categoryDropped?: Record<string, true>;
  categoryPanelWidth?: number;
  categoryPanelComponent?: JSX.Element;
  resultsTitle?: string;
  showCategoryZMembers?: boolean;
}
