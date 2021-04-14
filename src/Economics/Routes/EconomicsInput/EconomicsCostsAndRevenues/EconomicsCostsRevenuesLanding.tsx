import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import ModuleCard from "../../../../Application/Components/Cards/ModuleCard";
import DialogSaveCancelButtons from "../../../../Application/Components/DialogButtons/DialogSaveCancelButtons";
import { DialogStuff } from "../../../../Application/Components/Dialogs/DialogTypes";
import Image from "../../../../Application/Components/Visuals/Image";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
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
import ExistingDeck from "../../../../Import/Images/ExistingDeck.svg";
import ImportDatabase from "../../../../Import/Images/ImportDatabase.svg";
import Manual from "../../../Images/Manual.svg";
import ForecastResults from "../../../Images/ForecastResults.svg";
import { IdType } from "./EconomicsCostsAndRevenuesTypes";
import ExistingCostsAndRevenuesDecks from "./ExistingCostsAndRevenuesDecks";
import { loadEconomicsWorkflowAction } from "../../../Redux/Actions/EconomicsActions";

const useStyles = makeStyles((theme) => ({
  economicsCostsRevenuesLanding: {
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

const EconomicsCostsRevenuesLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const reducer = "economicsReducer";

  const { url, path } = useRouteMatch();
  const { loadCostsRevenueWorkflow } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const economicsCostsRevenuesLandingData: ILandingData[] = [
    {
      name: "Excel | Text",
      description: `Import costs & revenue data from Microsoft Excel. Formats supported: .xls, .xlsx & csv. Also import in .txt or .dat formats`,
      icon: (
        <Image
          className={classes.image}
          src={MSExcel}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/excel`,
      workflowProcess: "economicsCostsRevenuesDeckExcel",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: "Database",
      description: `Import costs & revenue data from local or remote databases. Providers supported: AccessDb, MSSQL, MySQL etc`,
      icon: (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/database`,
      workflowProcess: "economicsCostsRevenuesDeckDatabase",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: "Manual",
      description: `Manually input hydrocarbon forecast data, development 
      costs & revenue data from any source`,
      icon: (
        <Image
          className={classes.image}
          src={Manual}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/manual`,
      workflowProcess: "economicsCostsRevenuesDeckManual",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: "Apex Forecast Results",
      description: `Initialize your workflow from Apex forecast results store and then
       manually input costs & revenue data from any source`,
      icon: (
        <Image
          className={classes.image}
          src={ForecastResults}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/apexforecast`,
      workflowProcess: "economicsCostsRevenuesDeckApexForecast",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: `Existing Costs & Revenue Data`,
      description: `Select a pre-exisiting and approved costs & revenue data stored in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={ExistingDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approveddeck`,
      workflowProcess: "economicsCostsRevenuesDeckExisting",
      workflowCategory: "existingDataWorkflows",
    },
  ];

  //Define a service that combines more than one icon or image into an overlapped one
  //CSS using overlap and z-index

  //Paying it back
  const costsRevenueExcelandDbWorkflowFinalAction = (
    workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
  ) => {
    const saveCostsRevenuesInputdeckConfirmation = () => {
      const dps = confirmationDialogParameters(
        "Costs_RevenuesDeck_Save_Confirmation",
        "Costs & Revenues Deck Save Confirmation",
        `Do you want to save the current costs & revenue Inputdeck?`,
        true,
        () => ({ type: "HELLO", payload: "yeah" })
      );

      dispatch(showDialogAction(dps));
    };

    const dialogParameters: DialogStuff = {
      name: "Save_CostsRevenues_Input_Deck_Dialog",
      title: "Save CostsRevenues InputDeck",
      type: "saveCostsRevenuesInputDeckDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "information",
      actionsList: () =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, saveCostsRevenuesInputdeckConfirmation]
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const existingDataFinalAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Manage_Deck_Dialog",
      title: `Manage CostsRevenues Deck`,
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
      {loadCostsRevenueWorkflow ? (
        <div className={classes.importWorkflow}>
          <Route exact path={`${path}/:dataInputId`}>
            {(props: RouteComponentProps<IdType>) => {
              const { match } = props;
              const {
                params: { dataInputId },
              } = match;

              const economicsCostsRevenuesDeckWorkflows = {
                excel: (
                  <ExcelWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={"economicsCostsRevenuesDeckExcel"}
                    finalAction={() =>
                      costsRevenueExcelandDbWorkflowFinalAction(
                        "economicsCostsRevenuesDeckExcel"
                      )
                    }
                  />
                ),
                database: (
                  <DatabaseWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={"economicsCostsRevenuesDeckDatabase"}
                    finalAction={() =>
                      costsRevenueExcelandDbWorkflowFinalAction(
                        "economicsCostsRevenuesDeckExcel"
                      )
                    }
                  />
                ),
                manual: (
                  <ExcelWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={"economicsCostsRevenuesDeckExcel"}
                    finalAction={() =>
                      costsRevenueExcelandDbWorkflowFinalAction(
                        "economicsCostsRevenuesDeckExcel"
                      )
                    }
                  />
                ),
                apexforecast: (
                  <ExcelWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={"economicsCostsRevenuesDeckExcel"}
                    finalAction={() =>
                      costsRevenueExcelandDbWorkflowFinalAction(
                        "economicsCostsRevenuesDeckExcel"
                      )
                    }
                  />
                ),
                approveddeck: (
                  <ExistingCostsAndRevenuesDecks
                    reducer={reducer}
                    showChart={true}
                    finalAction={existingDataFinalAction}
                  />
                ),
              };

              return economicsCostsRevenuesDeckWorkflows[dataInputId];
            }}
          </Route>
        </div>
      ) : (
        <div className={classes.economicsCostsRevenuesLanding}>
          {economicsCostsRevenuesLandingData.map((module) => {
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
                  loadEconomicsWorkflowAction("loadCostsRevenueWorkflow")
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

export default EconomicsCostsRevenuesLanding;
