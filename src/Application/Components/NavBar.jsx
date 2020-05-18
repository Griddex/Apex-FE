import React, { useState } from "react";
import PropTypes from "prop-types";
import faker from "faker";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  Box,
  Badge,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import useLayoutStyles from "./../Styles/LayoutStyles";
import history from "./../Services/HistoryService";
import GetInitials from "./../Utils/GetInitials";
import { useDispatch } from "react-redux";

const NavBar = ({ reduxProps, boundUILayoutActions }) => {
  const classes = useLayoutStyles(reduxProps);
  const dispatch = useDispatch();
  const username = faker.name.findName();
  const userinitials = GetInitials(username);

  const { expandMainDrawer, navBarPresent } = reduxProps;
  const {
    expandMainDrawerAction,
    collapseMainDrawerAction,
  } = boundUILayoutActions;

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: expandMainDrawer,
      })}
    >
      {navBarPresent && (
        <Toolbar className={classes.appbarToolBar}>
          {!expandMainDrawer ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(expandMainDrawerAction())}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: expandMainDrawer,
              })}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="close drawer"
              onClick={() => dispatch(collapseMainDrawerAction())}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: !expandMainDrawer,
              })}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          <Box className={classes.userToolBar}>
            <Badge
              className={classes.userBadge}
              badgeContent={400}
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
            <Avatar
              className={classes.smallAvatar}
              alt={username}
              src={faker.internet.avatar()}
              variant="rounded"
            >
              {userinitials}
            </Avatar>
            <Typography
              className={classes.userTypography}
              variant="subtitle1"
              color="inherit"
            >
              {username}
            </Typography>
            <ExpandMoreIcon className={classes.userExpandMoreIcon} />
            <Button
              className={classes.userLogout}
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => {
                sessionStorage.clear();
                history.replace("/login");
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
};

NavBar.propTypes = {
  children: PropTypes.node,
};

export default React.memo(NavBar);
