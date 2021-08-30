import { TUseState } from "../../../Application/Types/ApplicationTypes";

export interface IChartCategory {
  categoryTitle: string;
  persistAction: (name: string, title: string) => void;
  removeAction: () => void;
  disable: boolean;
}

export type TCategoriesTitle = string;
export interface IChartCategoriesData {
  chartCategoriesData: IChartCategory[];
  categoriesTitle?: TCategoriesTitle;
  showCategories?: boolean;
  setShowCategories?: TUseState<boolean>;
}
