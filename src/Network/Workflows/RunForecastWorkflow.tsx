import { makeStyles } from "@material-ui/core";
import React from "react";
import HorizontalWorkflowStepper from "../../Application/Components/Workflows/HorizontalWorkflowStepper";
import {
  INetworkWorkflows,
  IWorkflowDataProps,
  ReducersType,
} from "../../Application/Components/Workflows/WorkflowTypes";
import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";
import StoredFacilitiesDecks from "../../Import/Routes/FacilitiesInputDeck/StoredFacilitiesDecks";
import StoredForecastDecks from "../../Import/Routes/ForecastInputDeck/StoredForecastDecks";
import StoredForecastingParameters from "../Routes/StoredForecastingParameters";
import StoredNetworks from "../Routes/StoredNetworks";

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
  const workflowProcess = "networkStored" as NonNullable<
    IStoredDataProps["wkPs"]
  >;

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
          <StoredNetworks
            workflowProcess={workflowProcess}
            containerStyle={props.containerStyle}
          />
        );
      case 1:
        return <StoredForecastingParameters {...props} />;
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
