import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import Image from "../../../Application/Components/Image";
import { loadWorkflowAction } from "../../../Application/Redux/Actions/LayoutActions";
import ExistingDeck from "../../Images/ExistingDeck.svg";
import ImportDatabase from "../../Images/ImportDatabase.svg";
import MSExcel from "../../Images/MSExcel.svg";
import ModuleCard from "./../../../Application/Components/ModuleCard";
import ImportExcelWorkflow from "./ImportExcelWorkflow/ImportExcelWorkflow";

const useStyles = makeStyles((theme) => ({
  ImportFacilitiesLanding: {
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

const ImportFacilitiesLanding = (props) => {
  const classes = useStyles();
  const { url, path } = useRouteMatch();
  const loadWorkflow = useSelector((state) => state.layoutReducer.loadWorkflow);

  const data = [
    {
      name: "Excel + Plain Text",
      description:
        "Import excel sheets in the following formats: .xls, .xlsx & csv. Also import in .txt or .dat formats",
      icon: (
        <Image
          className={classes.image}
          src={MSExcel}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/excel`,
    },
    {
      name: "Database",
      description:
        "Connect to and import from the following databases: AccessDb, MSSQL, MySQL etc",
      icon: (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/database`,
    },
    {
      name: "Approved Facilities Deck",
      description:
        "Select a pre-exisiting and approved facilties deck from your database",
      icon: (
        <Image
          className={classes.image}
          src={ExistingDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      route: `${url}/approveddeck`,
    },
  ];

  //Define a service that combines more than one icon or image into an overlapped one
  //CSS using overlap and z-index

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

              const ImportFacilitiesWorkflows = {
                excel: <ImportExcelWorkflow />,
                database: <ImportExcelWorkflow />,
                facilitiesdeck: <ImportExcelWorkflow />,
              };

              return ImportFacilitiesWorkflows[dataType];
            }}
          />
        </div>
      ) : (
        <div className={classes.ImportFacilitiesLanding}>
          {data.map((module) => {
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

ImportFacilitiesLanding.propTypes = {};

export default ImportFacilitiesLanding;
