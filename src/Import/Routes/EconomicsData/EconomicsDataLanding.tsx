import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import Image from "../../../Application/Components/Visuals/Image";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { loadWorkflowAction } from "../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import ExistingDeck from "../../Images/ExistingDeck.svg";
import ImportDatabase from "../../Images/ImportDatabase.svg";
import MSExcel from "../../Images/MSExcel.svg";
import DatabaseWorkflow from "../Common/InputWorkflows/DatabaseWorkflow";
import ExcelWorkflow from "../Common/InputWorkflows/ExcelWorkflow";
import { IdType, IEconomicsLandingData } from "./EconomicsDataLandingTypes";
import ExistingEconomicsParametersDecks from "./ExistingEconomicsParametersDecks";

const useStyles = makeStyles((theme) => ({
  EconomicsDataLanding: {
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

const EconomicsDataLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { url, path } = useRouteMatch();
  const { loadWorkflow } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const economicsLandingData: IEconomicsLandingData[] = [
    {
      name: "Excel",
      description: `Utilize economics data by connecting to Microsoft Excel`,
      icon: (
        <Image
          className={classes.image}
          src={MSExcel}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/excel`,
      workflowProcess: "economicsInputDataExcel",
      workflowCategory: "economicsDataWorkflows",
    },
    {
      name: "Database",
      description: `Utilize economics data by connecting to local or remote databases. Providers supported: AccessDb, MSSQL, MySQL etc`,
      icon: (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/database`,
      workflowProcess: "economicsInputDataDatabase",
      workflowCategory: "economicsDataWorkflows",
    },
    // {
    //   //Only one left? A table of production data connections to choose from? //What if you want to setup a quick local production db connection?
    //   name: `Input Economics Data`,
    //   description: `Type in economics data parameters and generate future cashflow`,
    //   icon: (
    //     <Image
    //       className={classes.image}
    //       src={Input}
    //       alt="Hydrocarbon Forecasting Platform Company Logo"
    //     />
    //   ),
    //   route: `${url}/manual`,
    //   workflowProcess: "economicsInputDataManual",
    // workflowCategory:"economicsDataWorkflows"
    // },
    {
      //Only one left? A table of production data connections to choose from? //What if you want to setup a quick local production db connection?
      name: `Existing Economics Data`,
      description: `Select a pre-exisiting and approved economics data stored in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={ExistingDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approveddata`,
      workflowProcess: "economicsInputDataExisting",
      workflowCategory: "economicsDataWorkflows",
    },
  ];

  const economicsExcelandDbWorkflowFinalAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Manage_Deck_Dialog",
      title: `Manage Economics Deck`,
      type: "finalizeForecastInputDeckDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "information",
    };
    dispatch(showDialogAction(dialogParameters));
  };

  const existingDataFinalAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Manage_Deck_Dialog",
      title: `Manage Economics Parameters Deck`,
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
          <Route
            exact
            path={`${path}/:dataInputId`}
            render={(props: RouteComponentProps<IdType>) => {
              const { match } = props;
              const {
                params: { dataInputId },
              } = match;

              const inputEconomicsDataWorkflows = {
                excel: (
                  <ExcelWorkflow
                    wrkflwCtgry={"economicsDataWorkflows"}
                    wrkflwPrcss={"economicsInputDataExcel"}
                    finalAction={economicsExcelandDbWorkflowFinalAction}
                  />
                ),
                database: (
                  <DatabaseWorkflow
                    wrkflwCtgry={"economicsDataWorkflows"}
                    wrkflwPrcss={"economicsInputDataDatabase"}
                    finalAction={economicsExcelandDbWorkflowFinalAction}
                  />
                ),
                approveddata: (
                  <ExistingEconomicsParametersDecks
                    finalAction={existingDataFinalAction}
                  />
                ),
              };

              return inputEconomicsDataWorkflows[dataInputId];
            }}
          />
        </div>
      ) : (
        <div className={classes.EconomicsDataLanding}>
          {economicsLandingData.map((module) => {
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

export default EconomicsDataLanding;
