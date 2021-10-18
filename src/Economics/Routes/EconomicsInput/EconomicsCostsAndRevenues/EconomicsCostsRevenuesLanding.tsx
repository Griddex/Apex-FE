import { Badge, BadgeProps } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSnackbar } from "notistack";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import { createSelectorCreator, defaultMemoize } from "reselect";
import BadgeComingSoon from "../../../../Application/Components/Badges/BadgeComingSoon";
import ModuleCard from "../../../../Application/Components/Cards/ModuleCard";
import DialogSaveCancelButtons from "../../../../Application/Components/DialogButtons/DialogSaveCancelButtons";
import { DialogStuff } from "../../../../Application/Components/Dialogs/DialogTypes";
import Image from "../../../../Application/Components/Visuals/Image";
import { TAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { subNavbarSetMenuAction } from "../../../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { ILandingData } from "../../../../Application/Types/ApplicationTypes";
import ImportDatabase from "../../../../Import/Images/ImportDatabase.svg";
import MSExcel from "../../../../Import/Images/MSExcel.svg";
import StoredDeck from "../../../../Import/Images/StoredDeck.svg";
import ForecastResults from "../../../Images/ForecastResults.svg";
import Manual from "../../../Images/Manual.svg";
import {
  loadEconomicsWorkflowAction,
  persistEconomicsDeckRequestAction,
  saveCostsRevenuesRequestAction,
  updateEconomicsParameterAction,
} from "../../../Redux/Actions/EconomicsActions";
import { IdType } from "./EconomicsCostsAndRevenuesTypes";

const CostsRevenueApexForecastWorkflow = React.lazy(
  () => import("../../../Workflows/CostsRevenueApexForecastWorkflow")
);
const CostsAndRevenueManual = React.lazy(
  () => import("./CostsAndRevenueManual")
);
const StoredCostsAndRevenuesDecks = React.lazy(
  () => import("./StoredCostsAndRevenuesDecks")
);
const SelectScenariosByButtonsWithForecastCase = React.lazy(
  () =>
    import(
      "../../../Components/SelectScenariosByButtons/SelectScenariosByButtonsWithForecastCase"
    )
);
const DatabaseWorkflow = React.lazy(
  () =>
    import("../../../../Import/Routes/Common/InputWorkflows/DatabaseWorkflow")
);

const ExcelWorkflow = React.lazy(
  () => import("../../../../Import/Routes/Common/InputWorkflows/ExcelWorkflow")
);

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
  badge: { height: "fit-content" },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const economicsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer,
  (reducer) => reducer
);

const EconomicsCostsRevenuesLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const reducer = "economicsReducer";
  const wc = "inputDataWorkflows";

  const { url, path } = useRouteMatch();
  const { loadCostsRevenueWorkflow } = useSelector(economicsSelector);

  const labelSelector = createDeepEqualSelector(
    (state: RootState) =>
      state.economicsReducer[wc]["economicsCostsRevenuesDeckExcel"]
        ?.currentDevOption?.label,
    (wc) => wc
  );

  const dataLabel = useSelector(labelSelector);

  const economicsCostsRevenuesLandingData: ILandingData[] = [
    {
      name: "Excel | Text",
      description: `Import costs & revenues data from Microsoft Excel. Formats supported: .xls, .xlsx & csv. Also import in .txt or .dat formats`,
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
      description: `Import costs & revenues data from local or remote databases. Providers supported: AccessDb, MSSQL, MySQL etc`,
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
      costs & revenues data from any source`,
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
       manually input costs & revenues data from any source`,
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
      name: `Stored Costs & Revenues Data`,
      description: `Select a pre-exisiting and approved costs & revenues data stored in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={StoredDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approveddeck`,
      workflowProcess: "economicsCostsRevenuesDeckStored",
      workflowCategory: "storedDataWorkflows",
    },
  ];

  const costsRevenueWorkflowSaveAction = (wp: TAllWorkflowProcesses) => {
    const saveCostsRevenuesInputdeckConfirmation = (
      titleDesc: Record<string, string>
    ) => {
      const confirmationDialogParameters: DialogStuff = {
        name: "Save_CostsRevenue_Dialog_Confirmation",
        title: "Save Costs & Revenues Confirmation",
        type: "textDialog",
        show: true,
        exclusive: false,
        maxWidth: "xs",
        dialogText: `Do you want to save the economics costs schedule?`,
        iconType: "confirmation",
        actionsList: () =>
          DialogSaveCancelButtons(
            [true, true],
            [true, true],
            [
              unloadDialogsAction,
              () =>
                saveCostsRevenuesRequestAction(
                  wp,
                  reducer,
                  titleDesc as Record<string, string>
                ),
            ],
            false,
            "All"
          ),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      };

      dispatch(showDialogAction(confirmationDialogParameters));
    };

    const dialogParameters: DialogStuff = {
      name: "Save_CostsRevenue_Dialog",
      title: "Save Costs & Revenues",
      type: "saveCostsRevenuesInputDeckDialog",
      show: true,
      exclusive: false,
      maxWidth: "sm",
      iconType: "save",
      actionsList: (titleDesc?: Record<string, string>) =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () =>
              saveCostsRevenuesInputdeckConfirmation(
                titleDesc as Record<string, string>
              ),
          ],
          false,
          "None"
        ),
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const costsRevenueWorkflowFinalAction = (wp: TAllWorkflowProcesses) => {
    const dialogParameters: DialogStuff = {
      name: "Select_DevelopmentScenarios_Dialog",
      title: "Select Development Scenarios",
      type: "selectDevelopmentScenariosDialog",
      show: true,
      exclusive: false,
      maxWidth: "sm",
      iconType: "select",
      workflowProcess: wp,
      workflowCategory: wc,
      actionsList: (isFinalButtonDisabled) =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, () => costsRevenueWorkflowSaveAction(wp)],
          isFinalButtonDisabled,
          "None"
        ),
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const storedDataFinalAction = () => {
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

  const getBadgeProps = (name: string) => {
    return {
      color: "secondary",
      ...(name === "Database" && { badgeContent: <BadgeComingSoon /> }),
    } as BadgeProps;
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
                    finalAction={() => {
                      costsRevenueWorkflowFinalAction(
                        "economicsCostsRevenuesDeckExcel"
                      );

                      dispatch(
                        persistEconomicsDeckRequestAction(
                          "economicsCostsRevenuesDeckExcel",
                          "oilDevelopment",
                          [],
                          false
                        )
                      );

                      enqueueSnackbar(`${dataLabel} is stored successfully`, {
                        persist: false,
                        variant: "success",
                      });
                    }}
                    hasExtraComponent={true}
                    extraComponent={SelectScenariosByButtonsWithForecastCase}
                  />
                ),
                database: (
                  <DatabaseWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={"economicsCostsRevenuesDeckDatabase"}
                    finalAction={() =>
                      costsRevenueWorkflowFinalAction(
                        "economicsCostsRevenuesDeckDatabase"
                      )
                    }
                  />
                ),
                manual: (
                  <CostsAndRevenueManual
                    reducer={reducer}
                    wkCy={"inputDataWorkflows"}
                    wkPs={"economicsCostsRevenuesDeckManual"}
                    finalAction={() =>
                      costsRevenueWorkflowFinalAction(
                        "economicsCostsRevenuesDeckManual"
                      )
                    }
                  />
                ),
                apexforecast: (
                  <CostsRevenueApexForecastWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={"economicsCostsRevenuesDeckApexForecast"}
                    finalAction={() =>
                      costsRevenueWorkflowFinalAction(
                        "economicsCostsRevenuesDeckApexForecast"
                      )
                    }
                  />
                ),
                approveddeck: (
                  <StoredCostsAndRevenuesDecks
                    reducer={reducer}
                    showChart={true}
                    finalAction={storedDataFinalAction}
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
                    dispatch(
                      loadEconomicsWorkflowAction("loadCostsRevenueWorkflow")
                    );

                    dispatch(
                      updateEconomicsParameterAction(
                        `currentWorkflowProcess`,
                        workflowProcess
                      )
                    );

                    if (workflowProcess === "economicsCostsRevenuesDeckExcel")
                      dispatch(
                        subNavbarSetMenuAction(
                          "Economics Costs & Revenues [Oil Development]"
                        )
                      );
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

export default EconomicsCostsRevenuesLanding;
