import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
}));

const EditDeleteActionsPopover = React.forwardRef(
  ({ icon, closeIcon, title, description, handleCancel, handleYes }, ref) => {
    const classes = useStyles();

    return (
      <div className={classes.container} ref={ref}>
        <div className={classes.header}>
          <div className={classes.icon}>{icon}</div>
          <div className={classes.title}>{title}</div>
          <div className={classes.closeIcon}>{closeIcon}</div>
        </div>
        <div className={classes.body}>{description}</div>
        <div className={classes.footer}>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="outlined" color="primary" onClick={handleYes}>
            Yes
          </Button>
        </div>
      </div>
    );
  }
);

export default EditDeleteActionsPopover;
