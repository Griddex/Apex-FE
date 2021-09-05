import {
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core";
import React, { CSSProperties } from "react";
import { useDrop } from "react-dnd";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import {
  itemTypesEconomics,
  itemTypesForecast,
  itemTypesVisualytics,
} from "../../Utils/DragAndDropItemTypes";
import {
  IChartCategory,
  IChartCategories,
  IDragItem,
} from "./ChartCategoryTypes";
import ChartCategoryVariable from "./ChartCategoryVariable";
import OpenInNewOutlinedIcon from "@material-ui/icons/OpenInNewOutlined";
import CartesianChartCategory from "./CartesianChartCategory";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chartProps: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      height: 400,
      border: `1px solid ${theme.palette.grey[300]}`,
      width: "100%",
      paddingTop: 5,
    },
  })
);

const XChartCategory = ({
  categoryOptionTitle,
  updateAction,
  removeAction,
  disable,
}: IChartCategories) => {
  return (
    <CartesianChartCategory
      categoryTitle={" X Category"}
      categoryOptionTitle={categoryOptionTitle}
      updateAction={updateAction}
      removeAction={removeAction}
      disable={disable}
    />
  );
};
export default React.memo(XChartCategory);
