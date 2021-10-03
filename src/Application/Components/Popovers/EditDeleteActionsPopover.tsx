import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Button from "@mui/material/Button";
import { IPopover } from "./PopoverTypes";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: 120,
    width: 180,
    backgroundColor: "#F7F7F7",
    border: "1px solid #707070",
    padding: 5,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    height: "15%",
  },
  icon: { height: "100%", width: "10%", "& > *": { width: 15, height: 15 } },
  title: { height: "100%", width: "80%" },
  closeIcon: {
    height: "100%",
    width: "10%",
    "& > *": { width: 15, height: 15 },
  },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
    width: "100%",
    overflow: "auto",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "25%",
    width: "100%",
    "& > *": { width: 30, height: 20, margin: 5 },
  },
  cancelButton: {
    border: `2px solid ${theme.palette.secondary.main}`,
    backgroundColor: "#FFF",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
  yesButton: {
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: "#FFF",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
}));

const EditDeleteActionsPopover = React.forwardRef<HTMLDivElement, IPopover>(
  (props, ref) => {
    const classes = useStyles();
    const {
      icon,
      closeIcon,
      title,
      description,
      handleCancel,
      handleYes,
    } = props;

    return (
      <div className={classes.container} ref={ref}>
        <div className={classes.header}>
          <div className={classes.icon}>{icon}</div>
          <div className={classes.title}>{title}</div>
          <div className={classes.closeIcon}>{closeIcon}</div>
        </div>
        <div className={classes.body}>{description}</div>
        <div className={classes.footer}>
          <Button className={classes.cancelButton} onClick={handleCancel}>
            Cancel
          </Button>
          <Button className={classes.yesButton} onClick={handleYes}>
            Yes
          </Button>
        </div>
      </div>
    );
  }
);

export default EditDeleteActionsPopover;
