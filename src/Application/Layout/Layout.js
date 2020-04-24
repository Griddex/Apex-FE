import React, { useState } from "react";
import clsx from "clsx";
import faker from "faker";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MenuList from "@material-ui/core/MenuList";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link } from "react-router-dom";
import history from "../Services/HistoryService";
import GetInitials from "./../Utils/GetInitials";
import IconsService from "./../Services/IconsService";
import { useLayoutStyles } from "../Styles/LayoutStyles";
import { useSubNavBarStyles } from "./../Styles/SubNavbarStyles";
import SubNavBar from "./../Components/SubNavBar";
import CompanyLogo from "../Images/CompanyLogo.svg";
import ImportlandingFacilities from "../../Import/Routes/ImportlandingFacilities";

const Layout = (props) => {
  const theme = useTheme();
  const classes = useLayoutStyles();
  const classesSubnavbar = useSubNavBarStyles();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (text, e) => {
    setSelected(text);
  };

  const menuText = (link) => {
    const menuLinkText = {
      "/import": "Import",
      "/network": "Network",
      "/visualization": "Visualizations",
      "/settings": "Settings",
    };
    return menuLinkText[link];
  };

  const username = faker.name.findName();
  const userinitials = GetInitials(username);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.appbarToolBar}>
          {!open ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="close drawer"
              onClick={handleDrawerClose}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: !open,
              })}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}

          <Box className={classes.userToolBar}>
            <Badge
              className={classes.userBadge}
              badgeContent={400}
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
            <Avatar
              className={classes.smallAvatar}
              alt={username}
              src={faker.internet.avatar()}
              variant="rounded"
            >
              {userinitials}
            </Avatar>
            <Typography
              className={classes.userTypography}
              variant="subtitle1"
              color="inherit"
            >
              {username}
            </Typography>
            <ExpandMoreIcon className={classes.userExpandMoreIcon} />
            <Button
              className={classes.userLogout}
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => {
                sessionStorage.clear();
                history.replace("/login");
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
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
            {["/import", "/network", "/visualization", "/settings"].map(
              (text) => (
                <Tooltip
                  key={text}
                  title={menuText(text)}
                  placement="right"
                  interactive
                  arrow
                >
                  <MenuItem
                    className={
                      open ? classes.menuItemBoxOpen : classes.menuItemBoxClosed
                    }
                    component={Link}
                    to={text}
                    selected={text === selected}
                    onClick={(e) => handleClick(text, e)}
                    disableGutters
                  >
                    {open ? (
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
              )
            )}
          </Grid>
        </MenuList>
      </Drawer>
      <main className={classes.content}>
        <SubNavBar
          className={clsx({
            [classesSubnavbar.appBarShiftExpanded]: open,
            [classesSubnavbar.appBarShiftCollapsed]: !open,
          })}
        />
        <Grid
          justify="center"
          alignItems="center"
          className={classes.importLandingFacilities}
          container
        >
          <ImportlandingFacilities />
        </Grid>
      </main>
    </div>
  );
};

export default Layout;
