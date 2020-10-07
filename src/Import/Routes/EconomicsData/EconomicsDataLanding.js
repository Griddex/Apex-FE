import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
import Image from "../../../Application/Components/Visuals/Image";
import { loadWorkflowAction } from "../../../Application/Redux/Actions/LayoutActions";
import ImportDatabase from "../../Images/ImportDatabase.svg";
import Input from "../../Images/Input.svg";
import MSExcel from "../../Images/MSExcel.svg";
import DatabaseExcelWorkflow from "../Common/InputWorkflows/DatabaseExcelWorkflow";
import ExcelWorkflow from "../Common/InputWorkflows/ExcelWorkflow";
import ExistingDataWorkflow from "../Common/InputWorkflows/ExistingDataWorkflow";

const useStyles = makeStyles((theme) => ({
  EconomicsDataLanding: {
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

const EconomicsDataLanding = ({ subModule: { name } }) => {
  const classes = useStyles();

  const { url, path } = useRouteMatch();
  const loadWorkflow = useSelector((state) => state.layoutReducer.loadWorkflow);
  const nameLowCase = name.toLowerCase();

  const economicsLandingData = [
    {
      name: "Excel",
      description: `Utilize ${nameLowCase} by connecting to Microsoft Excel`,
      icon: (
        <Image
          className={classes.image}
          src={MSExcel}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/economicsexcel`,
    },
    {
      name: "Database",
      description: `Utilize ${nameLowCase} by connecting to local or remote databases. Providers supported: AccessDb, MSSQL, MySQL etc`,
      icon: (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/economicsdatabase`,
    },
    {
      //Only one left? A table of production data connections to choose from? //What if you want to setup a quick local production db connection?
      name: `Input ${name}`,
      description: `Type in ${nameLowCase} parameters and generate future cashflow`,
      icon: (
        <Image
          className={classes.image}
          src={Input}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/economicstypein`,
    },
  ];

  return (
    <>
      {loadWorkflow ? (
        <div className={classes.ImportWorkflow}>
          <Route
            exact
            path={`${path}/:dataType`}
            render={(props) => {
              const { match } = props;
              const {
                params: { dataType },
              } = match;

              const inputEconomicsDataWorkflows = {
                economicsexcel: <ExcelWorkflow />,
                economicsdatabase: <DatabaseExcelWorkflow />,
                economicstypein: <ExistingDataWorkflow />,
              };

              return inputEconomicsDataWorkflows[dataType];
            }}
          />
        </div>
      ) : (
        <div className={classes.EconomicsDataLanding}>
          {economicsLandingData.map((module) => {
            const { icon, name, description, route } = module;
            return (
              <ModuleCard
                key={name}
                moduleAction={loadWorkflowAction}
                name={name}
                description={description}
                Icon={icon}
                route={route}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default EconomicsDataLanding;
