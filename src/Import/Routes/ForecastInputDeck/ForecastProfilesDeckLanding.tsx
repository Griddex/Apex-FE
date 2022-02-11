import { Badge, BadgeProps } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
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
import MBAL from "../../Images/MBAL.svg";
import Eclipse from "../../Images/Eclipse.svg";
import MSExcel from "../../Images/MSExcel.svg";
import StoredDeck from "../../Images/StoredDeck.svg";
import { IdType } from "./ForecastProfilesLandingTypes";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { resetInputDataAction } from "../../../Application/Redux/Actions/ApplicationActions";

const StoredForecastDecks = React.lazy(() => import("./StoredForecastDecks"));
const DatabaseWorkflow = React.lazy(
  () => import("../Common/InputWorkflows/DatabaseWorkflow")
);
const ExcelWorkflow = React.lazy(
  () => import("../Common/InputWorkflows/ExcelWorkflow")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const useStyles = makeStyles((theme) => ({
  ForecastProfilesDeckLanding: {
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

const ForecastProfilesDeckLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { url, path } = useRouteMatch();

  const reducer = "inputReducer";

  const loadWorkflowSelector = createDeepEqualSelector(
    (state: RootState) => state.layoutReducer.loadWorkflow,
    (load) => load
  );
  const loadWorkflow = useSelector(loadWorkflowSelector);

  const forecastInputLandingData: ILandingData[] = [
    {
      name: "Excel | Text",
      description: `Import forecast profiles from Microsoft Excel. Formats supported: .xls, .xlsx & csv. Also import in .txt or .dat formats`,
      icon: (
        <Image
          className={classes.image}
          src={MSExcel}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/excel`,
      workflowProcess: "forecastProfilesExcel",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: "Database",
      description: `Import forecast profiles from local or remote databases. Providers supported: AccessDb, MSSQL, MySQL etc`,
      icon: (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/database`,
      workflowProcess: "forecastProfilesDatabase",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: "MBAL",
      description: `Import forecast profiles from MBAL forecast result file`,
      icon: (
        <Image
          className={classes.image}
          src={MBAL}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/mbal`,
      workflowProcess: "forecastProfilesMbal",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: "Eclipse",
      description: `Import forecast profiles from eclipse forecast result file`,
      icon: (
        <Image
          className={classes.image}
          src={Eclipse}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/eclipse`,
      workflowProcess: "forecastProfilesEclipse",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: `Stored Forecast Profiles`,
      description: `Select a pre-exisiting and approved forecast profiles stored in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={StoredDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approveddeck`,
      workflowProcess: "forecastProfilesStored",
      workflowCategory: "storedDataWorkflows",
    },
  ];

  const forecastExcelandDbWorkflowFinalAction = React.useCallback(
    (workflowProcess: TAllWorkflowProcesses) => {
      const dialogParameters: DialogStuff = {
        name: "Manage_Deck_Dialog",
        title: `Manage Forecast Profiles`,
        type: "finalizeForecastProfilesDialog",
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
      ...(["Database"].includes(name) && { badgeContent: <BadgeComingSoon /> }),
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

              const forecastProfilesWorkflows = {
                excel: (
                  <ExcelWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={"forecastProfilesExcel"}
                    finalAction={() =>
                      forecastExcelandDbWorkflowFinalAction(
                        "forecastProfilesExcel"
                      )
                    }
                  />
                ),
                database: (
                  <DatabaseWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={"forecastProfilesExcel"}
                    finalAction={() =>
                      forecastExcelandDbWorkflowFinalAction(
                        "forecastProfilesDatabase"
                      )
                    }
                  />
                ),
                mbal: <div>MBAL</div>,
                eclipse: <div>ECLIPSE</div>,
                approveddeck: (
                  <StoredForecastDecks
                    reducer={reducer}
                    showChart={true}
                    finalAction={storedDataFinalAction}
                  />
                ),
              };

              return forecastProfilesWorkflows[dataInputId];
            }}
          </Route>
        </div>
      ) : (
        <div className={classes.ForecastProfilesDeckLanding}>
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
                  isDispatched={false}
                  moduleAction={() => {
                    dispatch(resetInputDataAction(reducer));
                    dispatch(loadWorkflowAction());
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

export default ForecastProfilesDeckLanding;
