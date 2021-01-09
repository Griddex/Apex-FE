import { makeStyles } from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 0,
    "& > *": {
      alignItems: "center",
    },
  },
}));

const WorkflowStepper = (props) => {
  const classes = useStyles();

  const expandContextDrawer = useSelector(
    (state) => state.layoutReducer.expandContextDrawer
  );

  const { steps, activeStep, skipped, errorSteps } = props;

  return (
    <Stepper
      className={classes.root}
      activeStep={activeStep}
      orientation="vertical"
    >
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};

        if (errorSteps.includes(index)) {
          labelProps.error = true;
        }
        if (skipped.has(index)) {
          stepProps.completed = false;
        }

        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>
              {expandContextDrawer && label}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default WorkflowStepper;
