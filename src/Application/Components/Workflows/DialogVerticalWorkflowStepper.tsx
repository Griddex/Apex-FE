import { makeStyles } from "@material-ui/core";
import Step, { StepProps } from "@material-ui/core/Step";
import StepLabel, { StepLabelProps } from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import React from "react";
import { IWorkflowDataProps } from "./WorkflowTypes";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 0,
    justifyContent: "center",
    padding: 0,
    "& > *": {
      alignItems: "center",
    },
  },
}));

const DialogVerticalWorkflowStepper = (props: IWorkflowDataProps) => {
  const classes = useStyles();

  const { steps, activeStep, skipped, errorSteps } = props;

  return (
    <Stepper
      className={classes.root}
      activeStep={activeStep}
      orientation="vertical"
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

export default DialogVerticalWorkflowStepper;
