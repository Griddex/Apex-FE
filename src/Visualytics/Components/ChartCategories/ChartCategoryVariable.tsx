import { IconButton, ListItemAvatar, MenuItem, Typography, useTheme } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import getFirstCharFromEveryWord from "../../../Application/Utils/GetFirstCharFromEveryWord";
import { IDragItem } from "./ChartCategoryTypes";
import omitBy from "lodash.omitby";
import omit from "lodash.omit";

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
  removeChartCategoryAction: (title: string, id: string) => IAction;
}

const ChartCategoryVariable = ({
  dragItem,
  setHasDroppedObj,
  setDragItemObj,
  categoryTitle,
  removeChartCategoryAction,
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

          dispatch(removeChartCategoryAction(categoryTitle, id));
        }}
        edge="end"
        aria-label="delete"
        size="large">
        <CloseOutlinedIcon />
      </IconButton>
    </MenuItem>
  );
};

export default ChartCategoryVariable;
