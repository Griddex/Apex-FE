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

const menuText = (link) => {
  const menuLinkText = {
    "/auth/import": "Import",
    "/auth/network": "Network",
    "/auth/visualization": "Visualizations",
    "/auth/settings": "Settings",
  };
  return menuLinkText[link];
};

const MainDrawer = React.memo(({ reduxProps, boundUILayoutActions }) => {
  const classes = useLayoutStyles(reduxProps);
  const { openMainDrawer } = reduxProps;
  const { setMainDrawerMenuAction } = boundUILayoutActions;

  const handleClick = (text, e) => {
    setMainMenuSelected(text);
  };

  const [selected, setMainMenuSelected] = useState("");
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.mainDrawer, {
        [classes.mainDrawerOpen]: openMainDrawer,
        [classes.mainDrawerClose]: !openMainDrawer,
      })}
      classes={{
        paper: clsx({
          [classes.mainDrawerOpen]: openMainDrawer,
          [classes.mainDrawerClose]: !openMainDrawer,
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
          ].map((text) => (
            <Tooltip
              key={text}
              title={menuText(text)}
              placement="right"
              interactive
              arrow
            >
              <MenuItem
                className={
                  openMainDrawer
                    ? classes.menuItemBoxOpen
                    : classes.menuItemBoxClosed
                }
                component={Link}
                to={text}
                selected={text === selected}
                onClick={(e) => {
                  handleClick(text, e);
                  setMainDrawerMenuAction(menuText(text));
                }}
                disableGutters
              >
                {openMainDrawer ? (
                  <div className={classes.menuItemDiv}>
                    <div>{IconsService(text, "large")}</div>
                    <Typography>{menuText(text)}</Typography>
                    <Divider />
                  </div>
                ) : (
                  <div>{IconsService(text, "default")}</div>
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
