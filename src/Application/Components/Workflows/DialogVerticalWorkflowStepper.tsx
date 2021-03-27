import { makeStyles, StepConnector } from "@material-ui/core";
import Step, { StepProps } from "@material-ui/core/Step";
import StepLabel, { StepLabelProps } from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import React from "react";
import { IWorkflowDataProps } from "./WorkflowTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 0,
    "& > *": {
      alignItems: "center",
    },
  },
  verticalConnector: {
    padding: 0,
    borderLeft: `2px solid ${theme.palette.primary.main}`,
  },
  contentRoot: {
    marginTop: 0,
    borderLeft: `2px solid ${theme.palette.primary.main}`,
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
      connector={
        <StepConnector
          classes={{
            vertical: classes.verticalConnector,
          }}
        />
      }
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
