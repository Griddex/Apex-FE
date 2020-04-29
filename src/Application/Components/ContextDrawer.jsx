import { Drawer } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";
import useLayoutStyles from "./../Styles/LayoutStyles";

const ContextDrawer = React.memo(({ reduxProps, boundUILayoutActions }) => {
  const { openContextDrawer } = reduxProps;
  const {
    openContextDrawerAction,
    closeContextDrawerAction,
  } = boundUILayoutActions;

  const classes = useLayoutStyles();

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      className={clsx(classes.contextDrawer, {
        [classes.contextDrawerOpen]: openContextDrawer,
        [classes.contextDrawerClose]: !openContextDrawer,
      })}
      classes={{
        paper: clsx({
          [classes.contextDrawerOpen]: openContextDrawer,
          [classes.contextDrawerClose]: !openContextDrawer,
        }),
      }}
    >
      {!openContextDrawer ? (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={openContextDrawerAction}
          edge="start"
          className={clsx(classes.contextDrawerMenuIcon, {
            [classes.hide]: openContextDrawer,
          })}
        >
          <MenuIcon />
        </IconButton>
      ) : (
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={closeContextDrawerAction}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: !openContextDrawer,
          })}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
    </Drawer>
  );
});

export default ContextDrawer;
