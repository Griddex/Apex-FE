import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Image from "../../../Application/Components/Image";
import ImportCard from "../../Components/ImportCard";
import ExistingDeck from "../../Images/ExistingDeck.svg";
import ImportDatabase from "../../Images/ImportDatabase.svg";
import MSExcel from "../../Images/MSExcel.svg";
import ImportExcel from "./ImportExcelWorkflow/ImportExcel";
import { SetContextDrawerContentAction } from "../../Redux/Actions/SetContextDrawerContentAction";

const useStyles = makeStyles((theme) => ({
  image: { height: "100px", width: "100px" },
  ImportFacilitiesLanding: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    "& > *": { margin: "20px", height: "60%" },
  },
  ImportWorkflow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "95%",
    // "& > *": {

    // }
  },
}));

const ImportFacilitiesLanding = (props) => {
  const classes = useStyles();
  const { url, path } = useRouteMatch();
  const dispatch = useDispatch();
  const navigatedToWorkflow = useSelector(
    (state) => state.UILayoutReducer.navigatedToWorkflow
  );

  // useEffect(() => {
  //   dispatch(navigateToWorkflowAction());
  // }, []);

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
      contextAction: SetContextDrawerContentAction,
      contextTrigger: "ImportExcel",
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
      contextAction: SetContextDrawerContentAction,
      contextTrigger: "connectDatabase",
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
      contextAction: SetContextDrawerContentAction,
      contextTrigger: "selectDeck",
    },
  ];

  //Define a service that combines more than one icon or image into an overlapped one
  //CSS using overlap and z-index

  return (
    <>
      {!navigatedToWorkflow ? (
        <div className={classes.ImportFacilitiesLanding}>
          {data.map((d) => (
            <ImportCard
              key={d.mainTitle}
              MainTitle={d.mainTitle}
              Description={d.description}
              Icon={d.landingIcon}
              UrlPath={d.urlPath}
              ContextAction={d.contextAction || null}
              ContextTrigger={d.contextTrigger || null}
            />
          ))}
        </div>
      ) : (
        <div className={classes.ImportWorkflow}>
          <Switch>
            <Route
              exact
              path={`${path}/:datatype`}
              render={(props) => {
                const { match } = props;
                const {
                  params: { datatype },
                } = match;

                const ImportFacilitiesWorkflows = {
                  excel: <ImportExcel />,
                  database: <ImportExcel />,
                  facilitiesdeck: <ImportExcel />,
                };

                return ImportFacilitiesWorkflows[datatype];
              }}
            />
          </Switch>
        </div>
      )}
    </>
  );
};

ImportFacilitiesLanding.propTypes = {};

export default ImportFacilitiesLanding;
