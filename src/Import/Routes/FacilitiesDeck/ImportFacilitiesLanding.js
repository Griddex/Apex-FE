import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Image from "../../../Application/Components/Image";
import ImportCard from "../../Components/ImportCard";
import ExistingDeck from "../../Images/ExistingDeck.svg";
import ImportDatabase from "../../Images/ImportDatabase.svg";
import MSExcel from "../../Images/MSExcel.svg";
import ImportExcel from "./ImportExcelWorkflow/ImportExcel";

const useStyles = makeStyles((theme) => ({
  image: { height: "100px", width: "100px" },
  ImportFacilitiesLanding: {
    display: "flex",
    flexGrow: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    "& > *": {
      margin: theme.spacing(3),
    },
  },
  ImportWorkflow: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ImportFacilitiesLanding = (props) => {
  const classes = useStyles();
  const { url, path } = useRouteMatch();
  const loadWorkflow = useSelector((state) => state.layoutReducer.loadWorkflow);

  const data = [
    {
      mainTitle: "Excel + Plain Text",
      description:
        "Import excel sheets in the following formats: .xls, .xlsx & csv. Also import in .txt or .dat formats",
      landingIcon: () => (
        <Image
          className={classes.image}
          src={MSExcel}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      urlPath: `${url}/excel`,
    },
    {
      mainTitle: "Database",
      description:
        "Connect to and import from the following databases: AccessDb, MSSQL, MySQL etc",
      landingIcon: () => (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      urlPath: `${url}/database`,
    },
    {
      mainTitle: "Approved Facilities Deck",
      description:
        "Select a pre-exisiting and approved facilties deck from your database",
      landingIcon: () => (
        <Image
          className={classes.image}
          src={ExistingDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
      urlPath: `${url}/approveddeck`,
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
                excel: <ImportExcel />,
                database: <ImportExcel />,
                facilitiesdeck: <ImportExcel />,
              };

              return ImportFacilitiesWorkflows[dataType];
            }}
          />
        </div>
      ) : (
        <div className={classes.ImportFacilitiesLanding}>
          {data.map((d) => (
            <ImportCard
              key={d.mainTitle}
              MainTitle={d.mainTitle}
              Description={d.description}
              Icon={d.landingIcon}
              UrlPath={d.urlPath}
            />
          ))}
        </div>
      )}
    </>
  );
};

ImportFacilitiesLanding.propTypes = {};

export default ImportFacilitiesLanding;
