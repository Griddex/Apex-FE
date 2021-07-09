import { makeStyles, useTheme } from "@material-ui/core";
import React from "react";
import Draggable from "react-draggable";
import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DraggableDialog from "../../../Application/Components/Dialogs/DraggableDialog";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import ChartCategory from "./ChartCategory";
import { IChartCategoriesData } from "./ChartCategoryTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: (props: any) => (props.showCategories ? "flex" : "none"),
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[300]}`,
    zIndex: 1300,
    // boxShadow: `${alpha(theme.palette.grey[300], 0.25)} 0 0 0 2px`,
  },
}));

const ChartCategories = ({
  categoriesTitle,
  ChartCategoriesData,
  showCategories,
  setShowCategories,
}: IChartCategoriesData) => {
  const theme = useTheme();
  const classes = useStyles({ showCategories });

  const props: DialogStuff = {
    name: "Chart_Categories_Dialog",
    title: `${categoriesTitle} Categories`,
    type: "draggableDialog",
    show: true,
    exclusive: true,
    maxWidth: "xs",
    iconType: "category",
    setShowCategories,
    actionsList: () => DialogCancelButton(() => setShowCategories(false)),
  };

  return (
    <Draggable>
      <span
        style={{ backgroundColor: theme.palette.common.white, zIndex: 9000 }}
      >
        <DraggableDialog {...props}>
          <ApexFlexContainer
            className={classes.root}
            flexDirection="column"
            width={300}
            height="fit-content"
          >
            {ChartCategoriesData.map((props, i) => (
              <ChartCategory key={i} {...props} />
            ))}
          </ApexFlexContainer>
        </DraggableDialog>
      </span>
    </Draggable>
  );
};

export default React.memo(ChartCategories);
