import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import LocalAtmSharpIcon from "@material-ui/icons/LocalAtmSharp";
import React from "react";
import ApexPanel from "../Components/ApexPanel";
import IRR from "./EconomicsIRR/IRR";
import NCF from "./EconomicsNCF/NCF";
import NPV from "./EconomicsNPV/NPV";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
    "& > *": {
      margin: 20,
    },
  },
}));

export default function EconomicsCalculations() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab
          icon={<LocalAtmSharpIcon />}
          label="Net Cash Flow (NCF)"
          {...a11yProps(0)}
        />
        <Tab
          icon={<LocalAtmSharpIcon />}
          label="Net Present Value (NPV)"
          {...a11yProps(1)}
        />
        <Tab
          icon={<LocalAtmSharpIcon />}
          label="Internal Rate of Return (IRR)"
          {...a11yProps(2)}
        />
      </Tabs>
      <ApexPanel className={classes.tabPanel} value={value} index={0}>
        <NCF />
      </ApexPanel>
      <ApexPanel className={classes.tabPanel} value={value} index={1}>
        <NPV />
      </ApexPanel>
      <ApexPanel className={classes.tabPanel} value={value} index={2}>
        <IRR />
      </ApexPanel>
    </div>
  );
}
