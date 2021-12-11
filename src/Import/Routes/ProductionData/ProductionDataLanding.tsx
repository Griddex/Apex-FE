import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import Image from "../../../Application/Components/Visuals/Image";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { loadWorkflowAction } from "../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import StoredDeck from "../../Images/StoredDeck.svg";
import ImportDatabase from "../../Images/ImportDatabase.svg";
import MSExcel from "../../Images/MSExcel.svg";
import { IdType, IProductionLandingData } from "./ProductionDataLandingTypes";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { resetInputDataAction } from "../../../Application/Redux/Actions/ApplicationActions";

const DatabaseWorkflow = React.lazy(
  () => import("../Common/InputWorkflows/DatabaseWorkflow")
);
const ExcelWorkflow = React.lazy(
  () => import("../Common/InputWorkflows/ExcelWorkflow")
);
const StoredProductionData = React.lazy(() => import("./StoredProductionData"));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const useStyles = makeStyles((theme) => ({
  ProductionDataLanding: {
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
}));

const loadWorkflowSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.loadWorkflow,
  (load) => load
);
const currentWorkflowProcessSelector = createDeepEqualSelector(
  (state: RootState) => state.workflowReducer.currentWorkflowProcess,
  (wrkflwPrcss) => wrkflwPrcss
);

const ProductionDataLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { url, path } = useRouteMatch();

  const reducer = "inputReducer";

  const loadWorkflow = useSelector(loadWorkflowSelector);

  const currentWorkflowProcess = useSelector(currentWorkflowProcessSelector);

  const productionLandingData: IProductionLandingData[] = [
    {
      name: "Connect Excel",
      description: `Utilize production data by connecting to Microsoft Excel`,
      icon: (
        <Image
          className={classes.image}
          src={MSExcel}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/productionexcel`,
      workflowProcess: "productionInputDataExcel",
      workflowCategory: "inputDataWorkflows",
    },
    {
      name: "Connect Database",
      description: `Utilize production data by connecting to local or remote databases. Providers supported: AccessDb, MSSQL, MySQL etc`,
      icon: (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/productiondatabase`,
      workflowProcess: "productionInputDataDatabase",
      workflowCategory: "inputDataWorkflows",
    },
    {
      //Only one left? A table of production data connections to choose from? //What if you want to setup a quick local production db connection?
      name: `Stored Production Connections`,
      description: `Select pre-exisiting and approved production data from your database`,
      icon: (
        <Image
          className={classes.image}
          src={StoredDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approveddata`,
      workflowProcess: "productionInputDataStored",
      workflowCategory: "storedDataWorkflows",
    },
  ];

  const excelWorkflowFinalAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Manage_Deck_Dialog",
      title: `Manage Facilities Deck`,
      type: "finalizeForecastInputDeckDialog",
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
          <Route exact path={`${path}/:dataInputId`}>
            {(props: RouteComponentProps<IdType>) => {
              const { match } = props;
              const {
                params: { dataInputId },
              } = match;

              const inputProductionDataWorkflows = {
                excel: (
                  <ExcelWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={currentWorkflowProcess}
                    finalAction={excelWorkflowFinalAction}
                  />
                ),
                //Work on this, not really importing but connecting
                database: (
                  <DatabaseWorkflow
                    reducer={reducer}
                    wrkflwCtgry={"inputDataWorkflows"}
                    wrkflwPrcss={currentWorkflowProcess}
                    finalAction={excelWorkflowFinalAction}
                  />
                ),
                approveddata: (
                  <StoredProductionData
                    reducer={reducer}
                    showChart={false}
                    finalAction={excelWorkflowFinalAction}
                  />
                ),
              };

              return inputProductionDataWorkflows[dataInputId];
            }}
          </Route>
        </div>
      ) : (
        <div className={classes.ProductionDataLanding}>
          {productionLandingData.map((module) => {
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
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProductionDataLanding;
