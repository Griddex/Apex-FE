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
import { Link, useRouteMatch } from "react-router-dom";
import CompanyLogo from "../../Images/CompanyLogo.svg";
import { mainDrawerSetMenuAction } from "../../Redux/Actions/ApplicationActions";
import history from "../../Services/HistoryService";
import { makeStyles } from "@material-ui/core/styles";
import TimelineIcon from "@material-ui/icons/Timeline";
import BusinessOutlinedIcon from "@material-ui/icons/BusinessOutlined";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import LocalAtmOutlinedIcon from "@material-ui/icons/LocalAtmOutlined";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import { RootState } from "../../Redux/Reducers/RootReducer";
import ProjectContextMenu from "../ContextMenus/ProjectContextMenu";

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

const MainDrawer = () => {
  const dispatch = useDispatch();
  const layoutProps = useSelector((state: RootState) => state.layoutReducer);
  const classes = useStyles(layoutProps);
  const { expandMainDrawer } = layoutProps;

  const [selected, setMainMenuSelected] = useState("");
  const { url } = useRouteMatch();

  const handleClick = (route: string, e: any) => {
    setMainMenuSelected(route);
    console.log(e);
  };

  const [openTooltip, setOpenTooltip] = useState(false);
  const handleTooltipClose = () => {
    console.log("close");
    setOpenTooltip(false);
  };

  const handleTooltipOpen = () => {
    console.log("open");
    setOpenTooltip(true);
  };

  //Can replace with dynamically loaded json config file
  //generated from license token
  interface IMainDrawerData {
    name: string;
    route: string;
    icon: JSX.Element;
  }

  const mainDrawerData: IMainDrawerData[] = [
    {
      name: "Project",
      route: `${url}/project`,
      icon: (
        <AccountBalanceWalletOutlinedIcon
          fontSize={expandMainDrawer ? "large" : "default"}
        />
      ),
    },
    {
      name: "Import",
      route: `${url}/import`,
      icon: <ExitToAppIcon fontSize={expandMainDrawer ? "large" : "default"} />,
    },
    {
      name: "network",
      route: `${url}/network`,
      icon: (
        <AccountTreeIcon fontSize={expandMainDrawer ? "large" : "default"} />
      ),
    },
    {
      name: "Visualytics",
      route: `${url}/visualytics`,
      icon: <BarChartIcon fontSize={expandMainDrawer ? "large" : "default"} />,
    },
    {
      name: "Economics",
      route: `${url}/economics`,
      icon: (
        <LocalAtmOutlinedIcon
          fontSize={expandMainDrawer ? "large" : "default"}
        />
      ),
    },
    {
      name: "DeclineCurveAnalysis",
      route: `${url}/declineCurveAnalysis`,
      icon: <TimelineIcon fontSize={expandMainDrawer ? "large" : "default"} />,
    },
    {
      name: "Corporate",
      route: `${url}/corporate`,
      icon: (
        <BusinessOutlinedIcon
          fontSize={expandMainDrawer ? "large" : "default"}
        />
      ),
    },
    {
      name: "Administration",
      route: `${url}/administration`,
      icon: (
        <SupervisorAccountOutlinedIcon
          fontSize={expandMainDrawer ? "large" : "default"}
        />
      ),
    },
    {
      name: "Settings",
      route: `${url}/settings`,
      icon: <TuneIcon fontSize={expandMainDrawer ? "large" : "default"} />,
    },
  ];

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
        <img src={CompanyLogo} alt="Company logo" height={24} width={24} />
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
          {mainDrawerData.map((drawerData) => {
            const { name, route, icon } = drawerData;

            return (
              <Tooltip
                key={name}
                title={name}
                placement="right"
                // interactive
                // open={openTooltip}
                // onClose={handleTooltipClose}
                // onOpen={handleTooltipOpen}
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
                  selected={name === selected}
                  onClick={(e: any) => {
                    handleClick(name, e);
                    dispatch(mainDrawerSetMenuAction(name));
                    history.push(route);
                  }}
                  disableGutters
                >
                  {name === "Project" ? (
                    <ProjectContextMenu setOpenTooltip={setOpenTooltip}>
                      <div className={classes.menuItemDiv}>
                        <div>{icon}</div>
                        {expandMainDrawer && <Typography>{name}</Typography>}
                        <Divider />
                      </div>
                    </ProjectContextMenu>
                  ) : (
                    <div className={classes.menuItemDiv}>
                      <div>{icon}</div>
                      {expandMainDrawer && <Typography>{name}</Typography>}
                      <Divider />
                    </div>
                  )}
                </MenuItem>
              </Tooltip>
            );
          })}
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
