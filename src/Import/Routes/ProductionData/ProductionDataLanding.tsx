import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import Image from "../../../Application/Components/Visuals/Image";
import { loadWorkflowAction } from "../../../Application/Redux/Actions/LayoutActions";
import ExistingDeck from "../../Images/ExistingDeck.svg";
import ImportDatabase from "../../Images/ImportDatabase.svg";
import MSExcel from "../../Images/MSExcel.svg";
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
import DatabaseWorkflow from "../Common/InputWorkflows/DatabaseWorkflow";
import ExistingDataWorkflow from "../Common/InputWorkflows/ExistingDataWorkflow";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import ExcelWorkflow from "../Common/InputWorkflows/ExcelWorkflow";
import {
  IdType,
  IProductionDataLandingWorkflows,
} from "./ProductionDataLandingTypes";
import { IInputLanding } from "../Common/InputLayoutTypes";
// import AvatarStack from "react-avatar-stack";

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

const ProductionDataLanding = ({
  subModuleName,
  subModuleLabel,
}: IInputLanding) => {
  const classes = useStyles();
  // const theme = useTheme();

  const { url, path } = useRouteMatch();
  const { loadWorkflow } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { currentWorkflowProcess } = useSelector(
    (state: RootState) => state.workflowReducer
  );

  const productionLandingData = [
    {
      name: "Excel",
      description: `Utilize ${subModuleLabel} by connecting to Microsoft Excel`,
      icon: (
        <Image
          className={classes.image}
          src={MSExcel}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/productionexcel`,
      workflowProcess: "productionDataExcel",
    },
    {
      name: "Database",
      description: `Utilize ${subModuleLabel} by connecting to local or remote databases. Providers supported: AccessDb, MSSQL, MySQL etc`,
      icon: (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/productiondatabase`,
      workflowProcess: "productionDataDatabase",
    },
    {
      //Only one left? A table of production data connections to choose from? //What if you want to setup a quick local production db connection?
      name: `Approved ${subModuleLabel}`,
      description: `Select pre-exisiting and approved ${subModuleLabel} from your database`,
      icon: (
        <Image
          className={classes.image}
          src={ExistingDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approvedproductiondata`,
      workflowProcess: "productionDataApproved",
    },
  ];

  return (
    <>
      {loadWorkflow ? (
        <div className={classes.ImportWorkflow}>
          <Route
            exact
            path={`${path}/:dataType`}
            render={(props: RouteComponentProps<IdType>) => {
              const { match } = props;
              const {
                params: { dataInputId },
              } = match;

              const inputProductionDataWorkflows: IProductionDataLandingWorkflows = {
                excel: (
                  <ExcelWorkflow workflowProcess={currentWorkflowProcess} />
                ),
                database: (
                  <DatabaseWorkflow workflowProcess={currentWorkflowProcess} />
                ),
                approvedData: (
                  <ExistingDataWorkflow
                    workflowProcess={currentWorkflowProcess}
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
            const { icon, name, description, route, workflowProcess } = module;
            return (
              <ModuleCard
                key={name}
                moduleAction={loadWorkflowAction}
                name={name}
                description={description}
                Icon={icon}
                route={route}
                workflowProcess={workflowProcess}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProductionDataLanding;
