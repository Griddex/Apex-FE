import React from "react";
import PropTypes from "prop-types";
import WorkflowStepper from "./../../Application/Components/WorkflowStepper";

const ImportContextDrawerContent = {
  ImportExcel: <WorkflowStepper />,
  ConnectDatabase: <h1>Database</h1>,
  SelectDeck: <h1>Deck</h1>,
};

const ContextDrawerContentService = (trigger) => {
  return ImportContextDrawerContent[trigger];
};

ContextDrawerContentService.propTypes = {};

export default ContextDrawerContentService;
