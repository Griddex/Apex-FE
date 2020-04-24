import React from "react";
import PropTypes from "prop-types";
import ImportCard from "../Components/ImportCard";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import AppsIcon from "@material-ui/icons/Apps";
import ExistingFacilitiesDeck from "../Images/ExistingFacilitiesDeck.svg";
import MSExcel from "../Images/MSExcel.svg";
import ImportDatabase from "../Images/ImportDatabase.svg";
import Image from "./../../Application/Components/Image";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  image: { height: "100px", width: "100px" },
}));

const ImportlandingFacilities = (props) => {
  const classes = useStyles();
  const data = [
    {
      mainTitle: "Excel + Plain Text",
      Description:
        "Import excel sheets in the following formats: .xls, .xlsx & csv. Also import in .txt or .dat formats",
      landingIcon: () => (
        <Image
          className={classes.image}
          src={MSExcel}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
    },
    {
      mainTitle: "Database",
      Description:
        "Connect to and import from the following databases: AccessDb, MSSQL, MySQL etc",
      landingIcon: () => (
        <Image
          className={classes.image}
          src={ImportDatabase}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
    },
    {
      mainTitle: "Approved Facilities Deck",
      Description:
        "Select a pre-exisiting and approved facilties deck from your database",
      landingIcon: () => (
        <Image
          className={classes.image}
          src={ExistingFacilitiesDeck}
          alt="Hydrocarbon Forecasting Platform Company Logo"
        />
      ),
    },
  ];

  //Define a service that combines more than one icon or image into an overlapped one
  //CSS using overlap and z-index
  return (
    <>
      {data.map((d) => (
        <ImportCard
          key={d.mainTitle}
          MainTitle={d.mainTitle}
          Description={d.Description}
          Icon={d.landingIcon}
        />
      ))}
    </>
  );
};

ImportlandingFacilities.propTypes = {};

export default ImportlandingFacilities;
