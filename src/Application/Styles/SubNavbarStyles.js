import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 100;
const NavBarWidthCollapsed = 40;
const NavBarWidthExpanded = 100;
const subNavBarWidth = 25;

export const useSubNavBarStyles = makeStyles((theme) => ({
  appBarShiftCollapsed: {
    backgroundColor: "#eeeeee",
    marginTop: "42.77px",
    height: subNavBarWidth,
    marginLeft: `${NavBarWidthCollapsed}px`,
    width: `calc(100% - ${NavBarWidthCollapsed}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShiftExpanded: {
    backgroundColor: "#eeeeee",
    marginTop: "42.77px",
    height: subNavBarWidth,
    marginLeft: `${NavBarWidthExpanded}px`,
    width: `calc(100% - ${NavBarWidthExpanded}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBar: {
    backgroundColor: "#eeeeee",
    marginTop: "42.77px",
    height: subNavBarWidth,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appbarToolBar: {
    height: "100%",
    minHeight: "100%",
  },
  button: {
    height: subNavBarWidth,
    padding: "0px 10px",
    width: "auto",
    textTransform: "none",
    margin: theme.spacing(0),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "inherit",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  listItemIconOpen: { minWidth: drawerWidth },
  listItemIconClosed: { minWidth: theme.spacing(4) },
}));
