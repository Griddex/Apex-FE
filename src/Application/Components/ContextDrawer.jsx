import { Drawer } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";
import useLayoutStyles from "./../Styles/LayoutStyles";

const ContextDrawer = React.memo(({ reduxProps, boundUILayoutActions }) => {
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
        paper: clsx(classes.contextDrawer, {
          [classes.contextDrawerOpen]: expandContextDrawer,
          [classes.contextDrawerClose]: !expandContextDrawer,
        }),
      }}
    >
      {!expandContextDrawer ? (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={expandContextDrawerAction}
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
          onClick={collapseContextDrawerAction}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: !expandContextDrawer,
          })}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
    </Drawer>
  );
});

export default ContextDrawer;
