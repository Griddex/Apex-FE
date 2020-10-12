import { Drawer } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import {
  contextDrawerCollapseAction,
  contextDrawerExpandAction,
} from "../../Redux/Actions/LayoutActions";

const navbarHeight = 43;

const useStyles = makeStyles((theme) => {
  return {
    hide: {
      display: "none",
    },
    contextDrawer: {
      display: "flex",
      flexShrink: 0,
      whiteSpace: "nowrap",
      "&.MuiDrawer-paper": {
        marginTop: navbarHeight,
        height: `calc(100% - ${navbarHeight}px)`,
      },
      padding: 5,
    },
    expandContextDrawer: {
      width: theme.spacing(40),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    collapseContextDrawer: {
      width: theme.spacing(5),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
    },
    contextDrawerMenuIcon: {
      margin: 0,
    },
    contextDrawerHeader: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: "1px solid #C4C4C4",
      "& > *": { fontSize: 14 },
      "& p:first-child": {
        textTransform: "uppercase",
        color: theme.palette.primary.main,
      },
      "& p:nth-child(2)": {
        textTransform: "capitalize",
      },
      "& p:nth-child(3)": {
        textTransform: "capitalize",
        fontWeight: "bold",
      },
    },
    contextDrawerContent: {
      marginTop: 20,
    },
  };
});

const ContextDrawer = ({ children, data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const workflowData = useSelector((state) => state.applicationReducer);
  const { moduleName, subModuleName, workflowName } = workflowData;
  const { expandContextDrawer } = useSelector((state) => state.layoutReducer);

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      className={clsx(classes.contextDrawer, {
        [classes.expandContextDrawer]: expandContextDrawer,
        [classes.collapseContextDrawer]: !expandContextDrawer,
      })}
      classes={{
        paper: clsx(classes.contextDrawer, {
          [classes.expandContextDrawer]: expandContextDrawer,
          [classes.collapseContextDrawer]: !expandContextDrawer,
        }),
      }}
    >
      {expandContextDrawer ? (
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={() => dispatch(contextDrawerCollapseAction())}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: !expandContextDrawer,
          })}
        >
          <ChevronRightIcon />
        </IconButton>
      ) : (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(contextDrawerExpandAction())}
          edge="start"
          className={clsx(classes.contextDrawerMenuIcon, {
            [classes.hide]: expandContextDrawer,
          })}
        >
          <MenuIcon />
        </IconButton>
      )}
      <div className={classes.contextDrawerHeader}>
        <Typography>{moduleName}</Typography>
        <Typography>{subModuleName}</Typography>
        <Typography>{workflowName}</Typography>
      </div>
      <div className={classes.contextDrawerContent}>{children(data)}</div>
    </Drawer>
  );
};

export default React.memo(ContextDrawer);
