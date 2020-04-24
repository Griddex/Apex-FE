import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 100;
const NavBarWidth = 42.77;

export const useLayoutStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#FFF",
    width: `calc(100% - 40px)`,
    height: NavBarWidth,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
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
    minHeight: NavBarWidth,
    minHeight: NavBarWidth,
  },
  content: {
    // flexGrow: 1,
    marginTop: NavBarWidth,
    height: `calc(100% - ${NavBarWidth}px)`,
    paddingTop: theme.spacing(3) + 1,
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
  importLandingFacilities: {
    height: "calc(100vh - 67.77px)",
    width: "100vw",
    "& > *": { margin: "20px", height: "60%" },
  },
}));
