import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import DialogSaveCancelButtons from "../../../Application/Components/DialogButtons/DialogSaveCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import Image from "../../../Application/Components/Visuals/Image";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { loadWorkflowAction } from "../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import ExistingDeck from "../../Images/ExistingDeck.svg";
import ImportDatabase from "../../Images/ImportDatabase.svg";
import MSExcel from "../../Images/MSExcel.svg";
import { saveInputDeckRequestAction } from "../../Redux/Actions/ImportActions";
import { IInputLanding } from "../Common/InputLayoutTypes";
import DatabaseWorkflow from "../Common/InputWorkflows/DatabaseWorkflow";
import ExcelWorkflow from "../Common/InputWorkflows/ExcelWorkflow";
import ExistingDataWorkflow from "../Common/InputWorkflows/ExistingDataWorkflow";
import { IdType } from "./FacilitiesInputDeckLandingTypes";

const useStyles = makeStyles((theme) => ({
  FacilitiesInputDeckLanding: {
    display: "flex",
    flexGrow: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    "& > *": {
      margin: theme.spacing(3),
      height: 370,
      width: 240,
    },
  },
  ImportWorkflow: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { height: 70, width: 70 },
}));

const FacilitiesInputDeckLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { url, path } = useRouteMatch();
  const { loadWorkflow } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { currentWorkflowProcess } = useSelector(
    (state: RootState) => state.workflowReducer
  );

  const facilitiesInputLandingData = [
    {
      name: "Excel + Plain Text",
      description: `Import facilities data from Microsoft Excel. Formats supported: .xls, .xlsx & csv. Also import in .txt or .dat formats`,
      icon: (
        <Image
          className={classes.image}
          src={MSExcel}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/excel`,
      workflowProcess: "facilitiesInputDeckExcel",
    },
    {
      name: "Database",
      description: `Import facilities data from local or remote databases. Providers supported: AccessDb, MSSQL, MySQL etc`,
      icon: (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/database`,
      workflowProcess: "facilitiesInputDeckDatabase",
    },
    {
      name: `Approved Facilities Data`,
      description: `Select a pre-exisiting and approved facilities data stored in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={ExistingDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approveddeck`,
      workflowProcess: "facilitiesInputDeckApproveddeck",
    },
  ];

  //Define a service that combines more than one icon or image into an overlapped one
  //CSS using overlap and z-index

  //Paying it back
  const excelandDbWorkflowFinalAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Manage_Deck_Dialog",
      title: `Manage Facilities Deck`,
      type: "finalizeInputDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "information",
      actionsList: () => (
        <DialogSaveCancelButtons
          action={() => saveInputDeckRequestAction("Facilities Deck")}
        />
      ),
    };
    dispatch(showDialogAction(dialogParameters));
  };

  const existingDataFinalAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Manage_Deck_Dialog",
      title: `Manage Facilities Deck`,
      type: "textDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "information",
    };
    dispatch(showDialogAction(dialogParameters));
  };

  return (
    <>
      {loadWorkflow ? (
        <div className={classes.ImportWorkflow}>
          <Route exact path={`${path}/:dataInputId`}>
            {(props: RouteComponentProps<IdType>) => {
              const { match } = props;
              const {
                params: { dataInputId },
              } = match;

              const facilitiesInputDeckWorkflows = {
                excel: (
                  <ExcelWorkflow
                    workflowProcess={currentWorkflowProcess}
                    finalAction={excelandDbWorkflowFinalAction}
                  />
                ),
                database: (
                  <DatabaseWorkflow
                    workflowProcess={currentWorkflowProcess}
                    finalAction={excelandDbWorkflowFinalAction}
                  />
                ),
                approveddeck: (
                  <ExistingDataWorkflow
                    workflowProcess={currentWorkflowProcess}
                    finalAction={existingDataFinalAction}
                  />
                ),
              };

              return facilitiesInputDeckWorkflows[dataInputId];
            }}
          </Route>
        </div>
      ) : (
        <div className={classes.FacilitiesInputDeckLanding}>
          {facilitiesInputLandingData.map((module) => {
            const { icon, name, description, route, workflowProcess } = module;
            return (
              <ModuleCard
                key={name}
                moduleAction={loadWorkflowAction}
                name={name}
                description={description}
                Icon={icon}
                route={route}
                workflowProcess={workflowProcess}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default FacilitiesInputDeckLanding;
