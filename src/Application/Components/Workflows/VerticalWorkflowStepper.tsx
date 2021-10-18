import { StepConnector } from "@mui/material";
import Step, { StepProps } from "@mui/material/Step";
import StepLabel, { StepLabelProps } from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { IWorkflowDataProps } from "./WorkflowTypes";

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
  verticalConnector: {
    padding: 0,
    borderLeft: `2px solid ${theme.palette.primary.main}`,
  },
  contentRoot: {
    marginTop: 0,
    borderLeft: `2px solid ${theme.palette.primary.main}`,
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const expandContextDrawerSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.expandContextDrawer,
  (context) => context
);

const VerticalWorkflowStepper = (props: IWorkflowDataProps) => {
  const classes = useStyles();

  const { steps, activeStep, skipped, errorSteps } = props;

  const expandContextDrawer = useSelector(expandContextDrawerSelector);

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
            <StepLabel {...labelProps}>
              {expandContextDrawer && label}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default VerticalWorkflowStepper;
