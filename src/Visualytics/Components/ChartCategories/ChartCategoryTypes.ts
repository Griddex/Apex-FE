import { IAction } from "../../../Application/Redux/Actions/ActionTypes";

export interface IDragItem {
  id: string;
  name: string;
  title: string;
}
export interface IChartCategory {
  categoryTitle: string;
  persistAction: (name: string, title: string) => void;
  removeAction: () => void;
  disable: boolean;
}

export type TCategoriesTitle = string;
export interface IChartCategories {
  xCategoryOptionTitle?: string;
  yCategoryOptionTitle?: string;
  zCategoryOptionTitle?: string;
  categoryTitle?: string;
  categoryOptionTitle?: string;
  disable?: boolean;
  disableX?: boolean;
  disableY?: boolean;
  disableZ?: boolean;
  updateAction: (name: string, item: any) => IAction;
  removeAction: (title: string, id: any) => IAction;
  showCategoryMembersSwitch?: boolean;
  showXCategoryMembersSwitch?: boolean;
  showYCategoryMembersSwitch?: boolean;
  showZCategoryMembersSwitch?: boolean;
  showCategoryMembers?: boolean;
  showCategoryMembersObj?: Record<string, boolean>;
  path?: string;
  updateParameterAction?: (path: string, value: any) => IAction;
}
