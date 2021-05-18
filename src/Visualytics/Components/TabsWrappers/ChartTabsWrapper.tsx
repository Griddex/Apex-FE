import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { ChangeEvent } from "react";
import { chartObjNameType } from "../../Redux/ChartState/ChartStateTypes";
import { IChartObjContent } from "../FormatAggregators/FormatAggregatorTypes";
import { IChartTabPanel, ISubContextTabData } from "./ChartTabsWrapperTypes";

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

const TabPanel = ({ children, value, index, ...other }: IChartTabPanel) => {
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

const ChartTabsWrapper = ({
  chartObjsContent,
  chartObjName,
}: {
  chartObjsContent: IChartObjContent;
  chartObjName: chartObjNameType;
}) => {
  const classes = useStyles();
  //   const nonNullableContent = chartObjsContent[chartObjName] as NonNullable<
  //   typeof content
  // >;
  const [currentSubContextTabValue, setCurrentSubContextTabValue] =
    React.useState(0);

  const handleTabChange = (event: ChangeEvent<any>, newValue: number) => {
    setCurrentSubContextTabValue(newValue);
  };

  const { chartLayout } = chartObjsContent;
  const { subContextTabs, subContextTabPanels } = chartLayout as NonNullable<
    IChartObjContent["chartLayout"]
  >;

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
          (subContextTabs as ISubContextTabData[]).map((tab, i) => {
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
              {tabPanel.component()}
            </TabPanel>
          );
        })}
    </div>
  );
};

export default ChartTabsWrapper;
