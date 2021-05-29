import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { TUseState } from "../../../Application/Types/ApplicationTypes";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  input: {
    width: 60,
    fontSize: 14,
  },
});

export interface IApexSlider {
  name: string;
  currentValue: number | string | Array<number | string>;
  step: number;
  min: number;
  max: number;
  actionPath?: string;
  action?: (path: string, value: any) => void;
  setSliderValue?: TUseState<number>;
}

export default function ApexSlider({
  name,
  currentValue,
  step,
  min,
  max,
  actionPath,
  action,
  setSliderValue,
}: IApexSlider) {
  const classes = useStyles();
  const [value, setValue] =
    React.useState<number | string | Array<number | string>>(currentValue);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setValue(newValue);
    setSliderValue && setSliderValue(newValue as number);
    action && action(actionPath as string, newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      event.target.value === "" ? "" : Number(event.target.value);

    setValue(newValue);
    setSliderValue && setSliderValue(newValue as number);
    action && action(actionPath as string, newValue);
  };

  const handleBlur = () => {
    if (value < min) {
      setValue(min);
    } else if (value > max) {
      setValue(max);
    }
  };

  return (
    <Grid className={classes.root} container spacing={2} alignItems="center">
      <Grid item xs>
        <Slider
          name={name}
          value={typeof value === "number" ? value : min}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
        />
      </Grid>
      <Grid item>
        <Input
          className={classes.input}
          value={value}
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
      </Grid>
    </Grid>
  );
}
