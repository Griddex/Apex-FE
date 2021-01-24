import {
  Drawer,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import BarChartIcon from "@material-ui/icons/BarChart";
import BusinessOutlinedIcon from "@material-ui/icons/BusinessOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LocalAtmOutlinedIcon from "@material-ui/icons/LocalAtmOutlined";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import TimelineIcon from "@material-ui/icons/Timeline";
import TuneIcon from "@material-ui/icons/Tune";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import CompanyLogo from "../../Images/CompanyLogo.svg";
import { mainDrawerSetMenuAction } from "../../Redux/Actions/ApplicationActions";
import { RootState } from "../../Redux/Reducers/AllReducers";
import history from "../../Services/HistoryService";
import ProjectContextMenu from "../../../Project/Components/ContextMenus/ProjectContextMenu";
import { IMainDrawerData } from "./MainDrawerTypes";

const navbarHeight = 43;
const useStyles = makeStyles((theme) => ({
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
  menuItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid #F8F8F8",
  },
  menuItemBoxOpen: {
    width: "100px",
    minWidth: "100px",
  },
  menuItemBoxClosed: {
    width: "40px",
    minWidth: "40px",
  },
  menuItemDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
  },
}));

const MainDrawer = () => {
  const dispatch = useDispatch();
  const layoutProps = useSelector((state: RootState) => state.layoutReducer);
  const classes = useStyles(layoutProps);
  const { expandMainDrawer, menusDisabled } = layoutProps;

  const [selected, setMainMenuSelected] = useState("");
  const { url } = useRouteMatch();
  const theme = useTheme();

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
      name: "Network",
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
      name: "DCA",
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
      name: "Admin",
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
                className={clsx(
                  classes.menuItem,
                  expandMainDrawer
                    ? classes.menuItemBoxOpen
                    : classes.menuItemBoxClosed
                )}
                component={Link}
                to={route}
                selected={name === selected}
                onClick={(e: any) => {
                  handleClick(name, e);
                  dispatch(mainDrawerSetMenuAction(name));
                  history.push(route);
                }}
                disabled={name === "Project" ? false : menusDisabled}
                style={
                  name === selected
                    ? { borderLeft: `2px solid ${theme.palette.primary.main}` }
                    : {}
                }
                disableGutters
              >
                {name === "Project" ? (
                  <ProjectContextMenu setOpenTooltip={setOpenTooltip}>
                    <div className={classes.menuItemDiv}>
                      <div>{icon}</div>
                      {expandMainDrawer && (
                        <Typography variant="caption">{name}</Typography>
                      )}
                    </div>
                  </ProjectContextMenu>
                ) : (
                  <div className={classes.menuItemDiv}>
                    <div>{icon}</div>
                    {expandMainDrawer && (
                      <Typography variant="caption">{name}</Typography>
                    )}
                  </div>
                )}
              </MenuItem>
            </Tooltip>
          );
        })}
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