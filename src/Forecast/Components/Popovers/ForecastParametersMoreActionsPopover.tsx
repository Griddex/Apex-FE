import { MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import NestedMenuItem from "material-ui-nested-menu-item";
import React from "react";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import getFirstCharFromEveryWord from "../../../Application/Utils/GetFirstCharFromEveryWord";
import noEventPropagation from "../../../Application/Events/NoEventPropagation";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: 5,
    width: 250,
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
    color: theme.palette.grey[500],
    padding: 0,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
      borderRadius: 0,
    },
  },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "90%",
    alignSelf: "center",
  },
  menuItem: { padding: 0, cursor: "pointer" },
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
  component?: JSX.Element;
  nestedData?: TImportMoreActionsData;
}
export type TImportMoreActionsData = IImportMoreActionsRow[];

export interface IPopoverProps {
  anchorEl: any;
  handleClose?: () => void;
  workflowProcess?: string;
  data: TImportMoreActionsData;
}

const generateMoreActionsMenuItems = (
  data: TImportMoreActionsData,
  classes: ClassNameMap<
    | "container"
    | "icon"
    | "header"
    | "title"
    | "closeIcon"
    | "body"
    | "menuItem"
    | "listItemAvatar"
    | "cancelButton"
    | "footer"
  >,
  anchorEl: any,
  handleClose?: () => void
) => {
  return data.map((row: IImportMoreActionsRow, i: number) => {
    const { title, action, nestedData, component: Component } = row;

    const titleDefined = title as string;
    const avatar = getFirstCharFromEveryWord(titleDefined);

    if (nestedData) {
      return (
        <NestedMenuItem
          key={i}
          className={classes.menuItem}
          parentMenuOpen={Boolean(anchorEl)}
          rightIcon={<ChevronRightOutlinedIcon />}
          label={
            <ApexFlexContainer>
              <ListItemAvatar className={classes.listItemAvatar}>
                <>{avatar}</>
              </ListItemAvatar>
              <ListItemText>{titleDefined}</ListItemText>
            </ApexFlexContainer>
          }
        >
          {generateMoreActionsMenuItems(
            nestedData,
            classes,
            anchorEl,
            handleClose
          )}
        </NestedMenuItem>
      );
    } else
      return (
        <div key={i}>
          <MenuItem
            className={classes.menuItem}
            onClick={() => {
              action && action();
              handleClose && handleClose();
            }}
            button
          >
            <ListItemAvatar className={classes.listItemAvatar}>
              <>{avatar}</>
            </ListItemAvatar>
            <ListItemText>{titleDefined}</ListItemText>
          </MenuItem>
          {Component}
        </div>
      );
  });
};

const ForecastParametersMoreActionsPopover = React.forwardRef<
  HTMLDivElement,
  IPopoverProps
>(({ anchorEl, handleClose, data }, ref) => {
  const classes = useStyles();

  return (
    <div className={classes.container} ref={ref}>
      <div className={classes.header}>
        <div className={classes.icon}>
          <FilterListOutlinedIcon />
        </div>
        <div className={classes.title}></div>
        <div className={classes.closeIcon}>
          <CloseOutlinedIcon
            {...noEventPropagation(() => handleClose && handleClose())}
          />
        </div>
      </div>
      <div className={classes.body}>
        <List style={{ height: "100%", width: "100%", padding: 0 }}>
          {generateMoreActionsMenuItems(data, classes, anchorEl, handleClose)}
        </List>
      </div>
      <div className={classes.footer}>
        <Button
          {...noEventPropagation(() => handleClose && handleClose())}
          className={classes.cancelButton}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
});

export default ForecastParametersMoreActionsPopover;
