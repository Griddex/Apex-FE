import { Button, ButtonGroup, Toolbar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EconomicsInputButtonsMenu from "../../../Economics/Components/Menus/EconomicsInputButtonsMenu";
import {
  ISubNavbar,
  ISubNavbarData,
} from "../../../Import/Routes/Common/Workflows/InputWorkflowsTypes";
import { subNavbarSetMenuAction } from "../../Redux/Actions/ApplicationActions";
import { navigateResetWorkflowAction } from "../../Redux/Actions/LayoutActions";
import { RootState } from "../../Redux/Reducers/AllReducers";
import history from "../../Services/HistoryService";

const mainDrawerExpanded = 96;
const mainDrawerWidthCollapsed = 40;
const subNavBarHeight = 25;

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#EEEEEE",
    marginTop: "42.77px",
    height: subNavBarHeight,
    zIndex: theme.zIndex.appBar - 1,
    marginLeft: `${mainDrawerExpanded}px`,
  },
  appBarShiftCollapsed: {
    marginLeft: `${mainDrawerWidthCollapsed}px`,
    width: `calc(100% - ${mainDrawerWidthCollapsed}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
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

const SubNavbar = ({
  subNavbarData,
  hasExtraButton,
  ExtraButton,
  url,
}: ISubNavbar) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { expandMainDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const [selected, setMainMenuSelected] = React.useState("");
  // const handleMenuSelected = (name: string, e: any) => {
  //   setMainMenuSelected(name);
  // };

  return (
    <AppBar
      className={clsx(classes.appBar, {
        [classes.appBarShiftExpanded]: expandMainDrawer,
        [classes.appBarShiftCollapsed]: !expandMainDrawer,
      })}
    >
      <Toolbar className={classes.appbarToolBar} disableGutters>
        <ButtonGroup variant="text">
          {hasExtraButton && ExtraButton && <ExtraButton />}
          {(subNavbarData as ISubNavbarData).map((navbarData, i) => {
            const { name, route, icon } = navbarData;

            return (
              <Button
                key={name}
                className={classes.button}
                onClick={() => {
                  dispatch(subNavbarSetMenuAction(name));
                  dispatch(navigateResetWorkflowAction());
                  setMainMenuSelected(name);
                  history.push(route);
                }}
                startIcon={icon}
                endIcon={icon}
                style={
                  name === selected ? { color: theme.palette.primary.main } : {}
                }
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
