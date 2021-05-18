import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core";
import React from "react";
import { useDrop } from "react-dnd";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import CenteredStyle from "../../../Application/Components/Styles/CenteredStyle";
import {
  itemTypesForecast,
  itemTypesEconomics,
  itemTypesVisualytics,
} from "../../Utils/DragAndDropItemTypes";
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

export interface IChartCategory {
  title: string;
}

export interface IDragItem {
  id: string;
  name: string;
  title: string;
}

const ChartCategory = ({ title }: IChartCategory) => {
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
      accept: allItemTypes,
      drop(item, monitor) {
        const { id, name, title } = item as IDragItem;
        setHasDropped(true);
        setDragItem({ id, name, title });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );

  // React.useEffect(() => {
  //   if (hasDropped) alert("It has dropped!!!!!!!!!");
  // }, [setHasDropped]);

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
        title={title}
        direction="Vertical"
        containerStyle={{ width: "100%" }}
        content={
          hasDropped ? (
            <ChartCategoryVariable
              dragItem={dragItem}
              setHasDropped={setHasDropped}
            />
          ) : (
            <CenteredStyle>{"Drop here"}</CenteredStyle>
          )
        }
      />
    </div>
  );
};

export default ChartCategory;
