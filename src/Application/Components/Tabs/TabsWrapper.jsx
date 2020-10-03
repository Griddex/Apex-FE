import { makeStyles, fade } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Visualytics from "../../../Visualytics/Common/Visualytics";
import { setCurrentMainTabValueAction } from "./../../Redux/Actions/ApplicationActions";

const useStyles = makeStyles((theme) => ({
  rootTabs: {
    width: "90%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #A8A8A8",
    boxShadow: `${fade("#A8A8A8", 0.25)} 0 0 0 2px`,
  },
  tabs: {
    minHeight: 0,
    backgroundColor: "#F7F7F7",
  },
  tab: {
    minHeight: "3%",
    fontSize: 12,
    fontWeight: "bold",
    padding: 0,
    // textTransform: "none",
    textAlign: "left",
  },
  tabPanel: {
    height: "97%",
    // display: "flex",
    // flexGrow: 1,
  },
}));

const tabPanels = {
  visualytics: <Visualytics />,
};

const TabPanel = ({ children, value, index, ...other }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.tabPanel}
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

const TabsWrapper = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const [currentMainTabValue, setTabValue] = React.useState(0);
  // const handleTabChange = (event, newValue) => {
  //   setTabValue(newValue);
  // };

  const {
    newTabs,
    newTabPanels,
    workflowName,
    currentMainTabValue,
  } = useSelector((state) => state.applicationReducer);

  return (
    <div className={classes.rootTabs}>
      <TabPanel value={currentMainTabValue} index={0}>
        {children}
      </TabPanel>
      {newTabPanels &&
        newTabPanels.map((tabPanel, i) => {
          if (!newTabs[i].displayed)
            return (
              <TabPanel key={i} value={currentMainTabValue} index={i + 1}>
                {tabPanels[tabPanel]}
              </TabPanel>
            );
        })}
      <Tabs
        className={classes.tabs}
        value={currentMainTabValue}
        indicatorColor="primary"
        TabIndicatorProps={{ style: { width: "150px" } }}
        textColor="primary"
        onChange={() =>
          dispatch(setCurrentMainTabValueAction(currentMainTabValue))
        }
        aria-label="disabled tabs example"
      >
        <Tab
          className={classes.tab}
          label={workflowName}
          onClick={() => dispatch(setCurrentMainTabValueAction(0))}
        />
        {newTabs &&
          newTabs.map((tab, i) => {
            if (!tab.displayed)
              return (
                <Tab
                  key={i}
                  className={classes.tab}
                  label={tab.label}
                  onClick={() => dispatch(setCurrentMainTabValueAction(i + 1))}
                />
              );
          })}
      </Tabs>
    </div>
  );
};

export default TabsWrapper;
