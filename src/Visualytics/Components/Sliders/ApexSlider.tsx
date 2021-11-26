import { alpha, Theme } from "@mui/material";
import grey from "@mui/material/colors/grey";
import Input from "@mui/material/Input";
import Slider from "@mui/material/Slider";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { TUseState } from "../../../Application/Types/ApplicationTypes";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    width: 60,
    fontSize: 14,
    marginLeft: 5,
    border: `1px solid ${grey[500]}`,
    "&:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    },
    "&:active": {
      outline: `2px solid ${theme.palette.primary.main}`,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    },
  },
}));

export type TApexSlider = number | number[] | Array<string | number>;
export interface IApexSlider {
  name: string;
  step: number;
  min: number;
  max: number;
  actionPath?: string;
  action?: (path: string, value: any) => void;
  sliderValue: TApexSlider;
  sliderContextFxn?: (value: any, name?: any) => void;
}

const ApexSlider = ({
  name,
  sliderValue,
  step,
  min,
  max,
  actionPath,
  action,
  sliderContextFxn,
}: IApexSlider) => {
  const classes = useStyles();

  const handleSliderChange = (event: any, value: number | number[]) => {
    sliderContextFxn && sliderContextFxn(value, name);
    action && action(actionPath as string, value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    sliderContextFxn && sliderContextFxn(value, name);
    action && action(actionPath as string, value);
  };

  const handleBlur = () => {
    if (sliderValue < min) {
      sliderContextFxn && sliderContextFxn(min, name);
      action && action(actionPath as string, min);
    } else if (sliderValue > max) {
      sliderContextFxn && sliderContextFxn(max, name);
      action && action(actionPath as string, max);
    }
  };

  return (
    <div className={classes.root}>
      <Slider
        name={name}
        value={typeof sliderValue === "number" ? sliderValue : min}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        valueLabelDisplay="auto"
        marks
        style={{ width: `calc(100% - 75px)` }}
        min={min}
        max={max}
        step={step}
      />
      <Input
        className={classes.input}
        value={sliderValue}
        margin="dense"
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputProps={{
          step: step,
          min: min,
          max: max,
          type: "number",
          "aria-labelledby": "input-slider",
        }}
      />
    </div>
  );
};

export default React.memo(ApexSlider);
