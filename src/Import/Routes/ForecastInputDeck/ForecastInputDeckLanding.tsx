import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
import Image from "../../../Application/Components/Visuals/Image";
import { loadWorkflowAction } from "../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import ExistingDeck from "../../Images/ExistingDeck.svg";
import ImportDatabase from "../../Images/ImportDatabase.svg";
import MSExcel from "../../Images/MSExcel.svg";
import { IInputLanding } from "../Common/InputLayoutTypes";
import DatabaseWorkflow from "../Common/InputWorkflows/DatabaseWorkflow";
import ExcelWorkflow from "../Common/InputWorkflows/ExcelWorkflow";
import ExistingDataWorkflow from "../Common/InputWorkflows/ExistingDataWorkflow";
import { IdType } from "./ForecastInputDeckLandingTypes";

const useStyles = makeStyles((theme) => ({
  ForecastInputDeckLanding: {
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

const ForecastInputDeckLanding = ({
  subModuleName,
  subModuleLabel,
}: IInputLanding) => {
  const classes = useStyles();

  const { url, path } = useRouteMatch();
  const { loadWorkflow } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { currentWorkflowProcess } = useSelector(
    (state: RootState) => state.workflowReducer
  );

  const forecastInputLandingData = [
    {
      name: "Excel + Plain Text",
      description: `Import ${subModuleLabel} from Microsoft Excel. Formats supported: .xls, .xlsx & csv. Also import in .txt or .dat formats`,
      icon: (
        <Image
          className={classes.image}
          src={MSExcel}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/excel`,
      workflowProcess: "forecastInputDeckExcel",
    },
    {
      name: "Database",
      description: `Import ${subModuleLabel} from local or remote databases. Providers supported: AccessDb, MSSQL, MySQL etc`,
      icon: (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/database`,
      workflowProcess: "forecastInputDeckDatabase",
    },
    {
      // name: `Approved Name`,
      name: `Approved ${subModuleLabel}`,
      description: `Select a pre-exisiting and approved ${subModuleLabel} stored in the Apex\u2122 database`,
      icon: (
        <Image
          className={classes.image}
          src={ExistingDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approveddeck`,
      workflowProcess: "forecastInputDeckApproveddeck",
    },
  ];

  //Define a service that combines more than one icon or image into an overlapped one
  //CSS using overlap and z-index

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
                  <ExcelWorkflow workflowProcess={currentWorkflowProcess} />
                ),
                database: (
                  <DatabaseWorkflow workflowProcess={currentWorkflowProcess} />
                ),
                approveddeck: (
                  <ExistingDataWorkflow
                    workflowProcess={currentWorkflowProcess}
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

export default ForecastInputDeckLanding;
