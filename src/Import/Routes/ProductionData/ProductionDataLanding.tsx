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
import { fetchExistingDataRequestAction } from "../../Redux/Actions/ExistingDataActions";
import DatabaseWorkflow from "../Common/InputWorkflows/DatabaseWorkflow";
import ExcelWorkflow from "../Common/InputWorkflows/ExcelWorkflow";
import ExistingProductionData from "./ExistingProductionData";
import {
  IdType,
  IProductionDataLandingWorkflows,
  IProductionLandingData,
} from "./ProductionDataLandingTypes";

const useStyles = makeStyles((theme) => ({
  ProductionDataLanding: {
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

const ProductionDataLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { url, path } = useRouteMatch();
  const { loadWorkflow } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { currentWorkflowProcess } = useSelector(
    (state: RootState) => state.workflowReducer
  );

  const productionLandingData: IProductionLandingData[] = [
    {
      name: "Excel",
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
      workflowCategory: "importDataWorkflows",
    },
    {
      name: "Database",
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
      workflowCategory: "importDataWorkflows",
    },
    {
      //Only one left? A table of production data connections to choose from? //What if you want to setup a quick local production db connection?
      name: `Existing Production Data`,
      description: `Select pre-exisiting and approved production data from your database`,
      icon: (
        <Image
          className={classes.image}
          src={ExistingDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approveddata`,
      workflowProcess: "productionInputDataExisting",
      workflowCategory: "existingDataWorkflows",
    },
  ];

  const excelWorkflowFinalAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Manage_Deck_Dialog",
      title: `Manage Facilities Deck`,
      type: "finalizeInputDialog",
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

              const inputProductionDataWorkflows = {
                excel: (
                  <ExcelWorkflow
                    workflowCategory={"importDataWorkflows"}
                    workflowProcess={currentWorkflowProcess}
                    finalAction={excelWorkflowFinalAction}
                  />
                ),
                //Work on this, not really importing but connecting
                database: (
                  <DatabaseWorkflow
                    workflowCategory={"importDataWorkflows"}
                    workflowProcess={currentWorkflowProcess}
                    finalAction={excelWorkflowFinalAction}
                  />
                ),
                approveddata: (
                  <ExistingProductionData
                    workflowProcess={currentWorkflowProcess}
                    finalAction={excelWorkflowFinalAction}
                  />
                ),
              };

              return inputProductionDataWorkflows[dataInputId];
            }}
          />
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
                moduleAction={loadWorkflowAction}
                name={name}
                description={description}
                Icon={icon}
                route={route}
                workflowProcess={workflowProcess}
                workflowCategory={workflowCategory}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProductionDataLanding;
