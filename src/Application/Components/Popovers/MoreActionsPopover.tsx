import { MenuItem, Theme, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { ClassNameMap } from "@mui/styles";
import makeStyles from "@mui/styles/makeStyles";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import React from "react";
import ApexFlexContainer from "../Styles/ApexFlexContainer";
import getFirstCharFromEveryWord from "../../Utils/GetFirstCharFromEveryWord";
import noEventPropagation from "../../Events/NoEventPropagation";
import NestedMenuItem from "../NestedMenuItems/NestedMenuItem";
import { getDisabledStyle } from "../../Styles/disabledStyles";

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
    width: "100%",
    alignSelf: "center",
  },
  menuItem: { padding: 0, cursor: "pointer", height: 35 },
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
  id?: string;
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
  theme: Theme,
  handleClose?: () => void
) => {
  return data.map((row: IImportMoreActionsRow, i: number) => {
    const { id, title, action, nestedData, component: Component } = row;
    console.log(
      "🚀 ~ file: MoreActionsPopover.tsx ~ line 114 ~ returndata.map ~ id",
      id
    );

    const titleDefined = title as string;
    const avatar = getFirstCharFromEveryWord(titleDefined);
    const disabledStyle =
      titleDefined === "Modify" && id !== "" ? getDisabledStyle(theme) : {};
    console.log(
      "🚀 ~ file: MoreActionsPopover.tsx ~ line 119 ~ returndata.map ~ disabledStyle",
      disabledStyle
    );

    if (nestedData) {
      return (
        <NestedMenuItem
          key={i}
          style={disabledStyle}
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
            theme,
            handleClose
          )}
        </NestedMenuItem>
      );
    } else
      return (
        <div key={i}>
          <MenuItem
            style={disabledStyle}
            className={classes.menuItem}
            onClick={() => {
              action && action();
              handleClose && handleClose();
            }}
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

const MoreActionsPopover = React.forwardRef<HTMLDivElement, IPopoverProps>(
  ({ anchorEl, handleClose, data }, ref) => {
    const classes = useStyles();
    const theme = useTheme();

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
            {generateMoreActionsMenuItems(
              data,
              classes,
              anchorEl,
              theme,
              handleClose
            )}
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
  }
);

export default MoreActionsPopover;
