import {
  IconButton,
  ListItemAvatar,
  makeStyles,
  MenuItem,
  Typography,
  useTheme,
} from "@material-ui/core";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import React from "react";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import getFirstCharFromEveryWord from "../../../Application/Utils/GetFirstCharFromEveryWord";
import { IDragItem } from "./ChartCategory";

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
}));

export interface IChartCategoryVariable {
  dragItem: IDragItem;
  setHasDropped: TUseState<boolean>;
  removeAction: () => void;
}

const ChartCategoryVariable = ({
  dragItem,
  setHasDropped,
  removeAction,
}: IChartCategoryVariable) => {
  const classes = useStyles();
  const theme = useTheme();
  const { id, name, title } = dragItem;

  const avatar = getFirstCharFromEveryWord(title);
  return (
    <MenuItem
      style={{ display: "flex", justifyContent: "space-between", padding: 2 }}
    >
      <ListItemAvatar className={classes.listItemAvatar}>
        <>{avatar}</>
      </ListItemAvatar>
      <Typography variant="inherit">{title}</Typography>
      <IconButton
        onClick={() => {
          removeAction();
          setHasDropped(false);
        }}
        edge="end"
        aria-label="delete"
      >
        <CloseOutlinedIcon />
      </IconButton>
    </MenuItem>
  );
};

export default ChartCategoryVariable;
