import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    minWidth: 200,
  },
  input: {
    width: 80,
    fontSize: 14,
    marginLeft: 5,
  },
});

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

export default function ApexSlider({
  name,
  sliderValue,
  step,
  min,
  max,
  actionPath,
  action,
  sliderContextFxn,
}: IApexSlider) {
  console.log(
    "Logged output --> ~ file: ApexSlider.tsx ~ line 43 ~ sliderValue",
    sliderValue
  );
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
        style={{ width: "100%" }}
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
}
