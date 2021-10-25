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
import { TChartTypes } from "../Charts/ChartTypes";
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
}

const ChartCategoryVariable = ({
  chartType,
  dragItem,
  setHasDroppedObj,
  setDragItemObj,
  categoryTitle,
  categoryDragItemsTitle,
  categoryHasDroppedTitle,
  categoryOptionTitle,
  removeChartCategoryAction,
  style,
}: IChartCategoryVariable) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { id, title } = dragItem;

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
          setHasDroppedObj((prev) => {
            const next = omit(prev, [id]);
            return next;
          });
          setDragItemObj((prev) => {
            const next = omit(prev, [id]);
            return next;
          });

          dispatch(
            removeChartCategoryAction(
              categoryDragItemsTitle,
              categoryHasDroppedTitle,
              categoryTitle,
              categoryOptionTitle,
              id,
              chartType
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
