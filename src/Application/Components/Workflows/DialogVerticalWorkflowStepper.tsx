import { StepConnector } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Step, { StepProps } from "@mui/material/Step";
import StepLabel, { StepLabelProps } from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
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
    height: "100%",
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
            <StepLabel style={{ padding: 0 }} {...labelProps}>
              {label}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default DialogVerticalWorkflowStepper;
