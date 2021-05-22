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
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 2,
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <ListItemAvatar className={classes.listItemAvatar}>
        <>{avatar}</>
      </ListItemAvatar>
      <Typography variant="inherit">{title}</Typography>
      <IconButton
        // className={classes.closeButton}
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

export default React.memo(ChartCategoryVariable);
