import {
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core";
import OpenInNewOutlinedIcon from "@material-ui/icons/OpenInNewOutlined";
import React, { CSSProperties } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import { getApexIconButtonStyle } from "../../../Application/Styles/IconButtonStyles";
import {
  itemTypesEconomics,
  itemTypesForecast,
  itemTypesVisualytics,
} from "../../Utils/DragAndDropItemTypes";
import { IChartCategories, IDragItem } from "./ChartCategoryTypes";
import ChartCategoryVariable from "./ChartCategoryVariable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chartProps: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      height: "100%",
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      width: "100%",
      paddingTop: 5,
    },
  })
);

const CartesianChartCategory = ({
  categoryTitle,
  categoryOptionTitle,
  updateAction,
  removeAction,
  disable,
  showCategoryMembersSwitch,
  showCategoryMembersObj,
  path,
  updateParameterAction,
}: IChartCategories) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [membersSwitch, setMembersSwitch] = React.useState(
    showCategoryMembersObj && showCategoryMembersObj[categoryTitle as string]
  );
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
      accept: allItemTypes,
      drop(item) {
        const { id } = item as IDragItem;

        dispatch(updateAction(categoryOptionTitle as string, item));
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

  const style = {
    ...dropTargetStyle,
    ...disableStyle,
    width: "100%",
  } as CSSProperties;

  return (
    <div className={classes.chartProps} style={style}>
      {showCategoryMembersSwitch && (
        <ApexMuiSwitch
          name="showCategoryMembersSwitch"
          handleChange={(event: React.ChangeEvent<any>) => {
            const { checked } = event.target;

            setMembersSwitch(checked);

            (showCategoryMembersObj as Record<string, boolean>)[
              categoryTitle as string
            ] = checked;

            dispatch(
              updateParameterAction &&
                updateParameterAction(path as string, showCategoryMembersObj)
            );
          }}
          checked={membersSwitch as boolean}
          checkedColor={theme.palette.success.main}
          notCheckedColor={theme.palette.common.white}
          hasLabels={true}
          leftLabel="Disable"
          rightLabel="Enable"
        />
      )}
      <AnalyticsComp
        title={categoryTitle as string}
        direction="Vertical"
        containerStyle={{ width: "100%", height: 100 }}
        content={
          <ApexFlexContainer
            ref={drop}
            flexDirection="column"
            justifyContent="flex-start"
          >
            {Object.keys(hasDroppedObj).length > 0
              ? Object.keys(hasDroppedObj).map((id: string, i: number) => (
                  <ChartCategoryVariable
                    key={i}
                    dragItem={dragItemObj[id]}
                    setHasDroppedObj={setHasDroppedObj}
                    categoryOptionTitle={categoryOptionTitle as string}
                    removeChartCategoryAction={removeAction}
                  />
                ))
              : "Drop here"}
          </ApexFlexContainer>
        }
        contentStyle={{
          height: "100%",
          width: "100%",
          border: `1px solid ${theme.palette.grey[300]}`,
        }}
      />
    </div>
  );
};

export default CartesianChartCategory;
