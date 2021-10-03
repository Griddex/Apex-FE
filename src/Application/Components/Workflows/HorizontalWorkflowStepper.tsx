import makeStyles from '@mui/styles/makeStyles';
import Step, { StepProps } from "@mui/material/Step";
import StepLabel, { StepLabelProps } from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import React from "react";
import { IWorkflowDataProps } from "./WorkflowTypes";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "90%",
    justifyContent: "center",
    padding: 0,
    "& > *": {
      alignItems: "center",
    },
  },
}));

const HorizontalWorkflowStepper = (props: IWorkflowDataProps) => {
  const classes = useStyles();

  const { steps, activeStep, skipped, errorSteps } = props;

  return (
    <Stepper
      className={classes.root}
      activeStep={activeStep}
      orientation="horizontal"
    >
      {steps.map((label: string, index: number) => {
        const stepProps: StepProps = {};
        const labelProps: StepLabelProps = {};

        if (errorSteps && errorSteps.includes(index)) {
          labelProps["error"] = true;
        }
        if (skipped && skipped.has(index)) {
          stepProps.completed = false;
        }

        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default HorizontalWorkflowStepper;
