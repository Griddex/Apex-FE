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
import history from "./../Services/HistoryService";
import { Link } from "react-router-dom";

const SubNavBar = React.memo(({ expandMainDrawer }) => {
  const classes = useSubNavBarStyles();

  const subNavbarItems = [
    {
      name: "Facilities Deck",
      route: "/valid/import/facilitiesdeck",
      icon: AppsIcon,
    },
    {
      name: "Forecast Deck",
      route: "/valid/import/forecastdeck",
      icon: LandscapeIcon,
    },
    {
      name: "Production Data",
      route: "/valid/import/productiondata",
      icon: BubbleChartIcon,
    },
    {
      name: "Economics Data",
      route: "/valid/import/economicsdata",
      icon: AttachMoneyIcon,
    },
  ];

  const menuText = (link) => {
    const menuLinkText = {
      "/valid/import/facilitiesdeck": "Facilities Deck",
      "/valid/import/forecastdeck": "Forecast Deck",
      "/valid/import/productiondata": "Production Data",
      "/valid/import/economicsdata": "Economics Data",
    };
    return menuLinkText[link];
  };

  return (
    <AppBar
      className={clsx({
        [classes.appBarShiftExpanded]: expandMainDrawer,
        [classes.appBarShiftCollapsed]: !expandMainDrawer,
      })}
    >
      <Toolbar className={classes.appbarToolBar} disableGutters>
        <ButtonGroup variant="text">
          {subNavbarItems.map((row, i) => (
            <Button
              key={i}
              // component={Link}
              onClick={() => history.replace(row.route)}
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
