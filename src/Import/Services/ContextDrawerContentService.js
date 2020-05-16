import React from "react";
import PropTypes from "prop-types";
import ImportExcelStepper from "./../Components/ImportExcelStepper";

const ImportContextDrawerContent = {
  ImportExcel: <ImportExcelStepper />,
  ConnectDatabase: <h1>Database</h1>,
  SelectDeck: <h1>Deck</h1>,
};

const ContextDrawerContentService = (trigger) => {
  return ImportContextDrawerContent[trigger];
};

ContextDrawerContentService.propTypes = {};

export default ContextDrawerContentService;
