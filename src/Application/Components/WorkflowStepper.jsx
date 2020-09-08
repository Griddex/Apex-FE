import React from "react";
import PropTypes from "prop-types";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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

  const steps = useSelector((state) => state.importReducer.steps);
  const activeStep = useSelector((state) => state.importReducer.activeStep);
  const skipped = useSelector((state) => state.importReducer.skipped);
  const errorSteps = useSelector((state) => state.importReducer.errorSteps);
  const expandContextDrawer = useSelector(
    (state) => state.layoutReducer.expandContextDrawer
  );

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

WorkflowStepper.propTypes = {};

export default WorkflowStepper;
