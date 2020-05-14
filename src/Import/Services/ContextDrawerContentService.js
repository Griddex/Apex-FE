import React from "react";
import PropTypes from "prop-types";
import ImportStepper from "./../Components/ImportStepper";

const ImportDrawerContent = {
  importexcel: <ImportStepper />,
  connectDatabase: <h1>Database</h1>,
  selectDeck: <h1>Deck</h1>,
};

const ContextDrawerContentService = (trigger) => {
  return ImportDrawerContent[trigger];
};

ContextDrawerContentService.propTypes = {};

export default ContextDrawerContentService;
