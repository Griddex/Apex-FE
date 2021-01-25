import { fade, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import WorkflowBanner from "../Application/Components/Workflows/WorkflowBanner";
import { RootState } from "../Application/Redux/Reducers/AllReducers";
import ProjectSettingsPanel from "./Components/Panels/ProjectSettingsPanel";
import UnitSettings from "./UnitSettings/UnitSettings";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  workflowHeaderRow: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "5%",
    margin: 0,
    "& > *": { height: "60%" },
  },
  workflowBanner: {
    display: "flex",
    justifyContent: "center",
    width: 54,
    margin: 0,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(0, 0.5, 0.5, 0),
    "& > *": { fontWeight: "bold" },
  },
  workflowBannerHeader: {
    display: "flex",
    flexGrow: 1,
    marginLeft: 6,
    "& > *": { fontWeight: "bold" },
  },
  workflowBody: {
    display: "flex",
    flexDirection: "row",
    height: "90%",
    width: "80%",
    alignItems: "center",
    justifyContent: "center", //around, between
    // justifyContent: "space-evenly", //around, between
    alignSelf: "center",
  },
  workflowDatabasePanel: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    height: "95%",
    width: "20%",
    border: "1px solid #A8A8A8",
    boxShadow: theme.shadows[2],
    backgroundColor: "#FFF",
    padding: 20,
  },
  workflowPanel: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    height: "100%",
    width: 250,
    minWidth: 250,
    border: "1px solid #E7E7E7",
    backgroundColor: "#FFF",
    padding: 5,
  },
  workflowContent: { padding: 5, height: "100%", width: "90%" },
  navigationbuttons: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    "& > *": {
      border: `2px solid`,
      boxShadow: theme.shadows[2],
    },
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const steps = ["Unit Settings", "Database Settings", "View Results"];

const Settings = () => {
  const classes = useStyles();
  const workflowProcess = "settings";

  const { activeStep } = useSelector(
    (state: RootState) =>
      state.workflowReducer["importDataWorkflows"][workflowProcess]
  );
  const { moduleName, subModuleName, workflowName } = useSelector(
    (state: RootState) => state.applicationReducer
  );
  const settingsProps = useSelector((state: RootState) => state.projectReducer);
  const WorkflowBannerProps = {
    activeStep,
    steps,
    moduleName,
    subModuleName,
    workflowName,
  };

  function renderImportStep(activeStep: number) {
    switch (activeStep) {
      case 0:
        return <UnitSettings {...settingsProps} />;
      case 1:
        return <div>Database Settings</div>;
      default:
        return <h1>No view</h1>;
    }
  }

  return (
    <div className={classes.root}>
      <WorkflowBanner {...WorkflowBannerProps} />
      <div className={classes.workflowBody}>
        <div className={classes.workflowPanel}>
          <ProjectSettingsPanel />
        </div>
        <div className={classes.workflowContent}>
          {renderImportStep(activeStep)}
        </div>
      </div>
    </div>
  );
};

export default Settings;
