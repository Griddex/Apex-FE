import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";

const useStyles = makeStyles((theme) => ({
  rootSubContextTabs: {
    width: "100%",
    height: "auto",
    border: "1px solid #C4C4C4",
  },
  tabs: {
    backgroundColor: "#F7F7F7",
  },
  tab: {
    minWidth: 40,
    padding: 5,
    "&:hover": theme.palette.primary.main,
    textAlign: "left",
  },
  tabPanel: {
    height: "auto",
  },
}));

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

const ChartTabsWrapper = ({ chartItemsContent }) => {
  const classes = useStyles();

  const [
    currentSubContextTabValue,
    setCurrentSubContextTabValue,
  ] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentSubContextTabValue(newValue);
  };

  const { subContextTabs, subContextTabPanels } = chartItemsContent;

  return (
    <div className={classes.rootSubContextTabs}>
      <Tabs
        className={classes.tabs}
        value={currentSubContextTabValue}
        indicatorColor="primary"
        TabIndicatorProps={{ style: { width: "40px" } }}
        textColor="primary"
        onChange={handleTabChange}
        aria-label="Charts Contextual Tabs"
      >
        {subContextTabs &&
          subContextTabs.map((tab, i) => {
            return (
              <Tab
                key={i}
                className={classes.tab}
                icon={tab.icon()}
                onClick={() => setCurrentSubContextTabValue(i)}
              />
            );
          })}
      </Tabs>
      {subContextTabPanels &&
        subContextTabPanels.map((tabPanel, i) => {
          return (
            <TabPanel key={i} value={currentSubContextTabValue} index={i}>
              {tabPanel.component}
            </TabPanel>
          );
        })}
    </div>
  );
};

export default ChartTabsWrapper;
