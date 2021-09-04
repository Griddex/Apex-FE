import { Dispatch } from "redux";
import { IAction } from "../../Application/Redux/Actions/ActionTypes";

export type TChartCategoryFxn = (
  categoryOptionTitle: string,
  dispatch: Dispatch<any>,
  updateAction: (path: string, value: any) => IAction
) => (name: string, title: string) => IAction;

export const persistChartCategoryFxn =
  (
    categoryOptionTitle: string,
    dispatch: Dispatch<any>,
    updateAction: (path: string, value: any) => IAction
  ) =>
  (name: string, title: string) =>
    dispatch(
      updateAction(categoryOptionTitle, {
        value: name,
        label: title,
      })
    );

export const removeChartCategoryFxn =
  (
    categoryOptionTitle: string,
    dispatch: Dispatch<any>,
    updateAction: (path: string, value: any) => IAction
  ) =>
  () => {
    dispatch(updateAction(categoryOptionTitle, null));
    dispatch(updateAction("plotChartsData", {}));
    dispatch(updateAction("plotChartsDataTrans", []));
  };
