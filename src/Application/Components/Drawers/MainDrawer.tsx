import {
  Badge,
  BadgeProps,
  Drawer,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import TimelineIcon from "@mui/icons-material/Timeline";
import TuneIcon from "@mui/icons-material/Tune";
import clsx from "clsx";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { loadForecastResultsWorkflowAction } from "../../../Forecast/Redux/Actions/ForecastActions";
import { updateNetworkParameterAction } from "../../../Network/Redux/Actions/NetworkActions";
import ProjectContextMenu from "../../../Project/Components/ContextMenus/ProjectContextMenu";
import { loadVisualyticsWorkflowAction } from "../../../Visualytics/Redux/Actions/VisualyticsActions";
import ApexLogo from "../../Images/ApexLogo.svg";
import { mainDrawerSetMenuAction } from "../../Redux/Actions/ApplicationActions";
import { RootState } from "../../Redux/Reducers/AllReducers";
import CustomTooltip from "../Tooltips/CustomTooltip";
import { IMainDrawerData } from "./MainDrawerTypes";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

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
    overflow: "hidden",
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

const expandMainDrawerSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.expandMainDrawer,
  (props) => props
);
const menusDisabledSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.menusDisabled,
  (props) => props
);

const MainDrawer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();

  const [open, setOpen] = React.useState(false);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const expandMainDrawer = useSelector(expandMainDrawerSelector);
  const menusDisabled = useSelector(menusDisabledSelector);

  const classes = useStyles({ expandMainDrawer, menusDisabled });

  const [moduleName, setModuleName] = useState("");
  const handleModuleName = (route: string) => {
    setModuleName(route);
  };

  //Can replace with dynamically loaded json config file
  //generated from license token

  const mainDrawerData: IMainDrawerData[] = [
    {
      name: "Project",
      route: `${url}/project`,
      icon: (
        <AccountBalanceWalletOutlinedIcon
          fontSize={expandMainDrawer ? "large" : "medium"}
        />
      ),
    },
    {
      name: "Import",
      route: `${url}/import`,
      icon: <ExitToAppIcon fontSize={expandMainDrawer ? "large" : "medium"} />,
    },
    {
      name: "Network",
      route: `${url}/network`,
      icon: (
        <AccountTreeIcon fontSize={expandMainDrawer ? "large" : "medium"} />
      ),
    },
    {
      name: "Business Forecast",
      route: `${url}/forecast`,
      icon: (
        <InsertPhotoOutlinedIcon
          fontSize={expandMainDrawer ? "large" : "medium"}
        />
      ),
    },
    {
      name: "Visualytics",
      route: `${url}/visualytics`,
      icon: <BarChartIcon fontSize={expandMainDrawer ? "large" : "medium"} />,
    },
    {
      name: "Economics",
      route: `${url}/economics`,
      icon: (
        <LocalAtmOutlinedIcon
          fontSize={expandMainDrawer ? "large" : "medium"}
        />
      ),
    },
    {
      name: "DCA",
      route: `${url}/declineCurveAnalysis`,
      icon: <TimelineIcon fontSize={expandMainDrawer ? "large" : "medium"} />,
    },
    // {
    //   name: "Corporate",
    //   route: `${url}/corporate`,
    //   icon: (
    //     <BusinessOutlinedIcon
    //       fontSize={expandMainDrawer ? "large" : "medium"}
    //     />
    //   ),
    // },
    {
      name: "Admin",
      route: `${url}/administration`,
      icon: (
        <SupervisorAccountOutlinedIcon
          fontSize={expandMainDrawer ? "large" : "medium"}
        />
      ),
    },
    {
      name: "Settings",
      route: `${url}/settings`,
      icon: <TuneIcon fontSize={expandMainDrawer ? "large" : "medium"} />,
    },
  ];

  const getBadgeProps = React.useCallback((name: string) => {
    return {
      color: "secondary",
      ...(name === "DCA" && { badgeContent: "", variant: "dot" }),
    } as BadgeProps;
  }, []);

  React.useEffect(() => {
    if (open === false && moduleName === "Project") setModuleName("");
  }, [open]);

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
        <img src={ApexLogo} alt="Company logo" height={24} width={24} />
      </div>
      <MenuList>
        {mainDrawerData.map((drawerData) => {
          const { name, route, icon } = drawerData;

          return (
            <Tooltip
              key={name}
              title={
                name === "DCA" ? (
                  <CustomTooltip
                    firstWord={name}
                    secondWord="(Coming Soon)"
                    secondWordStyle={{
                      color: theme.palette.secondary.main,
                      fontWeight: "bold",
                    }}
                  />
                ) : (
                  name
                )
              }
              placement="right"
              arrow
              leaveTouchDelay={0}
            >
              <MenuItem
                className={clsx(
                  classes.menuItem,
                  expandMainDrawer
                    ? classes.menuItemBoxOpen
                    : classes.menuItemBoxClosed
                )}
                selected={name === moduleName}
                onClick={(e: any) => {
                  handleModuleName(name);
                  dispatch(mainDrawerSetMenuAction(name));

                  if (name === "Business Forecast") {
                    dispatch(
                      loadForecastResultsWorkflowAction(
                        "loadForecastResultsWorkflow",
                        false
                      )
                    );
                  } else if (name === "Network") {
                    dispatch(
                      updateNetworkParameterAction(
                        "loadNetworkGenerationWorkflow",
                        false
                      )
                    );
                  } else if (name === "Visualytics") {
                    dispatch(
                      loadVisualyticsWorkflowAction(
                        "loadVisualyticsWorkflow",
                        false
                      )
                    );
                  }

                  if (name !== "Project") history.push(route);
                  else return null;
                }}
                disabled={name === "Project" ? false : menusDisabled}
                style={
                  name === moduleName
                    ? {
                        color: theme.palette.primary.dark,
                        backgroundColor: theme.palette.primary.light,
                      }
                    : {}
                }
                disableGutters
              >
                {name === "Project" ? (
                  <ProjectContextMenu
                    open={open}
                    setOpen={React.useCallback(setOpen, [])}
                    handleClose={handleClose}
                  >
                    <div className={classes.menuItemDiv}>
                      <div
                        style={
                          name === moduleName
                            ? { color: theme.palette.primary.dark }
                            : {}
                        }
                      >
                        <Badge {...getBadgeProps(name)}>{icon}</Badge>
                      </div>
                      {expandMainDrawer && (
                        <Typography
                          style={
                            name === moduleName
                              ? { color: theme.palette.primary.dark }
                              : {}
                          }
                          variant="caption"
                        >
                          {name}
                        </Typography>
                      )}
                    </div>
                  </ProjectContextMenu>
                ) : (
                  <div className={classes.menuItemDiv}>
                    <div>
                      <Badge {...getBadgeProps(name)}>{icon}</Badge>
                    </div>
                    {expandMainDrawer && (
                      <Typography
                        style={
                          name === moduleName
                            ? {
                                color: theme.palette.primary.dark,
                                width: 80,
                                whiteSpace: "pre-wrap",
                              }
                            : { width: 80, whiteSpace: "pre-wrap" }
                        }
                        variant="caption"
                      >
                        {name}
                      </Typography>
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

export default React.memo(MainDrawer);
