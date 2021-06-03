import { ListItem, Menu } from "@material-ui/core";
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
import getFirstCharFromEveryWord from "../../Utils/GetFirstCharFromEveryWord";
import { IAllWorkflows } from "../Workflows/WorkflowTypes";
import { MenuItem } from "@material-ui/core";
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";
import NestedMenuItem from "material-ui-nested-menu-item";

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

export interface IImportMoreActionsRow {
  title?: string;
  action?: () => void;
}
export type TImportMoreActionsData = IImportMoreActionsRow[];

export interface IPopoverProps {
  anchorEl: any;
  handleClose?: () => void;
  workflowProcess?: string;
  importMoreActionsData: TImportMoreActionsData;
}

const ImportMoreActionsPopover = React.forwardRef<
  HTMLDivElement,
  IPopoverProps
>(({ anchorEl, handleClose, importMoreActionsData, workflowProcess }, ref) => {
  const classes = useStyles();

  return (
    <div className={classes.container} ref={ref}>
      <div className={classes.header}>
        <div className={classes.icon}>
          <FilterListOutlinedIcon />
        </div>
        <div className={classes.title}></div>
        <div className={classes.closeIcon}>
          <CloseOutlinedIcon onClick={handleClose} />
        </div>
      </div>
      <div className={classes.body}>
        <NestedMenuItem
          parentMenuOpen={Boolean(anchorEl)}
          rightIcon={ChevronRightOutlinedIcon}
        >
          <MenuItem />
        </NestedMenuItem>
        <List>
          {importMoreActionsData.map(
            (row: IImportMoreActionsRow, i: number) => {
              const { title, action } = row;
              const titleDefined = title as string;
              const avatar = getFirstCharFromEveryWord(titleDefined);
              //TODO: Clear all

              return (
                <ListItem
                  button
                  className={classes.listItem}
                  key={i}
                  onClick={() => action && action()}
                >
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <>{avatar}</>
                  </ListItemAvatar>
                  <ListItemText>{titleDefined}</ListItemText>
                </ListItem>
              );
            }
          )}
        </List>
      </div>
      <div className={classes.footer}>
        <Button className={classes.cancelButton} onClick={handleClose}>
          Cancel
        </Button>
        DialogCancelButton
      </div>
    </div>
  );
});

export default ImportMoreActionsPopover;
