import {
  Badge,
  BadgeProps,
  Button,
  ButtonGroup,
  Toolbar,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  ISubNavbar,
  ISubNavbarData,
} from "../../../Import/Routes/Common/Workflows/InputWorkflowsTypes";
import { subNavbarSetMenuAction } from "../../Redux/Actions/ApplicationActions";
import { navigateResetWorkflowAction } from "../../Redux/Actions/LayoutActions";
import { RootState } from "../../Redux/Reducers/AllReducers";

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

const SubNavbar = ({ subNavbarData }: ISubNavbar) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  const { expandMainDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const [selected, setMainMenuSelected] = React.useState("");

  const getBadgeProps = (name: string) => {
    return {
      color: "secondary",
      // ...(name === "Production Data" && { badgeContent: "", variant: "dot" }),
      ...(name === "Production Data" && { badgeContent: "" }),
      ...(name === "Production Data" && { variant: "dot" }),
    } as BadgeProps;
  };

  return (
    <AppBar
      className={clsx(classes.appBar, {
        [classes.appBarShiftExpanded]: expandMainDrawer,
        [classes.appBarShiftCollapsed]: !expandMainDrawer,
      })}
    >
      <Toolbar className={classes.appbarToolBar} disableGutters>
        <ButtonGroup variant="text">
          {(subNavbarData as ISubNavbarData).map((navbarData, i) => {
            const {
              name,
              route,
              startIcon,
              hasWrapper,
              action,
              component: Component,
            } = navbarData;

            const badgeProps = getBadgeProps(name);

            if (hasWrapper) {
              return (
                <Badge key={i} {...badgeProps}>
                  <Component />
                </Badge>
              );
            } else {
              return (
                <Button
                  key={i}
                  className={classes.button}
                  onClick={() => {
                    dispatch(subNavbarSetMenuAction(name));
                    dispatch(navigateResetWorkflowAction());
                    setMainMenuSelected(name);
                    action && action();
                    history.push(route);
                  }}
                  startIcon={startIcon}
                  style={
                    name === selected
                      ? {
                          color: theme.palette.primary.dark,
                          backgroundColor: theme.palette.primary.light,
                        }
                      : {}
                  }
                >
                  <Badge {...badgeProps}>
                    <Typography variant="subtitle2">{name}</Typography>
                  </Badge>
                </Button>
              );
            }
          })}
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(SubNavbar);
