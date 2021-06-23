import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
import DialogSaveCancelButtons from "../../../Application/Components/DialogButtons/DialogSaveCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import Image from "../../../Application/Components/Visuals/Image";
import { IAllWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { loadWorkflowAction } from "../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import StoredDeck from "../../Images/StoredDeck.svg";
import ImportDatabase from "../../Images/ImportDatabase.svg";
import MSExcel from "../../Images/MSExcel.svg";
import { saveInputDeckRequestAction } from "../../Redux/Actions/InputActions";
import DatabaseWorkflow from "../Common/InputWorkflows/DatabaseWorkflow";
import ExcelWorkflow from "../Common/InputWorkflows/ExcelWorkflow";
import StoredFacilitiesDecks from "./StoredFacilitiesDecks";
import { IdType } from "./FacilitiesInputDeckLandingTypes";
import { confirmationDialogParameters } from "../../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { ILandingData } from "../../../Application/Types/ApplicationTypes";

const useStyles = makeStyles((theme) => ({
  facilitiesInputDeckLanding: {
    display: "flex",
    width: "100%",
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
  importWorkflow: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { height: 70, width: 70 },
}));

const FacilitiesInputDeckLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const reducer = "inputReducer";
  const { url, path } = useRouteMatch();

  const initialState = useSelector((state: RootState) => state.inputReducer);
  const { loadWorkflow } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const facilitiesInputLandingData: ILandingData[] = [
    {
      name: "Excel | Text",
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
      workflowCategory: "inputDataWorkflows",
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
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: `Stored Facilities Data`,
      description: `Select a pre-exisiting and approved facilities data stored in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={StoredDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approveddeck`,
      workflowProcess: "facilitiesInputDeckStored",
      workflowCategory: "storedDataWorkflows",
    },
  ];

  const facilitiesExcelandDbWorkflowFinalAction = (
    workflowProcess: IAllWorkflows["wrkflwPrcss"]
  ) => {
    const saveFacilitiesInputdeckConfirmation = (
      titleDesc: Record<string, string>
    ) => {
      const dps = confirmationDialogParameters(
        "FacilitiesDeck_Save_Confirmation",
        "Facilities Deck Save Confirmation",
        "textDialog",
        `Do you want to save the current facilities Inputdeck?`,
        false,
        true,
        () =>
          saveInputDeckRequestAction(
            workflowProcess,
            titleDesc as Record<string, string>
          ),
        "Save",
        "saveOutlined"
      );

      dispatch(showDialogAction(dps));
    };

    const dialogParameters: DialogStuff = {
      name: "Save_Facilities_Input_Deck_Dialog",
      title: "Save Facilities InputDeck",
      type: "saveFacilitiesInputDeckDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "save",
      actionsList: (titleDesc?: Record<string, string>) =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () =>
              saveFacilitiesInputdeckConfirmation(
                titleDesc as Record<string, string>
              ),
          ],
          false,
          "None"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      reducer,
      initialState,
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const storedDataFinalAction = () => {
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
        <div className={classes.importWorkflow}>
          <Route exact path={`${path}/:dataInputId`}>
            {(props: RouteComponentProps<IdType>) => {
              const { match } = props;
              const {
                params: { dataInputId },
              } = match;

              const facilitiesInputDeckWorkflows = {
                excel: (
                  <ExcelWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={"facilitiesInputDeckExcel"}
                    finalAction={() =>
                      facilitiesExcelandDbWorkflowFinalAction(
                        "facilitiesInputDeckExcel"
                      )
                    }
                  />
                ),
                database: (
                  <DatabaseWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={"facilitiesInputDeckDatabase"}
                    finalAction={() =>
                      facilitiesExcelandDbWorkflowFinalAction(
                        "facilitiesInputDeckExcel"
                      )
                    }
                  />
                ),
                approveddeck: (
                  <StoredFacilitiesDecks
                    reducer={reducer}
                    showChart={true}
                    finalAction={storedDataFinalAction}
                  />
                ),
              };

              return facilitiesInputDeckWorkflows[dataInputId];
            }}
          </Route>
        </div>
      ) : (
        <div className={classes.facilitiesInputDeckLanding}>
          {facilitiesInputLandingData.map((module) => {
            const {
              icon,
              name,
              description,
              route,
              workflowProcess,
              workflowCategory,
            } = module;
            return (
              <ModuleCard
                key={name}
                isDispatched={true}
                moduleAction={loadWorkflowAction}
                title={name}
                description={description}
                icon={icon}
                route={route}
                wP={workflowProcess}
                wC={workflowCategory}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default FacilitiesInputDeckLanding;
