import React from "react";
import PropTypes from "prop-types";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { useSelector } from "react-redux";

const ImportStepper = () => {
  const isStepFailed = useSelector((state) => state.ImportReducer.IsStepFailed);
  const isStepSkipped = useSelector(
    (state) => state.ImportReducer.IsStepSkipped
  );
  const steps = useSelector((state) => state.ImportReducer.Steps);
  const activeStep = useSelector((state) => state.ImportReducer.ActiveStep);

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};

        if (isStepFailed(index)) {
          labelProps.error = true;
        }
        if (isStepSkipped(index)) {
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

ImportStepper.propTypes = {};

export default ImportStepper;
