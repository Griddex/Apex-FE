import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import AppsIcon from "@material-ui/icons/Apps";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import LandscapeIcon from "@material-ui/icons/Landscape";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useSubNavBarStyles } from "./../Styles/SubNavbarStyles";
import IconsService from "./../Services/IconsService";
import { Toolbar, ButtonGroup, Button } from "@material-ui/core";

const SubNavBar = (props) => {
  const { className } = props;
  const classes = useSubNavBarStyles();

  const subNavbarItems = {
    Import: [
      { name: "Facilities Deck", route: "/facilitiesdeck", icon: AppsIcon },
      { name: "Forecast Deck", route: "/forecastdeck", icon: LandscapeIcon },
      {
        name: "Production Data",
        route: "/productiondata",
        icon: BubbleChartIcon,
      },
      {
        name: "Economics Data",
        route: "/economicsdata",
        icon: AttachMoneyIcon,
      },
    ],
  };
  const menuText = (link) => {
    const menuLinkText = {
      "/facilitiesdeck": "Facilities Deck",
      "/forecastdeck": "Forecast Deck",
      "/productiondata": "Production Data",
      "/economicsdata": "Economics Data",
    };
    return menuLinkText[link];
  };

  const handleToggle = () => {};

  return (
    <AppBar className={className}>
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
};

SubNavBar.propTypes = {};

export default SubNavBar;
