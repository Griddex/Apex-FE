import { Badge, BadgeProps } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import BadgeComingSoon from "../../Application/Components/Badges/BadgeComingSoon";
import ModuleCard from "../../Application/Components/Cards/ModuleCard";
import DialogOneCancelButtons from "../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import Image from "../../Application/Components/Visuals/Image";
import { TAllWorkflowProcesses } from "../../Application/Components/Workflows/WorkflowTypes";
import { subNavbarSetMenuAction } from "../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { ILandingData } from "../../Application/Types/ApplicationTypes";
import { confirmationDialogParameters } from "../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import ImportDatabase from "../../Import/Images/ImportDatabase.svg";
import MSExcel from "../../Import/Images/MSExcel.svg";
import StoredDeck from "../../Import/Images/StoredDeck.svg";
import VisualyticsCharts from "../Images/VisualyticsCharts.svg";
import {
  loadVisualyticsWorkflowAction,
  saveVisualyticsRequestAction,
} from "../Redux/Actions/VisualyticsActions";
import StoredVisualyticsDecks from "./StoredVisualyticsDecks";
import { IdType } from "./VisualyticsLandingTypes";
import PlotVisualytics from "./Workflows/PlotVisualytics";
import VisualyticsDatabaseWorkflow from "./Workflows/VisualyticsDatabaseWorkflow";
import VisualyticsExcelWorkflow from "./Workflows/VisualyticsExcelWorkflow";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const useStyles = makeStyles((theme) => ({
  visualyticsDeckLanding: {
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
  badge: { height: "fit-content" },
}));

const loadVisualyticsWorkflowSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer.loadVisualyticsWorkflow,
  (load) => load
);

const VisualyticsLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const reducer = "visualyticsReducer";
  const { url, path } = useRouteMatch();

  const loadVisualyticsWorkflow = useSelector(loadVisualyticsWorkflowSelector);

  const visualyticsLandingData: ILandingData[] = [
    {
      name: "Excel | Text",
      description: `Import visualytics data from Microsoft Excel. Formats supported: .xls, .xlsx & csv. Also import in .txt or .dat formats`,
      icon: <Image className={classes.image} src={MSExcel} alt="Excel logo" />,
      route: `${url}/excel`,
      workflowProcess: "visualyticsDeckExcel",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: "Database",
      description: `Import visualytics data from local or remote databases. Providers supported: AccessDb, MSSQL, MySQL etc`,
      icon: (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Database logo"
        />
      ),
      route: `${url}/database`,
      workflowProcess: "visualyticsDeckDatabase",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: "Plot Charts",
      description: `Plot cloumn-based data in highly interactive charts`,
      icon: (
        <Image
          className={classes.image}
          src={VisualyticsCharts}
          alt="Chart Logo"
        />
      ),
      route: `${url}/plotchartsTables`,
      workflowProcess: "visualyticsPlotCharts",
      workflowCategory: "storedDataWorkflows",
    },
    {
      name: `Stored Data`,
      description: `Select  pre-exisiting  data stored in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={StoredDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approveddeck`,
      workflowProcess: "visualyticsDeckStored",
      workflowCategory: "storedDataWorkflows",
    },
  ];

  const visualyticsExcelandDbWorkflowFinalAction = (
    workflowProcess: TAllWorkflowProcesses
  ) => {
    const saveVisualyticsInputdeckConfirmation = (
      titleDesc: Record<string, string>
    ) => {
      const dps = confirmationDialogParameters(
        "VisualyticsDeck_Save_Confirmation",
        "Visualytics Deck Save Confirmation",
        "textDialog",
        `Do you want to save the current data?`,
        false,
        true,
        () =>
          saveVisualyticsRequestAction(
            workflowProcess,
            titleDesc as Record<string, string>
          ),
        "Save",
        "saveOutlined"
      );

      dispatch(showDialogAction(dps));
    };

    const dialogParameters: DialogStuff = {
      name: "Save_Visualytics_Input_Deck_Dialog",
      title: "Save Visualytics InputDeck",
      type: "saveVisualyticsDeckDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "save",
      actionsList: (titleDesc?: Record<string, string>) =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () =>
              saveVisualyticsInputdeckConfirmation(
                titleDesc as Record<string, string>
              ),
          ],
          "Save",
          "saveOutlined",
          false,
          "None"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      reducer,
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const storedDataFinalAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Manage_Deck_Dialog",
      title: `Manage Visualytics Deck`,
      type: "textDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "information",
    };
    dispatch(showDialogAction(dialogParameters));
  };

  const getBadgeProps = (name: string) => {
    return {
      color: "secondary",
      ...(name === "Database" && { badgeContent: <BadgeComingSoon /> }),
    } as BadgeProps;
  };

  return (
    <>
      {loadVisualyticsWorkflow ? (
        <div className={classes.importWorkflow}>
          <Route exact path={`${path}/:dataInputId`}>
            {(props: RouteComponentProps<IdType>) => {
              const { match } = props;
              const {
                params: { dataInputId },
              } = match;

              const visualyticsDeckWorkflows = {
                excel: (
                  <VisualyticsExcelWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"visualyticsDataWorkflows"}
                    wrkflwPrcss={"visualyticsDeckExcel"}
                    finalAction={() =>
                      visualyticsExcelandDbWorkflowFinalAction(
                        "visualyticsDeckExcel"
                      )
                    }
                  />
                ),
                database: (
                  <VisualyticsDatabaseWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"visualyticsDataWorkflows"}
                    wrkflwPrcss={"visualyticsDeckDatabase"}
                    finalAction={() =>
                      visualyticsExcelandDbWorkflowFinalAction(
                        "visualyticsDeckDatabase"
                      )
                    }
                  />
                ),
                plotchartsTables: <PlotVisualytics />,
                approveddeck: (
                  <StoredVisualyticsDecks
                    reducer={reducer}
                    showChart={true}
                    finalAction={storedDataFinalAction}
                  />
                ),
              };

              return visualyticsDeckWorkflows[dataInputId];
            }}
          </Route>
        </div>
      ) : (
        <div className={classes.visualyticsDeckLanding}>
          {visualyticsLandingData.map((module) => {
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
                  key={name}
                  isDispatched={false}
                  moduleAction={() => {
                    dispatch(
                      loadVisualyticsWorkflowAction(
                        "loadVisualyticsWorkflow",
                        true
                      )
                    );

                    dispatch(subNavbarSetMenuAction("Visualytics Deck"));
                  }}
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

export default VisualyticsLanding;
