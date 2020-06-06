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

const ImportExcelStepper = () => {
  const classes = useStyles();

  const Steps = useSelector((state) => state.ImportReducer.Steps);
  const ActiveStep = useSelector((state) => state.ImportReducer.ActiveStep);
  const Skipped = useSelector((state) => state.ImportReducer.Skipped);
  const ErrorSteps = useSelector((state) => state.ImportReducer.ErrorSteps);
  const expandContextDrawer = useSelector(
    (state) => state.UILayoutReducer.expandContextDrawer
  );

  return (
    <Stepper
      className={classes.root}
      activeStep={ActiveStep}
      orientation="vertical"
    >
      {Steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};

        if (ErrorSteps.includes(index)) {
          labelProps.error = true;
        }
        if (Skipped.has(index)) {
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

ImportExcelStepper.propTypes = {};

export default ImportExcelStepper;
