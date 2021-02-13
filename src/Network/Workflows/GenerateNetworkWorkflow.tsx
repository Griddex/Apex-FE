import { makeStyles } from "@material-ui/core";
import React from "react";
import HorizontalWorkflowStepper from "../../Application/Components/Workflows/HorizontalWorkflowStepper";
import { IWorkflowDataProps } from "../../Application/Components/Workflows/WorkflowTypes";
import ExistingFacilitiesDecks from "../../Import/Routes/FacilitiesInputDeck/ExistingFacilitiesDecks";
import ExistingForecastDecks from "../../Import/Routes/ForecastInputDeck/ExistingForecastDecks";

const useStyles = makeStyles((theme) => ({
  rootWorkflow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
}));

const GenerateNetworkWorkflow = (workflowProps: IWorkflowDataProps) => {
  const classes = useStyles();
  const { activeStep } = workflowProps;

  const props = {
    containerStyle: { boxShadow: "none" },
    showChart: false,
    finalAction: () => {},
  };

  const renderImportStep = () => {
    switch (activeStep) {
      case 0:
        return <ExistingFacilitiesDecks {...props} />;
      case 1:
        return <ExistingForecastDecks {...props} />;
      default:
        return <h1>No view</h1>;
    }
  };

  return (
    <div className={classes.rootWorkflow}>
      <div
        style={{ display: "flex", flexGrow: 1, width: "100%", marginTop: 20 }}
      >
        {renderImportStep()}
      </div>
    </div>
  );
};

export default GenerateNetworkWorkflow;
