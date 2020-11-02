import { makeStyles } from "@material-ui/core";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import Image from "../../../Application/Components/Image";
import { loadWorkflowAction } from "../../../Application/Redux/Actions/LayoutActions";
import ExistingDeck from "../../Images/ExistingDeck.svg";
import ImportDatabase from "../../Images/ImportDatabase.svg";
import MSExcel from "../../Images/MSExcel.svg";
import ModuleCard from "./../../../Application/Components/ModuleCard";

const useStyles = makeStyles(() => ({
  image: { height: "100px", width: "100px" },
  ImportForecastLanding: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 67.77px)",
    width: "calc(100% - 40px - 40px)",
    "& > *": { margin: "20px", height: "60%" },
  },
}));

const ImportForecastLanding = () => {
  const classes = useStyles();
  const { url /*path*/ } = useRouteMatch();
  // const loadWorkflow = useSelector((state) => state.layoutReducer.loadWorkflow);

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
    <div className={classes.ImportForecastLanding}>
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
  );
};

ImportForecastLanding.propTypes = {};

export default ImportForecastLanding;
