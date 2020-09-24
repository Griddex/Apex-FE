import { Button, ButtonGroup, Toolbar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "../../Services/HistoryService";
import { navigateResetWorkflowAction } from "../../Redux/Actions/LayoutActions";
import { subNavbarSetMenuAction } from "../../Redux/Actions/ApplicationActions";

const mainDrawerExpanded = 96;
const mainDrawerWidthCollapsed = 40;
const subNavBarHeight = 25;

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#EEEEEE",
    marginTop: "42.77px",
    height: subNavBarHeight,
    zIndex: theme.zIndex.appBar - 1,
  },
  appBarShiftCollapsed: {
    marginLeft: `${mainDrawerWidthCollapsed}px`,
    width: `calc(100% - ${mainDrawerWidthCollapsed}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  marginLeft: `${mainDrawerExpanded}px`,
  appBarShiftExpanded: {
    width: `calc(100% - ${mainDrawerExpanded}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appbarToolBar: {
    height: "100%",
    minHeight: "100%",
  },
  button: {
    height: subNavBarHeight,
    padding: "0px 10px",
    width: "auto",
    textTransform: "none",
    margin: theme.spacing(0),
  },
}));

const SubNavbar = ({ subNavbarData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { expandMainDrawer } = useSelector((state) => state.layoutReducer);

  return (
    <AppBar
      className={clsx(classes.appBar, {
        [classes.appBarShiftExpanded]: expandMainDrawer,
        [classes.appBarShiftCollapsed]: !expandMainDrawer,
      })}
    >
      <Toolbar className={classes.appbarToolBar} disableGutters>
        <ButtonGroup variant="text">
          {subNavbarData.map((navbarData, i) => {
            const { name, route, icon } = navbarData;

            return (
              <Button
                key={i}
                className={classes.button}
                onClick={() => {
                  dispatch(subNavbarSetMenuAction(name));
                  dispatch(navigateResetWorkflowAction());
                  history.push(route);
                }}
                endIcon={icon}
              >
                <Typography variant="subtitle2">{name}</Typography>
              </Button>
            );
          })}
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(SubNavbar);
