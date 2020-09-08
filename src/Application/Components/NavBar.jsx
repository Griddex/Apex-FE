import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import clsx from "clsx";
import faker from "faker";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "../Services/HistoryService";
import GetInitials from "../Utils/GetInitials";
import {
  mainDrawerCollapseAction,
  mainDrawerExpandAction,
} from "./../Redux/Actions/LayoutActions";

const navbarHeight = 43;
const useStyles = makeStyles((theme) => {
  return {
    appBar: {
      backgroundColor: "#FFF",
      width: (props) => {
        return `calc(100% - ${props.expandMainDrawer ? 100 : 40}px)`;
      },
      height: navbarHeight,
      zIndex: theme.zIndex.drawer,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: (props) => (props.expandMainDrawer ? 100 : 40),
      width: (props) => `calc(100% - ${props.expandMainDrawer ? 100 : 40}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: "none",
    },

    appbarToolBar: {
      paddingLeft: "10px",
      paddingRight: "10px",
      height: "100%",
      minHeight: "100%",
    },
    userToolBar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginLeft: "auto",
      marginRight: 0,
      minHeight: "inherit",
    },
    smallAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
    userExpandMoreIcon: { marginRight: theme.spacing(2) },
    userBadge: { marginRight: theme.spacing(4), marginTop: theme.spacing(1) },
    userTypography: { marginRight: theme.spacing(1) },
    userLogout: { marginRight: theme.spacing(0) },
  };
});

const Navbar = () => {
  const dispatch = useDispatch();
  const layoutProps = useSelector((state) => state.layoutReducer);
  const classes = useStyles(layoutProps);

  const { expandMainDrawer, showNavbar } = layoutProps;
  const username = faker.name.findName();
  const userinitials = GetInitials(username);

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: expandMainDrawer,
      })}
    >
      {showNavbar && (
        <Toolbar className={classes.appbarToolBar}>
          {!expandMainDrawer ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(mainDrawerExpandAction())}
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
              onClick={() => dispatch(mainDrawerCollapseAction())}
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

Navbar.propTypes = {
  children: PropTypes.node,
};

export default React.memo(Navbar);
