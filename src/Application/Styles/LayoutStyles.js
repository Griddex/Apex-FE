import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

// const theme = useTheme();
const NavBarHeight = 43;
const useLayoutStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      height: "100%",
      width: "100%",
    },
    appBar: {
      backgroundColor: "#FFF",
      width: (reduxProps) =>
        `calc(100% - ${reduxProps.openMainDrawer ? 100 : 40}px)`,
      height: NavBarHeight,
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: (reduxProps) => (reduxProps.openMainDrawer ? 100 : 40),
      width: (reduxProps) =>
        `calc(100% - ${reduxProps.openMainDrawer ? 100 : 40}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: "none",
    },
    container: {
      display: "flex",
      width: (reduxProps) =>
        `calc(100% - ${reduxProps.contextDrawerExpanded ? 40 : 150})`,
      marginRight: (reduxProps) =>
        reduxProps.contextDrawerExpanded ? 40 : 150,
      // maxWidth: "100vw",
      padding: 0,
      margin: 0,
      marginTop: NavBarHeight,
      paddingTop: (reduxProps) => (reduxProps.subNavBarPresent ? 25 : 0),
    },
    //Main Drawer
    mainDrawer: {
      width: 40,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    mainDrawerOpen: {
      width: (reduxProps) => (reduxProps.openMainDrawer ? 100 : 40),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    mainDrawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(5),
      // [theme.breakpoints.up("sm")]: {
      //   width: theme.spacing(5) + 1,
      // },
    },
    //Context Drawer
    contextDrawer: {
      display: "flex",
      flexDirection: "column",
      flex: "0 1 auto",
      whiteSpace: "nowrap",
      justifyContent: "flex-start",
      alignItems: "center",
      width: (reduxProps) => (reduxProps.contextDrawerExpanded ? 40 : 150),
      height: (reduxProps) =>
        `calc(100vw - ${
          NavBarHeight + (reduxProps.subNavBarPresent ? 25 : 0)
        }px)`,
      maxHeight: (reduxProps) =>
        `calc(100vw - ${
          NavBarHeight + (reduxProps.subNavBarPresent ? 25 : 0)
        }px)`,
      marginTop: (reduxProps) =>
        NavBarHeight + (reduxProps.subNavBarPresent ? 25 : 0),
    },
    contextDrawerOpen: {
      width: (reduxProps) => (reduxProps.contextDrawerExpanded ? 40 : 150),
      maxHeight: (reduxProps) =>
        `calc(100vw - ${
          NavBarHeight + (reduxProps.subNavBarPresent ? 25 : 0)
        }px)`,
      marginTop: (reduxProps) =>
        NavBarHeight + (reduxProps.subNavBarPresent ? 25 : 0),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    contextDrawerClose: {
      maxHeight: (reduxProps) =>
        `calc(100vw - ${
          NavBarHeight + (reduxProps.subNavBarPresent ? 25 : 0)
        }px)`,
      marginTop: (reduxProps) =>
        NavBarHeight + (reduxProps.subNavBarPresent ? 25 : 0),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(5),
      // [theme.breakpoints.up("sm")]: {
      //   width: theme.spacing(5) + 1,
      // },
    },
    contextDrawerMenuIcon: {
      margin: 0,
    },
    appbarToolBar: {
      paddingLeft: "10px",
      paddingRight: "10px",
      height: "100%",
      minHeight: "100%",
    },
    userMargin: { marginRight: theme.spacing(3) },
    userToolBar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginLeft: "auto",
      marginRight: 0,
      minHeight: "inherit",
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      minHeight: "inherit",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    companyLogoToolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: NavBarHeight,
    },
    mainContent: {
      flexGrow: 1,
      marginTop: NavBarHeight,
      height: (reduxProps) =>
        `calc(100% - ${
          NavBarHeight + (reduxProps.subNavBarPresent ? 25 : 0)
        }px)`,
      paddingTop: theme.spacing(3) + 1,
      width: (reduxProps) =>
        `calc(100% - ${
          reduxProps.subNavBarPresent
            ? reduxProps.subNavBarExpanded
              ? 150
              : 40
            : 0
        })`,
      marginRight: (reduxProps) =>
        reduxProps.subNavBarPresent
          ? reduxProps.subNavBarExpanded
            ? 150
            : 40
          : 0,
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
    menuItemBoxOpen: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100px",
      minWidth: "100px",
    },
    menuItemBoxClosed: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "40px",
      minWidth: "40px",
    },
    menuItemDiv: { width: "100%", textAlign: "center" },
    contextDrawer: {
      display: "flex",
      width: "20vw",
    },
  };
});

export default useLayoutStyles;
