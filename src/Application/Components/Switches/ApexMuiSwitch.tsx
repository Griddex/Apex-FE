import { makeStyles, Theme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import React from "react";
import { IApexMuiSwitch } from "./ApexMuiSwitchTypes";
import clsx from "clsx";
import { Grid } from "@material-ui/core";
import CenteredStyle from "../Styles/CenteredStyle";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  checked: {
    transform: "translateX(12px)",
    color: theme.palette.common.white,
    "& + $track": {
      opacity: 1,
      backgroundColor: (props: IApexMuiSwitch) => props.checkedColor,
      borderColor: (props: IApexMuiSwitch) => props.checkedColor,
    },
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    // "&$checked": {
    //   transform: "translateX(12px)",
    //   color: theme.palette.common.white,
    //   "& + $track": {
    //     opacity: 1,
    //     backgroundColor: (props: IApexMuiSwitch) => props.checkedColor,
    //     borderColor: (props: IApexMuiSwitch) => props.checkedColor,
    //   },
    // },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: (props: IApexMuiSwitch) => props.notCheckedColor,
  },
}));

export default function ApexMuiSwitch(props: IApexMuiSwitch) {
  const {
    name,
    handleChange,
    checked,
    hasLabels,
    leftLabel,
    rightLabel,
  } = props;
  const classes = useStyles(props);

  if (hasLabels)
    return (
      <CenteredStyle justifyContent="flex-start" width={"95%"} height={30}>
        {leftLabel && <Grid item>{leftLabel}</Grid>}
        <Grid item style={{ marginLeft: 5, marginRight: 5 }}>
          <Switch
            name={name}
            classes={{
              root: classes.root,
              switchBase: classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
            }}
            checked={checked}
            onChange={handleChange}
          />
        </Grid>
        {rightLabel && <Grid item>{rightLabel}</Grid>}
      </CenteredStyle>
    );
  else
    return (
      <Switch
        name={name}
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
        }}
        checked={checked}
        onChange={handleChange}
      />
    );
}
