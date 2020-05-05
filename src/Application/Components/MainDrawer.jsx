import {
  Divider,
  Drawer,
  Grid,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CompanyLogo from "../Images/CompanyLogo.svg";
import IconsService from "../Services/IconsService";
import useLayoutStyles from "./../Styles/LayoutStyles";
import history from "../Services/HistoryService";
import { Route, useLocation, useRouteMatch, useParams } from "react-router-dom";

const menuTitle = (link) => {
  const menuLinkTitle = {
    "/auth/import": "Import",
    "/auth/network": "Network",
    "/auth/visualization": "Visualizations",
    "/auth/settings": "Settings",
  };
  return menuLinkTitle[link];
};

const MainDrawer = React.memo(({ reduxProps, boundUILayoutActions }) => {
  const classes = useLayoutStyles(reduxProps);
  const { expandMainDrawer } = reduxProps;
  const { setMainDrawerMenuAction } = boundUILayoutActions;
  const [selected, setMainMenuSelected] = useState("");
  const match = useRouteMatch();
  const location = useLocation();
  const handleClick = (route, e) => {
    setMainMenuSelected(route);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.mainDrawer, {
        [classes.mainDrawerOpen]: expandMainDrawer,
        [classes.mainDrawerClose]: !expandMainDrawer,
      })}
      classes={{
        paper: clsx({
          [classes.mainDrawerOpen]: expandMainDrawer,
          [classes.mainDrawerClose]: !expandMainDrawer,
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
          {[
            "/auth/import",
            "/auth/network",
            "/auth/visualization",
            "/auth/settings",
          ].map((route) => (
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
                  setMainDrawerMenuAction(menuTitle(route));
                  history.push(route);
                }}
                disableGutters
              >
                {expandMainDrawer ? (
                  <div className={classes.menuItemDiv}>
                    <div>{IconsService(route, "large")}</div>
                    <Typography>{menuTitle(route)}</Typography>
                    <Divider />
                  </div>
                ) : (
                  <div>{IconsService(route, "default")}</div>
                )}
              </MenuItem>
            </Tooltip>
          ))}
        </Grid>
      </MenuList>
    </Drawer>
  );
});

MainDrawer.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
};

export default MainDrawer;
