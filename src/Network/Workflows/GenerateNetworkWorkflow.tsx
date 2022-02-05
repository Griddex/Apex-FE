import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import HorizontalWorkflowStepper from "../../Application/Components/Workflows/HorizontalWorkflowStepper";
import {
  IWorkflowDataProps,
  TReducer,
} from "../../Application/Components/Workflows/WorkflowTypes";
import StoredFacilitiesDecks from "../../Import/Routes/FacilitiesInputDeck/StoredFacilitiesDecks";
import StoredForecastDecks from "../../Import/Routes/ForecastInputDeck/StoredForecastDecks";

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
  const reducer = "inputReducer" as TReducer;

  const props = {
    reducer,
    containerStyle: { boxShadow: "none" },
    showChart: false,
    finalAction: () => {},
  };

  const renderImportStep = () => {
    switch (activeStep) {
      case 0:
        return <StoredFacilitiesDecks {...props} />;
      case 1:
        return <StoredForecastDecks {...props} />;
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

export default GenerateNetworkWorkflow;
