import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import ImportDatabase from "../../../Import/Images/ImportDatabase.svg";
import MSExcel from "../../../Import/Images/MSExcel.svg";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { ILandingData } from "../../../Application/Types/ApplicationTypes";
import EconomicsParametersSensitivities from "../EconomicsAnalyses/EconomicsParametersSensitivities/EconomicsParametersSensitivities";
import ExistingEconomicsSensitivities from "../EconomicsAnalyses/EconomicsParametersSensitivities/ExistingEconomicsSensitivities";
import { IdType } from "./EconomicsSensitivitiesTypes";
import Image from "../../../Application/Components/Visuals/Image";
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";

const useStyles = makeStyles((theme) => ({
  economicsSensitivitiesLanding: {
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

const EconomicsSensitivitiesLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const reducer = "economicsReducer";

  const { url, path } = useRouteMatch();
  const { loadEconomicsSensitivitiesWorkflow } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const economicsSensitivitiesLandingData: ILandingData[] = [
    {
      name: "Create Sensitivities",
      description: `Enhance your workflow by creating
       new sensitivities data from up to three(3) economics parameters`,
      icon: (
        <Image
          className={classes.image}
          src={MSExcel}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/create`,
      workflowProcess: "economicsSensitivitiesCreate",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: "Existing Sensitivities",
      description: `Select a pre-exisiting and approved economics sensitivities data stored in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/existing`,
      workflowProcess: "economicsSensitivitiesExisting",
      workflowCategory: "inputDataWorkflows",
    },
  ];

  //Define a service that combines more than one icon or image into an overlapped one
  //CSS using overlap and z-index

  // //Paying it back
  // const costsRevenueWorkflowFinalAction = (
  //   wp: IAllWorkflows["wrkflwPrcss"]
  // ) => {
  //   const saveSensitivitiesInputdeckConfirmation = () => {
  //     const confirmationDialogParameters: DialogStuff = {
  //       name: "Save_CostsRevenue_Dialog_Confirmation",
  //       title: "Save Costs & Revenues Confirmation",
  //       type: "textDialog",
  //       show: true,
  //       exclusive: false,
  //       maxWidth: "xs",
  //       dialogText: `Do you want to save the economics costs schedule?`,
  //       iconType: "confirmation",
  //       actionsList: () =>
  //         DialogSaveCancelButtons(
  //           [true, true],
  //           [true, true],
  //           [
  //             unloadDialogsAction,
  //             () => saveSensitivitiesRequestAction(wp, reducer),
  //           ]
  //         ),
  //       dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  //     };

  //     dispatch(showDialogAction(confirmationDialogParameters));
  //   };

  //   const dialogParameters: DialogStuff = {
  //     name: "Save_CostsRevenue_Dialog",
  //     title: "Save Costs & Revenues",
  //     type: "saveSensitivitiesInputDeckDialog",
  //     show: true,
  //     exclusive: false,
  //     maxWidth: "sm",
  //     iconType: "information",
  //     actionsList: () =>
  //       DialogSaveCancelButtons(
  //         [true, true],
  //         [true, false],
  //         [unloadDialogsAction, saveSensitivitiesInputdeckConfirmation]
  //       ),
  //   };

  //   dispatch(showDialogAction(dialogParameters));
  // };

  // //TODO: Not doing anything here
  // const existingDataFinalAction = () => {
  //   const dialogParameters: DialogStuff = {
  //     name: "Manage_Deck_Dialog",
  //     title: `Manage Sensitivities Deck`,
  //     type: "textDialog",
  //     show: true,
  //     exclusive: true,
  //     maxWidth: "sm",
  //     iconType: "information",
  //   };
  //   dispatch(showDialogAction(dialogParameters));
  // };

  return (
    <>
      {loadEconomicsSensitivitiesWorkflow ? (
        <div className={classes.importWorkflow}>
          <Route exact path={`${path}/:dataInputId`}>
            {(props: RouteComponentProps<IdType>) => {
              const { match } = props;
              const {
                params: { dataInputId },
              } = match;

              const economicsSensitivitiesDeckWorkflows = {
                create: <EconomicsParametersSensitivities />,
                existing: <ExistingEconomicsSensitivities />,
              };

              return economicsSensitivitiesDeckWorkflows[dataInputId];
            }}
          </Route>
        </div>
      ) : (
        <div className={classes.economicsSensitivitiesLanding}>
          {economicsSensitivitiesLandingData.map((module) => {
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
                isDispatched={false}
                moduleAction={() => {
                  dispatch(
                    updateEconomicsParameterAction(
                      "loadEconomicsSensitivitiesWorkflow",
                      true
                    )
                  );
                  dispatch(
                    updateEconomicsParameterAction(
                      "createSensitivitiesIsDialog",
                      false
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
            );
          })}
        </div>
      )}
    </>
  );
};

export default EconomicsSensitivitiesLanding;
