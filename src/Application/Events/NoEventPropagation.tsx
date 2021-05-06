import React from "react";

const noEventPropagation = (action?: () => void) => {
  return {
    onClick: (event: React.ChangeEvent<any>) => {
      event.persist();
      event.stopPropagation();
      action && action();
    },
    onDoubleClick: (event: React.ChangeEvent<any>) => {
      event.persist();
      event.stopPropagation();
    },
  };
};

export default noEventPropagation;
