import { makeStyles } from "@material-ui/core/styles";

const NavBarHeight = 43;
const subNavBarHeight = 25;

const useLayoutStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      height: "100%",
      width: "100%",
    },
    appBar: {
      backgroundColor: "#FFF",
      width: (reduxProps) => {
        return `calc(100% - ${reduxProps.expandMainDrawer ? 100 : 40}px)`;
      },
      height: NavBarHeight,
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: (reduxProps) => (reduxProps.expandMainDrawer ? 100 : 40),
      width: (reduxProps) =>
        `calc(100% - ${reduxProps.expandMainDrawer ? 100 : 40}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: "none",
    },
    mainContainer: {
      flexGrow: 1,
      maxWidth: "100%",
      height: (reduxProps) =>
        `calc(100% - ${
          NavBarHeight + (reduxProps.subNavBarPresent ? subNavBarHeight : 0)
        }px)`,
      width: (reduxProps) =>
        `calc(100% - ${
          reduxProps.mainDrawerPresent
            ? reduxProps.expandMainDrawer
              ? 60
              : 0
            : 0
        } - ${
          reduxProps.contextDrawerPresent
            ? reduxProps.expandContextDrawer
              ? 150
              : 40
            : 0
        })`,
      marginTop: (reduxProps) =>
        (reduxProps.navBarPresent ? NavBarHeight : 0) +
        (reduxProps.subNavBarPresent ? subNavBarHeight : 0) +
        5,
      marginRight: (reduxProps) =>
        reduxProps.contextDrawerPresent
          ? reduxProps.expandContextDrawer
            ? 150
            : 40
          : 0,
      marginLeft: (reduxProps) =>
        reduxProps.mainDrawerPresent
          ? reduxProps.expandMainDrawer
            ? 60
            : 0
          : 0,
    },
    container: {
      display: "flex",
      alignItems: "flex-end",
      height: "100%",
      width: (reduxProps) =>
        `calc(100% - ${
          reduxProps.mainDrawerPresent
            ? reduxProps.expandMainDrawer
              ? 60
              : 0
            : 0
        } - ${
          reduxProps.contextDrawerPresent
            ? reduxProps.expandContextDrawer
              ? 150
              : 40
            : 0
        })`,
      maxWidth: "100%",
      padding: 0,
      marginRight: (reduxProps) =>
        reduxProps.contextDrawerExpanded ? 150 : 40,
      paddingTop: (reduxProps) =>
        reduxProps.subNavBarPresent ? subNavBarHeight : 0,
    },
    //Main Drawer
    mainDrawer: {
      width: 40,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    mainDrawerOpen: {
      width: (reduxProps) => (reduxProps.expandMainDrawer ? 100 : 40),
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
      width: (reduxProps) => (reduxProps.contextDrawerExpanded ? 150 : 40),
      maxHeight: (reduxProps) =>
        `calc(100vh - ${
          NavBarHeight + (reduxProps.subNavBarPresent ? subNavBarHeight : 0)
        }px)`,
      marginTop: NavBarHeight,
    },
    contextDrawerOpen: {
      width: (reduxProps) => (reduxProps.contextDrawerExpanded ? 150 : 40),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    contextDrawerClose: {
      marginTop: NavBarHeight,
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
