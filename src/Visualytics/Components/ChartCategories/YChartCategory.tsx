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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chartProps: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      height: 35,
      border: `1px solid ${theme.palette.grey[300]}`,
      width: "100%",
      paddingTop: 5,
    },
  })
);

const YChartCategory = ({
  yCategoryOptionTitle,
  updateAction,
  removeAction,
  disable,
}: IChartCategories) => {
  const classes = useStyles();
  const theme = useTheme();

  // const [id, setId] = React.useState("");
  const [hasDroppedObj, setHasDroppedObj] = React.useState<
    Record<string, boolean>
  >({});
  const [dragItemObj, setDragItemObj] = React.useState(
    {} as Record<string, IDragItem>
  );

  const allItemTypes = [
    ...Object.values(itemTypesForecast),
    ...Object.values(itemTypesEconomics),
    ...Object.values(itemTypesVisualytics),
  ];

  const [{ isOverCurrent, canDrop }, drop] = useDrop(
    () => ({
      accept: Object.keys(hasDroppedObj).length > 0 ? allItemTypes : "",
      drop(item) {
        const { id } = item as IDragItem;

        // setId(id);
        updateAction(yCategoryOptionTitle as string, item);
        setDragItemObj((prev) => ({ ...prev, [id]: item as IDragItem }));
        setHasDroppedObj((prev) => ({ ...prev, [id]: true }));
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
      <IconButton onClick={() => {}} edge="end">
        <OpenInNewOutlinedIcon />
      </IconButton>
      <AnalyticsComp
        title="Y Category"
        direction="Vertical"
        containerStyle={{ width: "100%", height: "100%" }}
        content={
          <ApexFlexContainer>
            {Object.keys(hasDroppedObj).length > 0
              ? Object.keys(hasDroppedObj).map((id: string, i: number) => (
                  <ChartCategoryVariable
                    key={i}
                    dragItem={dragItemObj[id]}
                    setHasDroppedObj={setHasDroppedObj}
                    categoryOptionTitle={yCategoryOptionTitle as string}
                    removeChartCategoryAction={removeAction}
                  />
                ))
              : "Drop here"}
          </ApexFlexContainer>
        }
        contentStyle={{ height: "100%" }}
      />
    </div>
  );
};

export default React.memo(YChartCategory);
