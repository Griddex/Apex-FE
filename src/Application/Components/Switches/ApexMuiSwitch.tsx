import { Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import React from "react";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import ApexFlexContainer from "../Styles/ApexFlexContainer";
import { IApexMuiSwitch } from "./ApexMuiSwitchTypes";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.success.main,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: (props: IApexMuiSwitch) => props.checkedColor,
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    // border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.secondary.main,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}));

export default function ApexMuiSwitch(props: IApexMuiSwitch) {
  const {
    name,
    handleChange,
    checked,
    hasLabels,
    leftLabel,
    rightLabel,
    moreStyles,
  } = props;

  const classes = useStyles(props);

  if (hasLabels)
    return (
      <ApexFlexContainer
        moreStyles={moreStyles as CSSProperties}
        justifyContent="flex-start"
        width={"95%"}
        height={30}
      >
        {leftLabel && <Grid item>{leftLabel}</Grid>}
        <Grid item style={{ marginLeft: 5, marginRight: 5 }}>
          <Switch
            name={name}
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
              root: classes.root,
              switchBase: classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked,
            }}
            checked={checked}
            onChange={handleChange}
          />
        </Grid>
        {rightLabel && <Grid item>{rightLabel}</Grid>}
      </ApexFlexContainer>
    );
  else
    return (
      <Switch
        name={name}
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        checked={checked}
        onChange={handleChange}
      />
    );
}
