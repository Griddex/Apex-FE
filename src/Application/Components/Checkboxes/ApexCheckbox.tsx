import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { IApexCheckbox } from "./ApexGridCheckboxTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: 0,
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: theme.palette.primary.dark,
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
}));

// Inspired by blueprintjs
function StyledRadio(props: RadioProps) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function ApexCheckbox({
  variableZOption,
  apexCheckboxData,
}: IApexCheckbox) {
  const theme = useTheme();
  const variableZTitle = variableZOption.label.split("_")[0];

  return (
    <FormControl component="fieldset">
      <FormLabel
        component="legend"
        style={{ fontWeight: theme.typography.fontWeightMedium }}
      >
        {variableZTitle}
      </FormLabel>
      <RadioGroup
        defaultValue="female"
        aria-label="gender"
        name="customized-radios"
      >
        {apexCheckboxData.map((obj, i) => {
          const { value, label, handleCheck } = obj;
          return (
            <FormControlLabel
              key={i}
              value={value}
              control={<StyledRadio />}
              label={label}
              onClick={() => handleCheck()}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
