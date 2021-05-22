export interface IChartCategory {
  categoryTitle: string;
  persistAction: (name: string, title: string) => void;
  removeAction: () => void;
}

export type TCategoriesTitle = string;
export interface IChartCategoriesData {
  ChartCategoriesData: IChartCategory[];
  categoriesTitle: TCategoriesTitle;
  showCategories: boolean;
}
