import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AppBar, Avatar, Badge, Box, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import faker from "faker";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import {
  mainDrawerCollapseAction,
  mainDrawerExpandAction,
} from "../../Redux/Actions/LayoutActions";
import { RootState } from "../../Redux/Reducers/AllReducers";
import layoutReducer from "../../Redux/Reducers/LayoutReducer";
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
    marginLeft: 5,
  },
  appbarToolBar: {
    paddingLeft: 10,
    paddingRight: 10,
    height: "100%",
    minHeight: "100%",
    marginLeft: (props: ReturnType<typeof layoutReducer>) =>
      props.expandMainDrawer ? theme.spacing(12) : theme.spacing(5),
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
    marginLeft: 5,
    color: theme.palette.grey[500],
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const layoutPartialPropsSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer,
  (props) => props
);

const loginPartialPropsSelector = createDeepEqualSelector(
  (state: RootState) => state.loginReducer,
  (props) => props
);

const currentProjectTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.projectReducer.currentProjectTitle,
  (title) => title
);

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { expandMainDrawer, showNavbar } = useSelector(
    layoutPartialPropsSelector
  );

  // const { userName, role } = useSelector(loginPartialPropsSelector);
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  const classes = useStyles({ expandMainDrawer, showNavbar } as ReturnType<
    typeof layoutReducer
  >);

  const avatarSrc = localStorage.getItem("avatar");
  const [avatar, setAvatar] = React.useState(avatarSrc);

  const username = userName as string;
  const userinitials = GetInitials(username);

  const currentProjectTitle = useSelector(currentProjectTitleSelector);

  React.useEffect(() => {
    if (!avatarSrc || avatarSrc === "") {
      const avatarSrc = faker.internet.avatar();
      localStorage.setItem("avatar", avatarSrc);
      setAvatar(avatarSrc);
    }
  }, []);

  return (
    <AppBar
      style={{ marginLeft: 40 }}
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: expandMainDrawer,
      })}
    >
      {showNavbar && (
        <Toolbar className={classes.appbarToolBar}>
          {!expandMainDrawer ? (
            <IconButton
              style={{ marginLeft: 1 }}
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(mainDrawerExpandAction())}
              edge="start"
              className={clsx({
                [classes.hide]: expandMainDrawer,
              })}
              size="large"
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
              size="large"
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          <Box sx={{ marginLeft: 1 }}>
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
