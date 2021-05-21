import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core";
import React from "react";
import { useDrop } from "react-dnd";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexFlexStyle from "../../../Application/Components/Styles/ApexFlexStyle";
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

  const [{ isOver, isOverCurrent, canDrop }, drop] = useDrop(
    () => ({
      accept: hasDropped ? "" : allItemTypes,
      drop(item, monitor) {
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

  return (
    <div ref={drop} className={classes.chartProps} style={dropTargetStyle}>
      <AnalyticsComp
        title={categoryTitle}
        direction="Vertical"
        containerStyle={{ width: "100%" }}
        content={
          hasDropped ? (
            <ChartCategoryVariable
              dragItem={dragItem}
              setHasDropped={setHasDropped}
              removeAction={removeAction}
            />
          ) : (
            <ApexFlexStyle>{"Drop here"}</ApexFlexStyle>
          )
        }
      />
    </div>
  );
};

export default ChartCategory;
