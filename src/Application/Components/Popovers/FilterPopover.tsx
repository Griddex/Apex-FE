import { ListItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { TUseState } from "../../Types/ApplicationTypes";
import getFirstCharFromEveryWord from "../../Utils/GetFirstCharFromEveryWord";
import { TAllWorkflowProcesses } from "../Workflows/WorkflowTypes";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    // flex: "auto",
    flexDirection: "column",
    height: 500,
    backgroundColor: "#F7F7F7",
    border: "1px solid #707070",
    padding: 5,
    width: 150,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    height: "auto",
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
    height: "auto",
    width: "100%",
    overflow: "auto",
  },
  listItem: { padding: 0, cursor: "pointer" },
  listItemAvatar: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    minWidth: 20,
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
    height: "auto",
    width: "100%",
    "& > *": { width: 30, height: 20, margin: 5 },
  },
}));

export interface IPopoverProps {
  title: string;
  action: () => void;
  handleCancel: () => void;
  localDispatch: TUseState<{ type: string; payload: any }>;
  workflowProcess?: string;
}

const FilterPopover = React.forwardRef<HTMLDivElement, IPopoverProps>(
  ({ title, action, handleCancel, localDispatch, workflowProcess }, ref) => {
    const classes = useStyles();
    const { fileHeaders } = useSelector(
      (state: RootState) =>
        state.inputReducer["inputDataWorkflows"][
          workflowProcess as TAllWorkflowProcesses
        ]
    );

    return (
      <div className={classes.container} ref={ref}>
        <div className={classes.header}>
          <div className={classes.icon}>
            <FilterListOutlinedIcon />
          </div>
          <div className={classes.title}>{title}</div>
          <div className={classes.closeIcon}>
            <CloseOutlinedIcon onClick={() => action()} />
          </div>
        </div>
        <div className={classes.body}>
          <List dense>
            {fileHeaders.map((header: string, listIndex: number) => {
              const avatar = getFirstCharFromEveryWord(header);
              //TODO: Clear all

              return (
                <ListItem
                  button
                  className={classes.listItem}
                  key={listIndex}
                  onClick={() =>
                    localDispatch({
                      type: "ACTIVECOLUMN_TABLE",
                      payload: header,
                    })
                  }
                >
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <>{avatar}</>
                  </ListItemAvatar>
                  <ListItemText>{header}</ListItemText>
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

export default FilterPopover;
