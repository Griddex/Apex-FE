import { Button, ButtonGroup, Toolbar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppsIcon from "@material-ui/icons/Apps";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import LandscapeIcon from "@material-ui/icons/Landscape";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "../Services/HistoryService";
import { navigateResetWorkflowAction } from "./../Redux/Actions/LayoutActions";

const mainDrawerExpanded = 96;
const mainDrawerWidthCollapsed = 40;
const subNavBarHeight = 25;

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#EEEEEE",
    marginTop: "42.77px",
    height: subNavBarHeight,
    zIndex: theme.zIndex.appBar - 1,
  },
  appBarShiftCollapsed: {
    marginLeft: `${mainDrawerWidthCollapsed}px`,
    width: `calc(100% - ${mainDrawerWidthCollapsed}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  marginLeft: `${mainDrawerExpanded}px`,
  appBarShiftExpanded: {
    width: `calc(100% - ${mainDrawerExpanded}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appbarToolBar: {
    height: "100%",
    minHeight: "100%",
  },
  button: {
    height: subNavBarHeight,
    padding: "0px 10px",
    width: "auto",
    textTransform: "none",
    margin: theme.spacing(0),
  },
}));

const SubNavbar = () => {
  const classes = useStyles();
  const { expandMainDrawer } = useSelector((state) => state.layoutReducer);
  const dispatch = useDispatch();

  const subNavbarItems = [
    {
      name: "Facilities Deck",
      route: "/apex/import/facilitiesdeck",
      icon: AppsIcon,
    },
    {
      name: "Forecast Deck",
      route: "/apex/import/forecastdeck",
      icon: LandscapeIcon,
    },
    {
      name: "Production Data",
      route: "/apex/import/productiondata",
      icon: BubbleChartIcon,
    },
    {
      name: "Economics Data",
      route: "/apex/import/economicsdata",
      icon: AttachMoneyIcon,
    },
  ];

  const subNavbarIcons = {
    "/apex/import/facilitiesdeck": <AppsIcon fontSize="default" />,
    "/apex/import/forecastdeck": <LandscapeIcon fontSize="default" />,
    "/apex/import/productiondata": <BubbleChartIcon fontSize="default" />,
    "/apex/import/economicsdata": <AttachMoneyIcon fontSize="default" />,
  };

  const menuText = (link) => {
    const menuLinkText = {
      "/apex/import/facilitiesdeck": "Facilities Deck",
      "/apex/import/forecastdeck": "Forecast Deck",
      "/apex/import/productiondata": "Production Data",
      "/apex/import/economicsdata": "Economics Data",
    };

    return menuLinkText[link];
  };

  return (
    <AppBar
      className={clsx(classes.appBar, {
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
              className={classes.button}
              onClick={() => {
                dispatch(navigateResetWorkflowAction());
                history.push(row.route);
              }}
              endIcon={subNavbarIcons[row.route]}
            >
              <Typography variant="subtitle2">{row.name}</Typography>
            </Button>
          ))}
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

SubNavbar.propTypes = {};

export default React.memo(SubNavbar);
