import { alpha, Theme } from "@mui/material";
import grey from "@mui/material/colors/grey";
import makeStyles from "@mui/styles/makeStyles";
import Input from "@mui/material/Input";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  slider: { outline: "0px solid", width: "100%" },
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

  const handleSliderEventChange = (event: any) => {
    const value = event.target.value;
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Input
        className={classes.slider}
        type="range"
        name={name}
        value={typeof Number(sliderValue) === "number" ? sliderValue : min}
        onChange={handleSliderEventChange}
        componentsProps={{
          input: {
            min,
            max,
            step,
          },
        }}
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
