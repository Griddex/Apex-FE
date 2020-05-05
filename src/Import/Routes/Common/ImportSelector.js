import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ImportBackground from "./ImportBackground";
import ImportFacilitiesLanding from "../FacilitiesDeck/ImportFacilitiesLanding";
import ImportForecastLanding from "./../ForecastDeck/ImportForecastLanding";
import ConnectProductionLanding from "./../ProductionData/ConnectProductionLanding";
import ImportEconomicsLanding from "./../EconomicsData/ImportEconomicsLanding";

const ImportSelector = (props) => {
  const { page } = useParams();
  console.log("Logged output -->: ImportSelector -> page", page);

  const Layouts = {
    background: <ImportBackground {...props} />,
    facilitiesdeck: <ImportFacilitiesLanding {...props} />,
    forecastdeck: <ImportForecastLanding {...props} />,
    productiondata: <ConnectProductionLanding {...props} />,
    economicsdata: <ImportEconomicsLanding {...props} />,
  };

  return Layouts[page];
};

ImportSelector.propTypes = {};

export default ImportSelector;
