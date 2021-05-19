import { makeStyles } from "@material-ui/core";
import React from "react";
import HorizontalWorkflowStepper from "../../Application/Components/Workflows/HorizontalWorkflowStepper";
import {
  INetworkWorkflowProcess,
  IWorkflowDataProps,
  ReducersType,
} from "../../Application/Components/Workflows/WorkflowTypes";
import ExistingFacilitiesDecks from "../../Import/Routes/FacilitiesInputDeck/ExistingFacilitiesDecks";
import ExistingForecastDecks from "../../Import/Routes/ForecastInputDeck/ExistingForecastDecks";
import ExistingForecastingParameters from "../Routes/ExistingForecastingParameters";
import ExistingNetworks from "../Routes/ExistingNetworks";

const useStyles = makeStyles((theme) => ({
  rootWorkflow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
}));

const RunForecastWorkflow = (workflowProps: IWorkflowDataProps) => {
  const classes = useStyles();
  const { activeStep } = workflowProps;
  const reducer = "inputReducer" as ReducersType;
  const workflowProcess = "networkExisting";

  const props = {
    reducer,
    workflowProcess,
    containerStyle: { boxShadow: "none", width: "100%", height: "100%" },
    showChart: false,
    finalAction: () => {},
  };

  const renderImportStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <ExistingNetworks
            workflowProcess={workflowProcess}
            containerStyle={props.containerStyle}
          />
        );
      case 1:
        return <ExistingForecastingParameters {...props} />;
      default:
        return <h1>No view</h1>;
    }
  };

  return (
    <div className={classes.rootWorkflow}>
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {renderImportStep()}
      </div>
    </div>
  );
};

export default RunForecastWorkflow;