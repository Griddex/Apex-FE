import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core";
import React, { CSSProperties } from "react";
import { useDrop } from "react-dnd";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import {
  itemTypesForecast,
  itemTypesEconomics,
  itemTypesVisualytics,
} from "../../Utils/DragAndDropItemTypes";
import { IChartCategory } from "./ChartCategoryTypes";
import ChartCategoryVariable from "./ChartCategoryVariable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chartProps: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      height: 150,
      border: `1px solid ${theme.palette.grey[300]}`,
      width: "100%",
      paddingTop: 5,
    },
  })
);

export interface IDragItem {
  id: string;
  name: string;
  title: string;
}

const ChartCategory = ({
  categoryTitle,
  persistAction,
  removeAction,
  disable,
}: IChartCategory) => {
  const classes = useStyles();
  const theme = useTheme();

  const [hasDropped, setHasDropped] = React.useState(false);
  const [dragItem, setDragItem] = React.useState({} as IDragItem);

  const allItemTypes = [
    ...Object.values(itemTypesForecast),
    ...Object.values(itemTypesEconomics),
    ...Object.values(itemTypesVisualytics),
  ];

  const [{ isOverCurrent, canDrop }, drop] = useDrop(
    () => ({
      accept: hasDropped ? "" : allItemTypes,
      drop(item) {
        const { id, name, title } = item as IDragItem;

        persistAction(name, title);
        setDragItem(item as IDragItem);
        setHasDropped(true);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );

  const isActive = canDrop && isOverCurrent;
  let dropTargetStyle = {};
  if (isActive) {
    dropTargetStyle = {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.primary.light,
    };
  } else if (canDrop) {
    dropTargetStyle = {
      border: `1px solid ${theme.palette.primary.main}`,
    };
  }

  const disableStyle = disable
    ? {
        pointerEvents: "none",
        color: theme.palette.grey[200],
        backgroundColor: theme.palette.grey[400],
      }
    : {};

  const style = { ...dropTargetStyle, ...disableStyle } as CSSProperties;

  return (
    <div ref={drop} className={classes.chartProps} style={style}>
      <AnalyticsComp
        title={categoryTitle}
        direction="Vertical"
        containerStyle={{ width: "100%", height: "100%" }}
        content={
          hasDropped ? (
            <ChartCategoryVariable
              dragItem={dragItem}
              setHasDropped={setHasDropped}
              removeAction={removeAction}
            />
          ) : (
            <ApexFlexContainer>{"Drop here"}</ApexFlexContainer>
          )
        }
        contentStyle={{ height: "100%" }}
      />
    </div>
  );
};

export default React.memo(ChartCategory);
