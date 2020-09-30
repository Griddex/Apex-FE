import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import Image from "../../../Application/Components/Visuals/Image";
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
import { loadWorkflowAction } from "../../../Application/Redux/Actions/LayoutActions";
import ExistingDeck from "../../Images/ExistingDeck.svg";
import ImportDatabase from "../../Images/ImportDatabase.svg";
import MSExcel from "../../Images/MSExcel.svg";
import ExcelWorkflow from "../Common/InputWorkflows/ExcelWorkflow";
import DatabaseWorkflow from "../Common/InputWorkflows/DatabaseWorkflow";

const useStyles = makeStyles((theme) => ({
  InputLanding: {
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

const InputLanding = ({ subModule: { name } }) => {
  const classes = useStyles();

  const { url, path } = useRouteMatch();
  const loadWorkflow = useSelector((state) => state.layoutReducer.loadWorkflow);
  const nameLowCase = name.toLowerCase();

  const inputLandingData = [
    {
      name: "Excel + Plain Text",
      description: `Import ${nameLowCase} from Microsoft Excel. Formats supported: .xls, .xlsx & csv. Also import in .txt or .dat formats`,
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
      description: `Import ${nameLowCase} from local or remote databases. Providers supported: AccessDb, MSSQL, MySQL etc`,
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
      // name: `Approved Name`,
      name: `Approved ${name}`,
      description: `Select a pre-exisiting and approved ${nameLowCase} stored in the Apex\u2122 database`,
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
                excel: <ExcelWorkflow />,
                database: <DatabaseWorkflow />,
                existingdeck: <ExcelWorkflow />,
              };

              return ImportFacilitiesWorkflows[dataType];
            }}
          />
        </div>
      ) : (
        <div className={classes.InputLanding}>
          {inputLandingData.map((module) => {
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

InputLanding.propTypes = {};

export default InputLanding;
