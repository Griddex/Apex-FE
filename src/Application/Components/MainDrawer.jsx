import {
  Divider,
  Drawer,
  Grid,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import BarChartIcon from "@material-ui/icons/BarChart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TuneIcon from "@material-ui/icons/Tune";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CompanyLogo from "../Images/CompanyLogo.svg";
import { mainDrawerSetMenuAction } from "../Redux/Actions/LayoutActions";
import history from "../Services/HistoryService";
import { makeStyles } from "@material-ui/core/styles";

const navbarHeight = 43;
const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      height: "100%",
      width: "100%",
    },
    mainDrawer: {
      width: 40,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    expandMainDrawer: {
      width: theme.spacing(12),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    collapseMainDrawer: {
      width: theme.spacing(5),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
    },
    companyLogoToolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: navbarHeight,
    },
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
  };
});

const menuTitle = (link) => {
  const menuLinkTitle = {
    "/apex/import": "Import",
    "/apex/network": "Network",
    "/apex/visualization": "Visualizations",
    "/apex/settings": "Settings",
  };
  return menuLinkTitle[link];
};

const MainDrawer = () => {
  const dispatch = useDispatch();
  const layoutProps = useSelector((state) => state.layoutReducer);
  const classes = useStyles(layoutProps);
  const { expandMainDrawer } = layoutProps;

  const [selected, setMainMenuSelected] = useState("");

  const handleClick = (route, e) => {
    setMainMenuSelected(route);
  };

  const routes = [
    "/apex/import",
    "/apex/network",
    "/apex/visualization",
    "/apex/settings",
  ];

  const mainDrawerIcons = {
    "/apex/import": (
      <ExitToAppIcon fontSize={expandMainDrawer ? "large" : "default"} />
    ),
    "/apex/network": (
      <AccountTreeIcon fontSize={expandMainDrawer ? "large" : "default"} />
    ),
    "/apex/visualization": (
      <BarChartIcon fontSize={expandMainDrawer ? "large" : "default"} />
    ),
    "/apex/settings": (
      <TuneIcon fontSize={expandMainDrawer ? "large" : "default"} />
    ),
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.mainDrawer, {
        [classes.expandMainDrawer]: expandMainDrawer,
        [classes.collapseMainDrawer]: !expandMainDrawer,
      })}
      classes={{
        paper: clsx({
          [classes.expandMainDrawer]: expandMainDrawer,
          [classes.collapseMainDrawer]: !expandMainDrawer,
        }),
      }}
    >
      <div className={classes.companyLogoToolbar}>
        <img src={CompanyLogo} height={24} width={24} />
      </div>
      <MenuList>
        <Grid
          container
          className={classes.root}
          spacing={0}
          direction="column"
          justify="center"
          alignItems="center"
        >
          {routes.map((route) => (
            <Tooltip
              key={route}
              title={menuTitle(route)}
              placement="right"
              // interactive
              arrow
            >
              <MenuItem
                className={
                  expandMainDrawer
                    ? classes.menuItemBoxOpen
                    : classes.menuItemBoxClosed
                }
                component={Link}
                to={route}
                selected={route === selected}
                onClick={(e) => {
                  handleClick(route, e);
                  dispatch(mainDrawerSetMenuAction(menuTitle(route)));
                  history.push(route);
                }}
                disableGutters
              >
                <div className={classes.menuItemDiv}>
                  <div>{mainDrawerIcons[route]}</div>
                  {expandMainDrawer && (
                    <Typography>{menuTitle(route)}</Typography>
                  )}
                  <Divider />
                </div>
              </MenuItem>
            </Tooltip>
          ))}
        </Grid>
      </MenuList>
    </Drawer>
  );
};

MainDrawer.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
};

export default React.memo(MainDrawer);
