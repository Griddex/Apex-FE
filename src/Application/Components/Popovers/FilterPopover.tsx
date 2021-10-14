import { ListItem } from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import makeStyles from "@mui/styles/makeStyles";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { TUseState } from "../../Types/ApplicationTypes";
import getFirstCharFromEveryWord from "../../Utils/GetFirstCharFromEveryWord";
import { TAllWorkflowProcesses } from "../Workflows/WorkflowTypes";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
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

    const fileHeadersSelector = createDeepEqualSelector(
      (state: RootState) =>
        state.inputReducer["inputDataWorkflows"][
          workflowProcess as TAllWorkflowProcesses
        ],
      (headers) => headers
    );

    const fileHeaders = useSelector(fileHeadersSelector);

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
