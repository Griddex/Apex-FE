import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import AppsIcon from "@material-ui/icons/Apps";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import LandscapeIcon from "@material-ui/icons/Landscape";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useSubNavBarStyles } from "./../Styles/SubNavbarStyles";
import IconsService from "./../Services/IconsService";
import { Toolbar, ButtonGroup, Button } from "@material-ui/core";

const SubNavBar = React.memo(({ openMainDrawer }) => {
  const classes = useSubNavBarStyles();

  const subNavbarItems = {
    Import: [
      {
        name: "Facilities Deck",
        route: "/auth/import/facilitiesdeck",
        icon: AppsIcon,
      },
      {
        name: "Forecast Deck",
        route: "/auth/import/forecastdeck",
        icon: LandscapeIcon,
      },
      {
        name: "Production Data",
        route: "/auth/import/productiondata",
        icon: BubbleChartIcon,
      },
      {
        name: "Economics Data",
        route: "/auth/import/economicsdata",
        icon: AttachMoneyIcon,
      },
    ],
  };
  const menuText = (link) => {
    const menuLinkText = {
      "/auth/import/facilitiesdeck": "Facilities Deck",
      "/auth/import/forecastdeck": "Forecast Deck",
      "/auth/import/productiondata": "Production Data",
      "/auth/import/economicsdata": "Economics Data",
    };
    return menuLinkText[link];
  };

  const handleToggle = () => {};

  return (
    <AppBar
      className={clsx({
        [classes.appBarShiftExpanded]: openMainDrawer,
        [classes.appBarShiftCollapsed]: !openMainDrawer,
      })}
    >
      <Toolbar className={classes.appbarToolBar} disableGutters>
        <ButtonGroup variant="text">
          {subNavbarItems["Import"].map((row, i) => (
            <Button
              key={i}
              onClick={handleToggle}
              className={classes.button}
              endIcon={IconsService(row.route)}
            >
              <Typography variant="subtitle2">{row.name}</Typography>
            </Button>
          ))}
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
});

SubNavBar.propTypes = {};

export default SubNavBar;
