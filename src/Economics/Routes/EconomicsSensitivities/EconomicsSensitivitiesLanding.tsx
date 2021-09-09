import { makeStyles } from "@material-ui/core";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
import DialogSaveCancelButtons from "../../../Application/Components/DialogButtons/DialogSaveCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import Image from "../../../Application/Components/Visuals/Image";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { ILandingData } from "../../../Application/Types/ApplicationTypes";
import ImportDatabase from "../../../Import/Images/ImportDatabase.svg";
import MSExcel from "../../../Import/Images/MSExcel.svg";
import {
  saveEconomicsSensitivitiesRequestAction,
  updateEconomicsParameterAction,
} from "../../Redux/Actions/EconomicsActions";
import { TEconomicsAnalysesNames } from "../EconomicsAnalyses/EconomicsAnalysesTypes";
import EconomicsParametersSensitivities from "../EconomicsAnalyses/EconomicsParametersSensitivities/EconomicsParametersSensitivities";
import StoredEconomicsSensitivities from "../EconomicsAnalyses/EconomicsParametersSensitivities/StoredEconomicsSensitivities";
import { IdType } from "./EconomicsSensitivitiesTypes";

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
  const wp = "economicsSensitivitiesCreate";

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
      name: "Stored Sensitivities",
      description: `Select a pre-exisiting and approved economics sensitivities data stored in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/stored`,
      workflowProcess: "economicsSensitivitiesStored",
      workflowCategory: "inputDataWorkflows",
    },
  ];

  const economicsSensitivitiesWorkflowFinalAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Create_Economics_Sensitivities_Dialog",
      title: "Create Economics Sensitivities",
      type: "saveEconomicsSensitivitiesDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "save",
      workflowProcess: wp,
      actionsList: (titleDesc?: Record<string, string>) =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () =>
              economicsSensitivitiesConfirmation(
                titleDesc as Record<string, string>
              ),
          ],
          false,
          "None"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const economicsSensitivitiesConfirmation = (
    titleDesc: Record<string, string>
  ) => {
    console.log(
      "Logged output --> ~ file: EconomicsSensitivitiesLanding.tsx ~ line 127 ~ EconomicsSensitivitiesLanding ~ titleDesc",
      titleDesc
    );
    const dialogParameters: DialogStuff = {
      name: "Economics_Sensitivities_Save_Confirmation",
      title: "Economics Sensitivities Save Confirmation",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: "Do you want to save the current economics sensitivities?",
      iconType: "confirmation",
      actionsList: () =>
        DialogSaveCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () =>
              saveEconomicsSensitivitiesRequestAction(
                wp,
                reducer,
                "mulitpleAnalyses" as NonNullable<TEconomicsAnalysesNames>,
                titleDesc as Record<string, string>
              ),
          ],
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      reducer,
    };

    dispatch(showDialogAction(dialogParameters));
  };

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
                create: (
                  <EconomicsParametersSensitivities
                    selectedAnalysis={{
                      name: "payout",
                      title: "Payout",
                      icon: <ViewHeadlineIcon />,
                    }}
                    finalAction={economicsSensitivitiesWorkflowFinalAction}
                  />
                ),
                stored: <StoredEconomicsSensitivities />,
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
