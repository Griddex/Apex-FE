import { Theme, useTheme } from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import React, { CSSProperties } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import { TReducer } from "../../../Application/Components/Workflows/WorkflowTypes";
import { getDisabledStyle } from "../../../Application/Styles/disabledStyles";
import {
  itemTypesEconomics,
  itemTypesForecast,
  itemTypesVisualytics,
} from "../../Utils/DragAndDropItemTypes";
import { TChartStory, TChartTypes } from "../Charts/ChartTypes";
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
      paddingTop: 1,
    },
    list: {
      display: "block",
    },
  })
);

const CartesianChartCategory = ({
  chartStory,
  chartType,
  reducer,
  categoryTitle,
  categoryOptionTitle,
  updateAction,
  removeAction,
  disable,
  showCategoryMembersSwitch,
  showCategoryMembersObj,
  showCategoryZMembers,
  devScenariosTitle,
  updateParameterAction,
  updateDragItemsAction,
  updateHasDroppedAction,
  categoryDragItem,
  categoryDropped,
  categoryDragItemsTitle,
  categoryHasDroppedTitle,
  resultsTitle,
}: IChartCategories) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [membersSwitch, setMembersSwitch] = React.useState(
    showCategoryMembersObj && showCategoryMembersObj[categoryTitle as string]
  );

  const [hasDroppedObj, setHasDroppedObj] = React.useState(
    categoryDropped as Record<string, boolean>
  );

  const [dragItemObj, setDragItemObj] = React.useState(
    categoryDragItem as Record<string, IDragItem>
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

        setDragItemObj((prev) => ({ ...prev, [id]: item as IDragItem }));
        setHasDroppedObj((prev) => ({ ...prev, [id]: true }));

        dispatch(updateAction(categoryOptionTitle as string, item));

        dispatch(
          updateDragItemsAction &&
            updateDragItemsAction(
              reducer as TReducer,
              categoryTitle as string,
              categoryDragItemsTitle as string,
              item as IDragItem
            )
        );

        dispatch(
          updateHasDroppedAction &&
            updateHasDroppedAction(
              reducer as TReducer,
              categoryTitle as string,
              categoryHasDroppedTitle as string,
              id,
              true
            )
        );
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

  const disableStyle = disable ? getDisabledStyle(theme) : {};

  const style = {
    ...dropTargetStyle,
    ...disableStyle,
    width: "100%",
  } as CSSProperties;

  const shwCatMbs = Object.values(
    showCategoryMembersObj as Record<string, boolean>
  ).join();
  const dragCatDrpd = Object.values(
    categoryDropped as Record<string, boolean>
  ).join();
  const dragItemNames = Object.values(
    categoryDragItem as Record<string, IDragItem>
  )
    .map((item) => item.name)
    .join();

  React.useEffect(() => {
    setMembersSwitch(
      showCategoryMembersObj && showCategoryMembersObj[categoryTitle as string]
    );
    setHasDroppedObj(categoryDropped as Record<string, true>);
    setDragItemObj(categoryDragItem as Record<string, IDragItem>);
  }, [resultsTitle, devScenariosTitle, shwCatMbs, dragCatDrpd, dragItemNames]);

  return (
    <div className={classes.chartProps} style={style}>
      {showCategoryMembersSwitch && (
        <ApexMuiSwitch
          name="showCategoryMembersSwitch"
          handleChange={(event: React.ChangeEvent<any>) => {
            const { checked } = event.target;

            setMembersSwitch(checked);
            showCategoryZMembers = checked;

            dispatch(
              updateParameterAction &&
                updateParameterAction(
                  "showCategoryZMembers",
                  showCategoryZMembers
                )
            );
          }}
          checked={membersSwitch as boolean}
          checkedColor={theme.palette.success.main}
          notCheckedColor={theme.palette.common.white}
          hasLabels={true}
          leftLabel="Hide"
          rightLabel="Show"
          moreStyles={{ alignSelf: "flex-end", height: 30 }}
        />
      )}
      <AnalyticsComp
        title={categoryTitle as string}
        direction="Vertical"
        containerStyle={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
        }}
        content={
          <ApexFlexContainer
            ref={drop}
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            width="99%"
          >
            {Object.keys(hasDroppedObj).length > 0 ? (
              <>
                {Object.keys(dragItemObj).map((id) => {
                  const item = dragItemObj[id];

                  return (
                    <ChartCategoryVariable
                      chartStory={chartStory as TChartStory}
                      chartType={chartType as TChartTypes}
                      style={style}
                      key={id}
                      dragItem={item}
                      setHasDroppedObj={setHasDroppedObj}
                      setDragItemObj={setDragItemObj}
                      categoryTitle={categoryTitle as string}
                      categoryDragItemsTitle={categoryDragItemsTitle as string}
                      categoryHasDroppedTitle={
                        categoryHasDroppedTitle as string
                      }
                      categoryOptionTitle={categoryOptionTitle as string}
                      removeChartCategoryAction={removeAction}
                    />
                  );
                })}
              </>
            ) : (
              <ApexFlexContainer>{"Drop here"}</ApexFlexContainer>
            )}
          </ApexFlexContainer>
        }
        contentStyle={{
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
};

export default React.memo(CartesianChartCategory);
