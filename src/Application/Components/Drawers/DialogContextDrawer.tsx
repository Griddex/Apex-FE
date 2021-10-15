import { Drawer } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import makeStyles from "@mui/styles/makeStyles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dialogContextDrawerCollapseAction,
  dialogContextDrawerExpandAction,
} from "../../Redux/Actions/LayoutActions";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const useStyles = makeStyles((theme) => {
  return {
    hide: {
      display: "none",
    },
    dialogContextDrawer: {
      display: "flex",
      flexShrink: 0,
      whiteSpace: "nowrap",
      "&.MuiDrawer-paper": {
        height: `100%`,
      },
      position: "relative",
      top: "auto",
      padding: 5,
    },
    paperAnchorRight: { right: "auto" },
    expandDialogContextDrawer: {
      width: theme.spacing(25),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    collapseDialogContextDrawer: {
      width: theme.spacing(5),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
    },
    dialogContextDrawerMenuIcon: {
      margin: 0,
      alignSelf: "center",
    },
    dialogContextDrawerContent: {
      marginTop: 20,
    },
    menuButton: { alignSelf: "center", height: 30, width: 30 },
  };
});

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const expandDialogContextDrawerSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.expandDialogContextDrawer,
  (drawer) => drawer
);

const DialogContextDrawer = ({
  children,
}: {
  children: (() => JSX.Element) | JSX.Element;
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const expandDialogContextDrawer = useSelector(
    expandDialogContextDrawerSelector
  );

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      className={clsx(classes.dialogContextDrawer, {
        [classes.expandDialogContextDrawer]: expandDialogContextDrawer,
        [classes.collapseDialogContextDrawer]: !expandDialogContextDrawer,
      })}
      classes={{
        paper: clsx(classes.dialogContextDrawer, {
          [classes.expandDialogContextDrawer]: expandDialogContextDrawer,
          [classes.collapseDialogContextDrawer]: !expandDialogContextDrawer,
        }),
        paperAnchorRight: classes.paperAnchorRight,
      }}
    >
      {expandDialogContextDrawer ? (
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={() => dispatch(dialogContextDrawerCollapseAction())}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: !expandDialogContextDrawer,
          })}
          size="large"
        >
          <ChevronRightIcon />
        </IconButton>
      ) : (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(dialogContextDrawerExpandAction())}
          edge="start"
          className={clsx(classes.dialogContextDrawerMenuIcon, {
            [classes.hide]: expandDialogContextDrawer,
          })}
          size="large"
        >
          <MenuIcon />
        </IconButton>
      )}
      <div className={classes.dialogContextDrawerContent}>
        {children && typeof children === "function" ? children() : children}
      </div>
    </Drawer>
  );
};

export default React.memo(DialogContextDrawer);
