import { Badge, BadgeProps, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import BadgeComingSoon from "../../../Application/Components/Badges/BadgeComingSoon";
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import Image from "../../../Application/Components/Visuals/Image";
import { TAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { loadWorkflowAction } from "../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { ILandingData } from "../../../Application/Types/ApplicationTypes";
import ImportDatabase from "../../Images/ImportDatabase.svg";
import MSExcel from "../../Images/MSExcel.svg";
import StoredDeck from "../../Images/StoredDeck.svg";
import DatabaseWorkflow from "../Common/InputWorkflows/DatabaseWorkflow";
import ExcelWorkflow from "../Common/InputWorkflows/ExcelWorkflow";
import { IdType } from "./ForecastInputDeckLandingTypes";
import StoredForecastDecks from "./StoredForecastDecks";

const useStyles = makeStyles((theme) => ({
  ForecastInputDeckLanding: {
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
  ImportWorkflow: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { height: 70, width: 70 },
  badge: { height: "fit-content" },
}));

const ForecastInputDeckLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const reducer = "inputReducer";
  const { url, path } = useRouteMatch();
  const loadWorkflow = useSelector(
    (state: RootState) => state.layoutReducer["loadWorkflow"]
  );

  const forecastInputLandingData: ILandingData[] = [
    {
      name: "Excel | Text",
      description: `Import forecast inputdeck from Microsoft Excel. Formats supported: .xls, .xlsx & csv. Also import in .txt or .dat formats`,
      icon: (
        <Image
          className={classes.image}
          src={MSExcel}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/excel`,
      workflowProcess: "forecastInputDeckExcel",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: "Database",
      description: `Import forecast inputdeck from local or remote databases. Providers supported: AccessDb, MSSQL, MySQL etc`,
      icon: (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/database`,
      workflowProcess: "forecastInputDeckDatabase",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: `Stored Forecast InputDeck`,
      description: `Select a pre-exisiting and approved forecast inputdeck stored in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={StoredDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approveddeck`,
      workflowProcess: "forecastInputDeckStored",
      workflowCategory: "storedDataWorkflows",
    },
  ];

  const forecastExcelandDbWorkflowFinalAction = React.useCallback(
    (workflowProcess: TAllWorkflowProcesses) => {
      const dialogParameters: DialogStuff = {
        name: "Manage_Deck_Dialog",
        title: `Manage Forecast InputDeck`,
        type: "finalizeForecastInputDeckDialog",
        show: true,
        exclusive: true,
        maxWidth: "sm",
        iconType: "information",
        workflowProcess,
        workflowCategory: "inputDataWorkflows",
        actionsList: () => DialogCancelButton(),
      };

      dispatch(showDialogAction(dialogParameters));
    },
    []
  );

  const storedDataFinalAction = React.useCallback(() => {
    const dialogParameters: DialogStuff = {
      name: "Manage_Deck_Dialog",
      title: `Manage Forecast Inputdeck`,
      type: "textDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "information",
    };
    dispatch(showDialogAction(dialogParameters));
  }, []);

  const getBadgeProps = React.useCallback((name: string) => {
    return {
      color: "secondary",
      ...(name === "Database" && { badgeContent: <BadgeComingSoon /> }),
    } as BadgeProps;
  }, []);

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

              const forecastInputDeckWorkflows = {
                excel: (
                  <ExcelWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={"forecastInputDeckExcel"}
                    finalAction={() =>
                      forecastExcelandDbWorkflowFinalAction(
                        "forecastInputDeckExcel"
                      )
                    }
                  />
                ),
                database: (
                  <DatabaseWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={"forecastInputDeckExcel"}
                    finalAction={() =>
                      forecastExcelandDbWorkflowFinalAction(
                        "forecastInputDeckDatabase"
                      )
                    }
                  />
                ),
                approveddeck: (
                  <StoredForecastDecks
                    reducer={reducer}
                    showChart={true}
                    finalAction={storedDataFinalAction}
                  />
                ),
              };

              return forecastInputDeckWorkflows[dataInputId];
            }}
          </Route>
        </div>
      ) : (
        <div className={classes.ForecastInputDeckLanding}>
          {forecastInputLandingData.map((module) => {
            const {
              icon,
              name,
              description,
              route,
              workflowProcess,
              workflowCategory,
            } = module;

            return (
              <Badge
                key={name}
                {...getBadgeProps(name)}
                classes={{
                  badge: classes.badge,
                }}
              >
                <ModuleCard
                  isDispatched={true}
                  moduleAction={loadWorkflowAction}
                  title={name}
                  description={description}
                  icon={icon}
                  route={route}
                  wP={workflowProcess}
                  wC={workflowCategory}
                />
              </Badge>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ForecastInputDeckLanding;
