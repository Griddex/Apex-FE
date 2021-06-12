import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import ModuleCard from "../../../../Application/Components/Cards/ModuleCard";
import DialogSaveCancelButtons from "../../../../Application/Components/DialogButtons/DialogSaveCancelButtons";
import { DialogStuff } from "../../../../Application/Components/Dialogs/DialogTypes";
import Image from "../../../../Application/Components/Visuals/Image";
import { IAllWorkflows } from "../../../../Application/Components/Workflows/WorkflowTypes";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { ILandingData } from "../../../../Application/Types/ApplicationTypes";
import { confirmationDialogParameters } from "../../../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import DatabaseWorkflow from "../../../../Import/Routes/Common/InputWorkflows/DatabaseWorkflow";
import ExcelWorkflow from "../../../../Import/Routes/Common/InputWorkflows/ExcelWorkflow";
import MSExcel from "../../../../Import/Images/MSExcel.svg";
import StoredDeck from "../../../../Import/Images/StoredDeck.svg";
import ImportDatabase from "../../../../Import/Images/ImportDatabase.svg";
import { IdType } from "./EconomicsParametersTypes";
import StoredEconomicsParametersDecks from "./StoredEconomicsParametersDecks";
import {
  loadEconomicsWorkflowAction,
  saveEconomicsParametersRequestAction,
} from "../../../Redux/Actions/EconomicsActions";
import Manual from "../../../Images/Manual.svg";
import EconomicsParametersManual from "./EconomicsParametersManual";

const useStyles = makeStyles((theme) => ({
  economicsParametersLanding: {
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

const EconomicsParametersLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const reducer = "economicsReducer";
  const { url, path } = useRouteMatch();

  const { loadEconomicsParametersWorkflow } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const economicsParametersLandingData: ILandingData[] = [
    {
      name: "Excel | Text",
      description: `Import economics parameters data from Microsoft Excel. Formats supported: .xls, .xlsx & csv. Also import in .txt or .dat formats`,
      icon: (
        <Image
          className={classes.image}
          src={MSExcel}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/excel`,
      workflowProcess: "economicsParametersDeckExcel",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: "Database",
      description: `Import economics parameters data from local or remote databases. Providers supported: AccessDb, MSSQL, MySQL etc`,
      icon: (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/database`,
      workflowProcess: "economicsParametersDeckDatabase",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: "Manual",
      description: `Manually input hydrocarbon forecast data, development 
      economics parameters data from any source`,
      icon: (
        <Image
          className={classes.image}
          src={Manual}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/manual`,
      workflowProcess: "economicsParametersDeckManual",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: `Stored Economics Parameters Data`,
      description: `Select a pre-exisiting and approved economics parameters data stored in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={StoredDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approveddeck`,
      workflowProcess: "economicsParametersDeckStored",
      workflowCategory: "storedDataWorkflows",
    },
  ];

  //Define a service that combines more than one icon or image into an overlapped one
  //CSS using overlap and z-index

  //Paying it back
  const economicsParametersWorkflowFinalAction = (
    wp: IAllWorkflows["wrkflwPrcss"]
  ) => {
    const saveEconomicsParametersInputdeckConfirmation = () => {
      const confirmationDialogParameters: DialogStuff = {
        name: "Save_EconomicsParametersDeck_Confirmation",
        title: "Save EconomicsParameters Confirmation",
        type: "textDialog",
        show: true,
        exclusive: false,
        maxWidth: "xs",
        dialogText: `Do you want to save the current economics parameters Inputdeck?`,
        iconType: "confirmation",
        actionsList: () =>
          DialogSaveCancelButtons(
            [true, true],
            [true, true],
            [
              unloadDialogsAction,
              () => saveEconomicsParametersRequestAction(wp, reducer),
            ]
          ),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      };

      dispatch(showDialogAction(confirmationDialogParameters));
    };

    const dialogParameters: DialogStuff = {
      name: "Save_EconomicsParameters_Input_Deck_Dialog",
      title: "Save EconomicsParameters InputDeck",
      type: "saveEconomicsParametersInputDeckDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "save",
      actionsList: () =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, saveEconomicsParametersInputdeckConfirmation]
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const storedDataFinalAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Manage_Deck_Dialog",
      title: `Manage EconomicsParameters Deck`,
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
      {loadEconomicsParametersWorkflow ? (
        <div className={classes.importWorkflow}>
          <Route exact path={`${path}/:dataInputId`}>
            {(props: RouteComponentProps<IdType>) => {
              const { match } = props;

              const {
                params: { dataInputId },
              } = match;

              const economicsParametersDeckWorkflows = {
                excel: (
                  <ExcelWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={"economicsParametersDeckExcel"}
                    finalAction={() =>
                      economicsParametersWorkflowFinalAction(
                        "economicsParametersDeckExcel"
                      )
                    }
                  />
                ),
                database: (
                  <DatabaseWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={"economicsParametersDeckDatabase"}
                    finalAction={() =>
                      economicsParametersWorkflowFinalAction(
                        "economicsParametersDeckDatabase"
                      )
                    }
                  />
                ),
                manual: (
                  <EconomicsParametersManual
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={"economicsParametersDeckExcel"}
                    finalAction={() =>
                      economicsParametersWorkflowFinalAction(
                        "economicsParametersDeckExcel"
                      )
                    }
                  />
                ),
                approveddeck: (
                  <StoredEconomicsParametersDecks
                    reducer={reducer}
                    showChart={true}
                    finalAction={storedDataFinalAction}
                  />
                ),
              };

              return economicsParametersDeckWorkflows[dataInputId];
            }}
          </Route>
        </div>
      ) : (
        <div className={classes.economicsParametersLanding}>
          {economicsParametersLandingData.map((module) => {
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
                moduleAction={() =>
                  loadEconomicsWorkflowAction("loadEconomicsParametersWorkflow")
                }
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

export default EconomicsParametersLanding;
