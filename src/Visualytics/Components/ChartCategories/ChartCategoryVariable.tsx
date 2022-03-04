import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  IconButton,
  ListItemAvatar,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import omit from "lodash.omit";
import React, { CSSProperties } from "react";
import { useDispatch } from "react-redux";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import getFirstCharFromEveryWord from "../../../Application/Utils/GetFirstCharFromEveryWord";
import { TChartStory, TChartTypes } from "../Charts/ChartTypes";
import { IChartCategories, IDragItem } from "./ChartCategoryTypes";

const useStyles = makeStyles((theme) => ({
  listItemAvatar: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    width: 40,
  },
  label: {
    display: "flex",
    justifyContent: "space-between",
  },
  closeButton: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
      borderRadius: 0,
    },
  },
}));

export interface IChartCategoryVariable {
  dragItem: IDragItem;
  setHasDroppedObj: TUseState<Record<string, boolean>>;
  setDragItemObj: TUseState<Record<string, IDragItem>>;
  categoryTitle: string;
  categoryDragItemsTitle: string;
  categoryHasDroppedTitle: string;
  categoryOptionTitle: string;
  removeChartCategoryAction: IChartCategories["removeAction"];
  style: CSSProperties;
  chartType: TChartTypes;
  chartStory: TChartStory;
}

const ChartCategoryVariable = ({
  chartType,
  dragItem,
  setHasDroppedObj,
  setDragItemObj,
  categoryTitle,
  categoryOptionTitle,
  removeChartCategoryAction,
  style,
}: IChartCategoryVariable) => {
  let chartStory = "primary" as TChartStory;
  if (categoryTitle.toLowerCase().includes("secondary")) {
    chartStory = "secondary";
  }

  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { id, name, title } = dragItem;

  const avatar = getFirstCharFromEveryWord(title);

  return (
    <MenuItem
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 2,
        height: 32,
        width: "100%",
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.primary.light,
        ...style,
      }}
    >
      <ListItemAvatar className={classes.listItemAvatar}>
        <>{avatar}</>
      </ListItemAvatar>
      <Typography variant="inherit">{title}</Typography>
      <IconButton
        style={{ marginRight: 0 }}
        onClick={() => {
          setHasDroppedObj((prev) => omit(prev, [id]));
          setDragItemObj((prev) => omit(prev, [id]));

          dispatch(
            removeChartCategoryAction(
              name,
              chartStory,
              chartType,
              categoryTitle,
              categoryOptionTitle,
              id
            )
          );
        }}
        edge="end"
        aria-label="delete"
        size="large"
      >
        <CloseOutlinedIcon />
      </IconButton>
    </MenuItem>
  );
};

export default React.memo(ChartCategoryVariable);
