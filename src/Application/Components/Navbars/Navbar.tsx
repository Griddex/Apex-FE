import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import clsx from "clsx";
import faker from "faker";
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
  roleTypography: {
    // marginRight: theme.spacing(1),
    marginLeft: 5,
    color: theme.palette.grey[500],
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const layoutProps = useSelector((state: RootState) => state.layoutReducer);
  const loginProps = useSelector((state: RootState) => state.loginReducer);
  const { userName, role } = loginProps;
  const classes = useStyles(layoutProps);

  const { expandMainDrawer, showNavbar } = layoutProps;

  const avatarSrc = localStorage.getItem("avatar");
  const [avatar, setAvatar] = React.useState(avatarSrc);

  // const username = faker.name.findName();
  const username = userName; //"Gideon Sanni";
  //const role = "Corporate Forecaster";
  const userinitials = GetInitials(username);
  const { currentProjectTitle } = useSelector(
    (state: RootState) => state.projectReducer
  );

  React.useEffect(() => {
    if (!avatarSrc || avatarSrc === "") {
      const avatarSrc = faker.internet.avatar();
      localStorage.setItem("avatar", avatarSrc);
      setAvatar(avatarSrc);
    }
  }, []);

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
          <Box>
            <Typography
              variant="button"
              style={{
                color: theme.palette.grey[900],
                letterSpacing: 1.2,
                fontWeight: "bold",
              }}
            >
              {currentProjectTitle}
            </Typography>
          </Box>
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
                  src={avatar as string}
                  variant="circular"
                >
                  {userinitials}
                </Avatar>
                <Typography
                  className={classes.userTypography}
                  variant="subtitle1"
                  style={{ color: theme.palette.grey[900] }}
                >
                  {username}
                </Typography>
                <Typography>{"|"}</Typography>
                <Typography
                  className={classes.roleTypography}
                  variant="subtitle1"
                  style={{ color: theme.palette.grey[700] }}
                >
                  {role}
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

export default React.memo(Navbar);
