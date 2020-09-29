import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ListItem } from "@material-ui/core";
import getFirstCharFromEveryWord from "../../Utils/GetFirstCharFromEveryWord";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: 200,
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
    height: "70%",
    width: "100%",
    overflow: "overlay",
  },
  listItem: { padding: 0, cursor: "pointer" },
  listItemAvatar: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  cancelButton: {
    border: `2px solid ${theme.palette.secondary.main}`,
    backgroundColor: "#FFF",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "15%",
    width: "100%",
    "& > *": { width: 30, height: 20, margin: 5 },
  },
}));

const RolesActionPopover = React.forwardRef(
  ({ icon, closeIcon, title, handleCancel, handleYes }, ref) => {
    const classes = useStyles();

    return (
      <div className={classes.container} ref={ref}>
        <div className={classes.header}>
          <div className={classes.icon}>{icon}</div>
          <div className={classes.title}>{title}</div>
          <div className={classes.closeIcon}>{closeIcon}</div>
        </div>
        <div className={classes.body}>
          <List dense>
            {"Set as:"}
            {["Header", "Unit", "Data"].map((role, listIndex) => {
              const avatar = getFirstCharFromEveryWord(role);

              return (
                <ListItem
                  className={classes.listItem}
                  key={listIndex}
                  name={listIndex}
                  onClick={handleYes}
                >
                  <ListItemAvatar className={classes.listItemAvatar}>
                    {avatar}
                  </ListItemAvatar>
                  <ListItemText>{role}</ListItemText>
                </ListItem>
              );
            })}
          </List>
        </div>
        <div className={classes.footer}>
          <Button className={classes.cancelButton} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
);

export default RolesActionPopover;
