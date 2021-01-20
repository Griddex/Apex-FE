import {
  AppBar,
  Avatar,
  Badge,
  Box,
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
import {
  mainDrawerCollapseAction,
  mainDrawerExpandAction,
} from "../../Redux/Actions/LayoutActions";
import layoutReducer from "../../Redux/Reducers/LayoutReducer";
import { RootState } from "../../Redux/Reducers/AllReducers";
import GetInitials from "../../Utils/GetInitials";
import UserProfilePopover from "../Popovers/UserProfilePopover";

const navbarHeight = 43;
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#FFF",
    width: (props: ReturnType<typeof layoutReducer>) => {
      return `calc(100% - ${
        props.expandMainDrawer ? theme.spacing(12) : theme.spacing(5)
      }px)`;
    },
    height: navbarHeight,
    zIndex: theme.zIndex.drawer,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: (props: ReturnType<typeof layoutReducer>) =>
      props.expandMainDrawer ? theme.spacing(12) : theme.spacing(5),
    width: (props: ReturnType<typeof layoutReducer>) =>
      `calc(100% - ${
        props.expandMainDrawer ? theme.spacing(12) : theme.spacing(5)
      }px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  appbarToolBar: {
    paddingLeft: 10,
    paddingRight: 10,
    height: "100%",
    minHeight: "100%",
  },
  userToolBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: 5,
    minHeight: "inherit",
    cursor: "pointer",
  },
  smallAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  userExpandMoreIcon: { marginRight: theme.spacing(2) },
  userBadge: { marginRight: theme.spacing(4), marginTop: theme.spacing(1) },
  userTypography: { marginRight: theme.spacing(1) },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const layoutProps = useSelector((state: RootState) => state.layoutReducer);
  const classes = useStyles(layoutProps);

  const { expandMainDrawer, showNavbar } = layoutProps;
  const username = faker.name.findName();
  const userinitials = GetInitials(username);
  const { projectName } = useSelector(
    (state: RootState) => state.projectReducer
  );

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
              className={clsx({
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
              className={clsx({
                [classes.hide]: !expandMainDrawer,
              })}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          <Box>{projectName}</Box>
          <Box className={classes.userToolBar}>
            <UserProfilePopover>
              <div className={classes.userToolBar}>
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
                  // src={faker.internet.avatar()}
                  src={"GS"}
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
              </div>
            </UserProfilePopover>
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
