import { Drawer } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";
import useLayoutStyles from "./../Styles/LayoutStyles";
import ContextDrawerContentService from "./../../Import/Services/ContextDrawerContentService";
import { useDispatch, useSelector } from "react-redux";

const ContextDrawer = ({ reduxProps, boundUILayoutActions }) => {
  const dispatch = useDispatch();
  const ContextImportPerspective = useSelector(
    (state) => state.ImportReducer.ContextImportPerspective
  );

  const { expandContextDrawer } = reduxProps;

  const {
    expandContextDrawerAction,
    collapseContextDrawerAction,
  } = boundUILayoutActions;

  const classes = useLayoutStyles();

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      className={clsx(classes.contextDrawer, {
        [classes.contextDrawerOpen]: expandContextDrawer,
        [classes.contextDrawerClose]: !expandContextDrawer,
      })}
      classes={{
        paper: clsx({
          [classes.contextDrawerOpen]: expandContextDrawer,
          [classes.contextDrawerClose]: !expandContextDrawer,
        }),
      }}
    >
      {!expandContextDrawer ? (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(expandContextDrawerAction())}
          edge="start"
          className={clsx(classes.contextDrawerMenuIcon, {
            [classes.hide]: expandContextDrawer,
          })}
        >
          <MenuIcon />
        </IconButton>
      ) : (
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={() => dispatch(collapseContextDrawerAction())}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: !expandContextDrawer,
          })}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
      {ContextDrawerContentService(ContextImportPerspective)}
    </Drawer>
  );
};

export default React.memo(ContextDrawer);
