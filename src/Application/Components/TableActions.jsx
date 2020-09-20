import React from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
// import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";

// import HorizontalSplitOutlinedIcon from "@material-ui/icons/HorizontalSplitOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
// import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  actionsRoot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    "& > *": {
      width: 24,
      height: 24,
      "&:hover": { color: theme.palette.primary.main },
    },
    alignSelf: "center",
    color: theme.palette.text,
    width: 80,
  },
}));

const TableActions = ({
  handleEditAction,
  handleDeleteAction,
  handlePickAction,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.actionsRoot}>
      <EditOutlinedIcon onClick={handleEditAction} />
      <DeleteOutlinedIcon onClick={handleDeleteAction} />
      <MenuOpenOutlinedIcon onClick={handlePickAction} />
    </div>
  );
};

export default TableActions;
