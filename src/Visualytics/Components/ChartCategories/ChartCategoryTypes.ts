export interface IChartCategory {
  categoryTitle: string;
  persistAction: (name: string, title: string) => void;
  removeAction: () => void;
}
export type IChartCategoriesData = IChartCategory[];
