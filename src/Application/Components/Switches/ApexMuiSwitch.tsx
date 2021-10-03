import SwitchUnstyled, {
  switchUnstyledClasses,
} from "@mui/core/SwitchUnstyled";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/system";
import React from "react";
import { IApexMuiSwitch } from "./ApexMuiSwitchTypes";

export default function ApexMuiSwitch(props: IApexMuiSwitch) {
  const theme = useTheme();

  const {
    handleChange,
    checked,
    hasLabels,
    leftLabel,
    rightLabel,
    moreStyles,
  } = props;

  const Root = styled("span")(`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 32px;
  height: 20px;
  
  margin: 10px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${theme.palette.secondary.main};
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #FFF;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: rgba(255,255,255,1);
    box-shadow: 0 0 1px 8px rgba(0,0,0,0.25);
  }

  &.${switchUnstyledClasses.checked} { 
    .${switchUnstyledClasses.thumb} {
      left: 14px;
      top: 3px;
      background-color: #FFF;
    }

    .${switchUnstyledClasses.track} {
      background:${theme.palette.success.main};
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }`);

  const label = { componentsProps: { input: { "aria-label": "Demo switch" } } };

  if (hasLabels)
    return (
      <Stack flexDirection="row" alignItems="center" style={moreStyles}>
        {leftLabel && <div>{leftLabel}</div>}
        <SwitchUnstyled
          component={Root}
          {...label}
          checked={checked}
          onChange={handleChange}
        />
        {rightLabel && <div>{rightLabel}</div>}
      </Stack>
    );
  else return <SwitchUnstyled component={Root} {...label} />;
}
